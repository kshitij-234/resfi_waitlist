import React, { useState } from 'react';
import { userGoalOptions } from '../mock';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    goals: {
      debt: false,
      loan: false,
      savings: false,
      automate: false
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (goalId) => {
    setFormData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        [goalId]: !prev.goals[goalId]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.first_name || !formData.last_name) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const hasSelectedGoal = Object.values(formData.goals).some(val => val);
    if (!hasSelectedGoal) {
      toast.error('Please select at least one goal');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/waitlist`, {
        email: formData.email.toLowerCase(),
        first_name: formData.first_name,
        last_name: formData.last_name,
        debt: formData.goals.debt,
        loan: formData.goals.loan,
        savings: formData.goals.savings,
        automate: formData.goals.automate
      });
      
      setIsSubmitted(true);
      toast.success(response.data.message);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          email: '',
          first_name: '',
          last_name: '',
          goals: {
            debt: false,
            loan: false,
            savings: false,
            automate: false
          }
        });
      }, 3000);
      
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to join waitlist. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="waitlist-form-container" style={{ textAlign: 'center', padding: '3rem' }}>
        <div className="fade-in-up">
          <CheckCircle2 size={64} color="var(--accent-strong)" style={{ margin: '0 auto 1.5rem' }} />
          <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>You're on the list!</h3>
          <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
            We'll notify you when ResFi.ai launches.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="waitlist-form-container">
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Email Address *
          </Label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <Label htmlFor="first_name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              First Name *
            </Label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="John"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="last_name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Last Name *
            </Label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <Label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '1rem' }}>
            I'm looking to: *
          </Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {userGoalOptions.map(option => (
              <label key={option.id} className="checkbox-label">
                <Checkbox
                  id={option.id}
                  checked={formData.goals[option.id]}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <span style={{ fontSize: '0.95rem' }}>{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
          style={{ width: '100%' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
              Joining...
            </>
          ) : (
            'Join Waitlist'
          )}
        </button>
      </form>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default WaitlistForm;