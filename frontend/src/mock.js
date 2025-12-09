// Mock data and functions for ResFi.ai landing page

export const mockWaitlistData = {
  submittedEmails: [],
  
  submitToWaitlist: async (formData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const emailExists = mockWaitlistData.submittedEmails.some(
      entry => entry.email === formData.email
    );
    
    if (emailExists) {
      throw new Error('This email address is already on the waitlist');
    }
    
    // Add to mock database
    const newEntry = {
      id: Date.now(),
      ...formData,
      created_at: new Date().toISOString()
    };
    
    mockWaitlistData.submittedEmails.push(newEntry);
    
    return {
      success: true,
      message: 'Thank you for joining our waitlist!',
      data: newEntry
    };
  },
  
  getWaitlistCount: () => {
    return mockWaitlistData.submittedEmails.length;
  }
};

export const guaranteedOutcomes = [
  {
    id: 1,
    title: 'Pay Less Interest',
    description: 'Automatically optimize your excess cash to save hundreds or even thousands in interest.',
    icon: 'TrendingDown'
  },
  {
    id: 2,
    title: 'Get out of Debt Faster',
    description: 'Utilize interest savings to pay off your debt faster.',
    icon: 'PiggyBank'
  },
  {
    id: 3,
    title: 'Reduce Financial Stress',
    description: 'Set your goals once and let AI handle everything on autopilot.',
    icon: 'Shield'
  }
];

export const userGoalOptions = [
  { id: 'refinance', label: 'Pay off my debt faster' },
  { id: 'new_loan', label: 'Get a new loan' },
  { id: 'hysa', label: 'Earn more interest on my savings' },
  { id: 'automation', label: 'Automate my money management' }
];