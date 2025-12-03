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
        width: '56px', 
        height: '56px', 
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <IconComponent size={28} color="var(--accent-text)" />
      </div>
      
      <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>
        {outcome.title}
      </h3>
      
      <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
        {outcome.description}
      </p>
    </div>
  );
};

export default OutcomeCard;