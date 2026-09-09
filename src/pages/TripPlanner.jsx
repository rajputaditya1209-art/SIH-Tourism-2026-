import { useEffect, useState } from 'react';
import PreferenceForm from '../components/PreferenceForm';
import SectionTitle from '../components/SectionTitle';

const defaultPrefs = {
  destination: 'Maharashtra',
  days: 3,
  budget: 15000,
  travelers: 4,
  travelType: 'Family',
  interests: ['Nature', 'History'],
  season: 'Winter',
};

function TripPlanner() {
  const [preferences, setPreferences] = useState(defaultPrefs);

  useEffect(() => {
    const saved = localStorage.getItem('smartTourismPreferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences((current) => ({ ...current, ...parsed }));
      } catch (error) {
        console.error('Error reading saved trip preferences', error);
      }
    }
  }, []);

  return (
    <div className="page-container small-container">
      <SectionTitle
        eyebrow="Trip planner"
        title="Plan Your Smart Trip"
        subtitle="Tell us what kind of experience you want, and SmartTour will recommend the best destination, crowd risk, and trip flow."
      />

      <div className="planner-panel">
        <PreferenceForm initialValues={preferences} />
      </div>
    </div>
  );
}

export default TripPlanner;
