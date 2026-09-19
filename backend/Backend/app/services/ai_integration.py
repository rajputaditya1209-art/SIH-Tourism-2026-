import asyncio
import json
import os
import logging
from typing import List, Dict, Any

from app.ai_module.crowd_prediction import predict_crowd, get_alternatives, destinations

logger = logging.getLogger(__name__)

class AIIntegrationError(Exception):
    pass

def _find_name_by_id(dest_id: str) -> str:
    match = next((d for d in destinations if d["id"] == dest_id), None)
    if not match:
        raise AIIntegrationError(f"Unknown destination id: {dest_id}")
    return match["name"]

def _name_to_id(name: str) -> str:
    match = next((d for d in destinations if d["name"] == name), None)
    return match["id"] if match else name

class AIIntegrationService:
    async def predict_crowd(self, destination_id: str, date_str: str) -> str:
        try:
            name = _find_name_by_id(destination_id)
            result = await asyncio.to_thread(predict_crowd, name, date_str)
            if isinstance(result, dict) and "error" in result:
                raise AIIntegrationError(result["error"])
            return result.upper()
        except AIIntegrationError:
            raise
        except Exception as e:
            logger.exception("Crowd prediction failed")
            raise AIIntegrationError(str(e))

    async def get_alternatives(self, destination_id: str) -> List[Dict[str, Any]]:
        try:
            name = _find_name_by_id(destination_id)
            result = await asyncio.to_thread(get_alternatives, name)
            if isinstance(result, dict) and "error" in result:
                raise AIIntegrationError(result["error"])
            return [
                {
                    "id": _name_to_id(alt["name"]),
                    "name": alt["name"],
                    "matchScore": alt["overlap_score"],
                    "rating": alt["rating"],
                }
                for alt in result
            ]
        except AIIntegrationError:
            raise
        except Exception as e:
            logger.exception("Get alternatives failed")
            raise AIIntegrationError(str(e))

ai_service = AIIntegrationService()