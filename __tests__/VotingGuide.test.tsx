import { render, screen, fireEvent } from '@testing-library/react';
import VotingGuide from '@/components/simulator/VotingGuide';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: require('react').forwardRef((props: any, ref: any) => {
      const { initial, animate, exit, layout, transition, ...rest } = props;
      return <div ref={ref} {...rest} />;
    }),
    button: require('react').forwardRef((props: any, ref: any) => {
      const { initial, animate, exit, whileHover, whileTap, ...rest } = props;
      return <button ref={ref} {...rest} />;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('VotingGuide', () => {
  it('renders the initial age question', () => {
    render(<VotingGuide />);
    expect(screen.getByText('How old are you?')).toBeInTheDocument();
  });

  it('shows ineligible message for users under 18', () => {
    render(<VotingGuide />);
    
    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '16' } });
    
    const nextButton = screen.getByText('Next Question');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('You are not yet eligible.')).toBeInTheDocument();
  });

  it('progresses to registration question for users 18 or older', () => {
    render(<VotingGuide />);
    
    const input = screen.getByPlaceholderText('Enter your age');
    fireEvent.change(input, { target: { value: '25' } });
    
    const nextButton = screen.getByText('Next Question');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Are you registered in the official voter list?')).toBeInTheDocument();
  });
});
