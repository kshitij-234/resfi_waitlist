import React from 'react';
import { TrendingDown, PiggyBank, Shield } from 'lucide-react';

const iconMap = {
  TrendingDown: TrendingDown,
  PiggyBank: PiggyBank,
  Shield: Shield
};

const OutcomeCard = ({ outcome }) => {
  const IconComponent = iconMap[outcome.icon] || Shield;
  
  return (
    <div className="product-card fade-in-up">
      <div style={{ 
        background: 'var(--accent-wash)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid var(--border-glow)',
        width: '64px', 
        height: '64px', 
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        boxShadow: 'var(--glow-subtle)',
        transition: 'all 0.3s ease'
      }}>
        <IconComponent size={32} color="var(--accent-text)" strokeWidth={1.5} />
      </div>
      
      <h3 className="heading-3" style={{ marginBottom: '1rem' }}>
        {outcome.title}
      </h3>
      
      <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
        {outcome.description}
      </p>
    </div>
  );
};

export default OutcomeCard;