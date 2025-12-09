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
            ResFi
          </span>
        </div>
        <button 
          onClick={scrollToForm}
          className="btn-primary nav-cta-button"
        >
          Join Waitlist
        </button>
      </nav>

      {/* Hero Section with Gradient */}
      <section style={{ 
        background: 'var(--gradient-hero)',
        minHeight: 'auto', 
        padding: '6rem 1.5rem 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 8s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero Content */}
          <div className="hero-content fade-in-up" style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1 className="heading-1" style={{ 
              marginBottom: '1.5rem',
              textShadow: '0 0 40px rgba(96, 165, 250, 0.3)'
            }}>
              AI-Native<br />Automated Banking
            </h1>
            <p className="body-large" style={{ 
              marginBottom: '0', 
              color: 'var(--text-secondary)', 
              maxWidth: '800px', 
              margin: '0 auto',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
            }}>
              Make your money work for you every day. Let us help you get out of debt and set out on a path to savings.
            </p>
          </div>
          
          {/* Outcomes Grid below hero */}
          <div className="outcomes-grid">
            {guaranteedOutcomes.map((outcome, index) => (
              <div key={outcome.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <OutcomeCard outcome={outcome} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form Section with same gradient */}
      <section 
        id="waitlist-form"
        style={{ 
          background: 'var(--gradient-hero)',
          padding: '3rem 1.5rem 5rem',
          position: 'relative'
        }}
      >
        <div className="container">
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
              ResFi
            </span>
          </div>
          <p className="body-small" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            © 2025 ResFi. AI-native automated banking.
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