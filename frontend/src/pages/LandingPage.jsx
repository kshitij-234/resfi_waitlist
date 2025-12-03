import React from 'react';
import { guaranteedOutcomes } from '../mock';
import WaitlistForm from '../components/WaitlistForm';
import OutcomeCard from '../components/OutcomeCard';
import '../styles/resfi.css';

const LandingPage = () => {
  const scrollToForm = () => {
    document.getElementById('waitlist-form').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="nav-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            background: 'var(--gradient-button)', 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px' 
          }} />
          <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
            ResFi.ai
          </span>
        </div>
        <button 
          onClick={scrollToForm}
          className="btn-primary nav-cta-button"
        >
          Join Waitlist
        </button>
      </nav>

      {/* Unified Gradient Section - Hero, Outcomes, and Form */}
      <section className="hero-section" style={{ minHeight: 'auto', padding: '6rem 1.5rem 5rem' }}>
        {/* Hero Content */}
        <div className="hero-content fade-in-up" style={{ marginBottom: '3rem' }}>
          <h1 className="heading-1" style={{ marginBottom: '1rem' }}>
            AI-Native<br />Automated Banking
          </h1>
          <p className="body-large" style={{ marginBottom: '0', color: 'var(--text-secondary)' }}>
            Make your money work for you every day. Set it once, and let our AI handle everything.
          </p>
        </div>
        
        {/* Outcomes Grid */}
        <div className="container" style={{ marginBottom: '4rem' }}>
          <div className="outcomes-grid">
            {guaranteedOutcomes.map(outcome => (
              <OutcomeCard key={outcome.id} outcome={outcome} />
            ))}
          </div>
        </div>

        {/* Waitlist Form within same gradient */}
        <div className="container" id="waitlist-form">
          <div className="product-card" style={{ 
            maxWidth: '650px', 
            margin: '0 auto',
            padding: '2.5rem',
            textAlign: 'left'
          }}>
            <h2 className="heading-3" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
              Join the Waitlist
            </h2>
            <p className="body-small" style={{ marginBottom: '2rem', textAlign: 'center' }}>
              Be among the first to experience AI-powered financial freedom
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-page)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-light)'
      }}>
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
              ResFi.ai
            </span>
          </div>
          <p className="body-small" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            © 2025 ResFi.ai. AI-native automated banking.
          </p>
          <p className="body-small" style={{ color: 'var(--text-muted)' }}>
            Contact us: <a href="mailto:asheet@resfi.ai" style={{ color: 'var(--accent-text)', textDecoration: 'none' }}>asheet@resfi.ai</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;