from fastapi import APIRouter, HTTPException, Query
from datetime import date
from app.services.ai_integration import ai_service, AIIntegrationError

router = APIRouter()

@router.get("/crowd/{id}")
async def get_crowd_status(id: str, date_str: str = Query(default=None, alias="date")):
    target_date = date_str or date.today().isoformat()
    try:
        status = await ai_service.predict_crowd(id, target_date)
        return {"destinationId": id, "status": status}
    except AIIntegrationError as e:
        raise HTTPException(status_code=404, detail=str(e))