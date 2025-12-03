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
    title: 'Get out of debt faster while paying less',
    description: 'Our AI automatically optimizes your cash to pay thousands less in interest and pay it off faster.',
    icon: 'TrendingDown'
  },
  {
    id: 2,
    title: 'Automated savings',
    description: 'Smart algorithms analyze your spending patterns and automatically transfer money to high-yield savings.',
    icon: 'PiggyBank'
  },
  {
    id: 3,
    title: 'No more financial stress',
    description: 'Set your goals once and let AI handle everything - bill payments, savings, investments, and debt payoff, all on autopilot.',
    icon: 'Shield'
  }
];

export const userGoalOptions = [
  { id: 'refinance', label: 'Pay off my debt faster' },
  { id: 'new_loan', label: 'Get a new loan' },
  { id: 'hysa', label: 'Earn more interest on my savings' },
  { id: 'automation', label: 'Automate my money' }
];