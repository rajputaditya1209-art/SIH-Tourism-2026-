from fastapi import APIRouter, HTTPException
from app.services.ai_integration import ai_service, AIIntegrationError
from app.ai_module.crowd_prediction import destinations

router = APIRouter()

def _full_destination(alt_id: str):
    match = next((d for d in destinations if d["id"] == alt_id), None)
    return match or {"id": alt_id, "name": alt_id, "country": "", "description": None, "region": None}

@router.get("/alternatives/{id}")
async def get_alternatives_route(id: str):
    try:
        alts = await ai_service.get_alternatives(id)
        alternative = _full_destination(alts[0]["id"]) if alts else None
        return {"destinationId": id, "alternative": alternative}
    except AIIntegrationError as e:
        raise HTTPException(status_code=404, detail=str(e))