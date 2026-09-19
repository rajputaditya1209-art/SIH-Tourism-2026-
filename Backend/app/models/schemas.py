from pydantic import BaseModel, Field
from typing import List, Optional

class Preference(BaseModel):
    budget: float = Field(..., description="The maximum budget for the trip")
    interests: List[str] = Field(..., description="List of interests")
    duration: int = Field(..., description="Duration of the trip in days")
    destination: str = Field(..., description="The target destination city or region")
    season: str = Field(..., description="Preferred travel season")
    travelType: str = Field(..., description="Type of travel, e.g. Family, Adventure")
    travelers: int = Field(1, description="Number of travelers")

    @property
    def group_type(self) -> str:
        if self.travelers == 1:
            return "solo"
        if self.travelType == "Family":
            return "family"
        if self.travelers == 2:
            return "couple"
        return "friends"

    @property
    def budget_level(self) -> str:
        if self.budget <= 5000:
            return "low"
        if self.budget <= 15000:
            return "medium"
        return "high"

class Destination(BaseModel):
    id: str = Field(..., description="Stable slug id")
    name: str
    country: str
    description: Optional[str] = None
    region: Optional[str] = None

class RecommendedDestination(Destination):
    matchScore: float = Field(..., description="Match score 0-100")

class Business(BaseModel):
    id: int
    destination_id: str
    name: str
    category: str
    rating: float
    crowd: Optional[str] = None
    address: Optional[str] = None
    description: Optional[str] = None

class Itinerary(BaseModel):
    destination: Destination
    days: List[List[Business]]
    total_estimated_cost: float

class GenerateItineraryRequest(BaseModel):
    destinationId: str
    preferences: Preference

class Error(BaseModel):
    detail: str