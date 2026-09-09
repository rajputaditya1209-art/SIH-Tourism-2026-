import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import SectionTitle from '../components/SectionTitle';
import { getRecommendationsApi } from '../services/api';
import { getAlternativeDestination, getCrowdStatus } from '../utils/crowdEngine';
import LoadingSpinner from '../components/LoadingSpinner';

function Recommendations() {
  const [preferences, setPreferences] = useState({
    destination: 'Maharashtra',
    days: 3,
    budget: 15000,
    travelers: 4,
    travelType: 'Family',
    interests: ['Nature', 'History'],
    season: 'Winter',
  });
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('smartTourismPreferences');
    const initial = saved ? JSON.parse(saved) : preferences;
    setPreferences(initial);

    getRecommendationsApi(initial).then((result) => {
      setDestinations(result);
      setLoading(false);
    });
  }, []);

  const topDestination = destinations[0];
  const altDestination = useMemo(
    () => {
      if (!topDestination) return null;
      const alt = getAlternativeDestination(topDestination);
      return alt;
    },
    [topDestination]
  );

  const crowdStatus = topDestination ? getCrowdStatus(topDestination) : 'LOW';

  return (
    <div className="page-container">
      <SectionTitle
        eyebrow="Personalized picks"
        title="Destinations Recommended For You"
        subtitle="Based on your travel preferences and crowd-aware insights."
      />

      {!loading && (
        <div className="preferences-summary">
          <span>
            {preferences.days} Days • {preferences.travelType} • ₹{preferences.budget} • {preferences.interests.join(' + ')}
          </span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Finding smart recommendations..." />
      ) : (
        <>
          {topDestination && crowdStatus === 'HIGH' && altDestination && (
            <div className="crowd-warning-box">
              <div>
                <AlertTriangle size={18} />
                <span>{topDestination.name} is expected to be crowded.</span>
              </div>
              <div className="alt-box-wrapper">
                <div className="alt-box-row">
                  <div className="alt-detail">
                    <span className="small-label">Recommended alternative</span>
                    <h3>{altDestination.name}</h3>
                    <p>
                      {altDestination.name} offers a similar {preferences.interests[0]?.toLowerCase() || 'nature'} experience with lower expected crowd.
                    </p>
                  </div>
                  <Link to={`/destination/${altDestination.id}`} className="primary-btn">
                    View alternative <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="destination-grid recommendation-grid">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </>
      )}

      <div className="cta-banner">
        <div>
          <Sparkles size={18} />
          <span>Want the best route for this trip?</span>
        </div>
        <Link to="/itinerary" className="primary-btn">
          View Smart Itinerary
        </Link>
      </div>
    </div>
  );
}

export default Recommendations;
