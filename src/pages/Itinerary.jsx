import { useEffect, useState } from 'react';
import { Download, MapPinned } from 'lucide-react';
import ItineraryCard from '../components/ItineraryCard';
import SectionTitle from '../components/SectionTitle';
import { getDefaultItinerary } from '../data/itineraries';

function Itinerary() {
  const [itinerary, setItinerary] = useState(getDefaultItinerary('matheran'));

  useEffect(() => {
    const saved = localStorage.getItem('smartTourismPreferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const selected = parsed.destination || 'Maharashtra';
        const destinationId = selected.toLowerCase().includes('maharashtra') ? 'matheran' : 'lonavala';
        setItinerary(getDefaultItinerary(destinationId));
      } catch (error) {
        console.error('Error loading itinerary preferences', error);
      }
    }
  }, []);

  return (
    <div className="page-container itinerary-page">
      <SectionTitle
        eyebrow="Smart itinerary"
        title="Your Smart 3-Day Itinerary"
        subtitle="A practical, day-wise flow designed for an easy and memorable trip experience."
      />

      <div className="itinerary-layout">
        <div className="itinerary-list">
          {itinerary.days.map((item) => (
            <ItineraryCard
              key={`${item.day}-${item.time}`}
              day={item.day}
              time={item.time}
              activity={item.activity}
              cost={item.cost}
              location={item.location}
            />
          ))}
        </div>

        <aside className="itinerary-sidebar">
          <h3>Trip Summary</h3>

          <div className="summary-row">
            <span>Total estimated cost</span>
            <strong>{itinerary.summary.total}</strong>
          </div>
          <div className="summary-row">
            <span>Accommodation</span>
            <strong>{itinerary.summary.accommodation}</strong>
          </div>
          <div className="summary-row">
            <span>Food</span>
            <strong>{itinerary.summary.food}</strong>
          </div>
          <div className="summary-row">
            <span>Transport</span>
            <strong>{itinerary.summary.transport}</strong>
          </div>
          <div className="summary-row">
            <span>Activities</span>
            <strong>{itinerary.summary.activities}</strong>
          </div>

          <button type="button" className="primary-btn download-btn">
            <Download size={18} /> Download Itinerary
          </button>
        </aside>
      </div>
    </div>
  );
}

export default Itinerary;
