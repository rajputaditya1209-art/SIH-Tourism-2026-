import { useEffect, useState } from 'react';
import PreferenceForm from '../components/PreferenceForm';
import SectionTitle from '../components/SectionTitle';
import UseInView from '../hooks/useInView';
import { useToast } from '../hooks/useToast';

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
  const [saved, setSaved] = useState(false);
  const { addToast } = useToast();
  const ref = UseInView();

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

  const handleSave = () => {
    localStorage.setItem('smartTourismPreferences', JSON.stringify(preferences));
    setSaved(true);
    addToast('Preferences saved successfully!', 'success');
  };

  return (
    <div className="page-container small-container">
      <SectionTitle
        eyebrow="Trip planner"
        title="Plan Your Smart Trip"
        subtitle="Tell us what kind of experience you want, and SmartTour will recommend the best destination, crowd risk, and trip flow."
      />

      <div className="planner-panel animate-on-scroll" ref={ref}>
        <PreferenceForm initialValues={preferences} onSave={handleSave} />
      </div>

      {saved && (
        <div className="cta-banner animate-on-scroll" ref={ref}>
          <div>
            <span>Ready to see your recommendations?</span>
          </div>
          <a href="/recommendations" className="primary-btn">
            View Recommendations
          </a>
        </div>
      )}
    </div>
  );
}

export default TripPlanner;
