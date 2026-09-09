import { Compass, Map, Plane, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const navItems = [
    { label: 'Home', to: '/', icon: Sparkles },
    { label: 'Plan Trip', to: '/plan', icon: Plane },
    { label: 'Explore', to: '/recommendations', icon: Compass },
    { label: 'My Itinerary', to: '/itinerary', icon: Map },
  ];

  return (
    <header className="site-header">
      <div className="container navbar">
        <Link to="/" className="brand" aria-label="SmartTour home">
          <span className="brand-mark">S</span>
          <span>SmartTour</span>
        </Link>

        <nav className="nav-menu" aria-label="Main navigation">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={15} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <Link to="/plan" className="primary-btn nav-cta">
          Plan My Trip
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
