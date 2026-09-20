from app.ai_module.crowd_prediction import destinations
import os
import json
import re

from google import genai
from dotenv import load_dotenv

load_dotenv()

def generate_itinerary(preferences, destinations):
    if not destinations:
        return {"error": "no destinations provided"}

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not found in environment.")
    
    client = genai.Client(api_key=api_key)

    interests = set(preferences.get("interests", []))
    filtered = [
        d for d in destinations
        if interests.intersection(set(d.get("tags", [])))
    ]

    if not filtered:
        filtered = destinations

    days = preferences.get("days", 1)
    budget = preferences.get("budget", 10000)
    travelers = preferences.get("travelers", 1)
    group_type = preferences.get("group_type", "solo")
    interests_list = preferences.get("interests", [])

    dest_lines = []
    for d in filtered:
        dest_lines.append(
            f"- {d['name']} (city: {d.get('city','')}, tags: {', '.join(d.get('tags', []))}, rating: {d.get('rating', '')})"
        )
    dest_context = "\n".join(dest_lines)

    prompt = f"""You are a travel itinerary planner.

User preferences:
- Days: {days}
- Total Budget: ₹{budget}
- Travelers: {travelers}
- Group type: {group_type}
- Interests: {', '.join(interests_list)}

Available destinations (pre-filtered to match the user's interests):
{dest_context}

Create a {days}-day itinerary using ONLY the destinations listed above.
Allocate the ₹{budget} budget across accommodation, food, transport, and activities for {travelers} travelers.
The 'total' in the summary MUST equal exactly the sum of accommodation, food, transport, and activities.
The 'activities' total in the summary MUST equal exactly the sum of all individual activity costs.

IMPORTANT: Respond with ONLY valid JSON. Return EXACTLY this shape:
{{
  "summary": {{
    "accommodation": 0,
    "food": 0,
    "transport": 0,
    "activities": 0,
    "total": 0
  }},
  "days": [
    {{
      "day": 1,
      "activities": [
        {{
          "time": "09:00 AM",
          "activity": "Detailed activity description",
          "location": "<name from the destinations list>",
          "cost": 500
        }}
      ]
    }}
  ]
}}
"""

    def _call_gemini(contents):
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=contents,
        )
        return response.text

    def _strip_markdown(text):
        text = text.strip()
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
        return text.strip()

    def _parse_itinerary(text):
        cleaned = _strip_markdown(text)
        return json.loads(cleaned)

    messages = [{"role": "user", "parts": [{"text": prompt}]}]
    raw_response = None
    
    try:
        raw_response = _call_gemini(messages)
        return _parse_itinerary(raw_response)
    except Exception as e:
        print(f"[Itinerary generation warning] Falling back: {e}")
        try:
            retry_messages = messages + [
                {"role": "model", "parts": [{"text": raw_response if raw_response is not None else "(no response received)"}]},
                {"role": "user", "parts": [{"text": "Your last response was not valid JSON. Please return ONLY valid JSON matching the exact requested shape without markdown."}]}
            ]
            raw_retry = _call_gemini(retry_messages)
            return _parse_itinerary(raw_retry)
        except Exception as e:
            print(f"[Itinerary generation warning] Final Fallback: {e}")
            top = max(filtered, key=lambda d: d.get("rating", 0))
            return {
                "summary": {
                    "accommodation": budget * 0.4,
                    "food": budget * 0.3,
                    "transport": budget * 0.2,
                    "activities": budget * 0.1,
                    "total": budget
                },
                "days": [
                    {
                        "day": 1,
                        "activities": [
                            {
                                "time": "10:00 AM",
                                "activity": f"Explore {top['name']}",
                                "location": top["name"],
                                "cost": budget * 0.1
                            }
                        ]
                    }
                ]
            }

if __name__ == "__main__":
    sample_preferences = {
        "days": 2,
        "budget": 15000,
        "travelers": 2,
        "group_type": "couple",
        "interests": ["nature"]
    }
    print(json.dumps(generate_itinerary(sample_preferences, destinations), indent=2))