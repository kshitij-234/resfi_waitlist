import React, { useState, useEffect } from 'react';
import { TrendingDown, PiggyBank, Shield, ChevronDown } from 'lucide-react';

const iconMap = {
  TrendingDown: TrendingDown,
  PiggyBank: PiggyBank,
  Shield: Shield
};

const OutcomeCard = ({ outcome }) => {
  const IconComponent = iconMap[outcome.icon] || Shield;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpand = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  return (
    <div 
      className="product-card fade-in-up outcome-card"
      onClick={toggleExpand}
      style={{ 
        cursor: isMobile ? 'pointer' : 'default',
        minHeight: isMobile ? 'auto' : '380px'
      }}
    >
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
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 className="heading-3" style={{ marginBottom: isMobile ? '0' : '1rem', flex: 1 }}>
          {outcome.title}
        </h3>
        {isMobile && (
          <ChevronDown 
            size={24} 
            color="var(--accent-text)" 
            style={{ 
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              marginLeft: '8px',
              flexShrink: 0
            }} 
          />
        )}
      </div>
      
      <div style={{
        maxHeight: isMobile ? (isExpanded ? '500px' : '0') : 'none',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        marginTop: isMobile ? (isExpanded ? '1rem' : '0') : '0'
      }}>
        <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          {outcome.description}
        </p>
      </div>
    </div>
  );
};

export default OutcomeCard;