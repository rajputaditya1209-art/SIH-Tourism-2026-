from fastapi import APIRouter, HTTPException
from app.services.ai_integration import ai_service, AIIntegrationError
from app.models.schemas import GenerateItineraryRequest

router = APIRouter()

@router.post("/itinerary")
async def generate_itinerary_route(request: GenerateItineraryRequest):
    try:
        itinerary_data = await ai_service.generate_itinerary(request)
        return itinerary_data
    except AIIntegrationError as e:
        raise HTTPException(status_code=500, detail=str(e))