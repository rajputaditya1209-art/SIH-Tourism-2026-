import { destinations } from '../data/destinations';
import { businesses } from '../data/businesses';
import { getDefaultItinerary } from '../data/itineraries';
import { getRecommendations } from '../utils/recommendationEngine';
import { getCrowdStatus, getAlternativeDestination } from '../utils/crowdEngine';

export function getDestinations() {
  return Promise.resolve(destinations);
}

export function getRecommendationsApi(preferences) {
  // TODO: Replace mock implementation with backend API
  // POST /recommend
  return Promise.resolve(getRecommendations(preferences));
}

export function getCrowdStatusApi(destinationId) {
  // TODO: Replace mock implementation with backend API
  // GET /crowd/:destinationId
  const destination = destinations.find((item) => item.id === destinationId);
  return Promise.resolve({ destinationId, status: getCrowdStatus(destination) });
}

export function getAlternativeDestinationApi(destinationId) {
  // TODO: Replace mock implementation with backend API
  // GET /alternatives/:destinationId
  const destination = destinations.find((item) => item.id === destinationId);
  return Promise.resolve({ destinationId, alternative: getAlternativeDestination(destination) });
}

export function generateItinerary(preferences) {
  // TODO: Replace mock implementation with backend API
  // POST /generate-itinerary
  const destinationId = preferences?.destinationId || 'matheran';
  return Promise.resolve(getDefaultItinerary(destinationId));
}

export function getBusinesses() {
  return Promise.resolve(businesses);
}
