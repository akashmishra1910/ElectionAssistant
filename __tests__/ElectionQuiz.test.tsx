import { render, screen, fireEvent } from '@testing-library/react';
import ElectionQuiz from '@/components/quiz/ElectionQuiz';

jest.mock('framer-motion', () => ({
  motion: {
    div: require('react').forwardRef((props: any, ref: any) => {
      const { initial, animate, exit, layout, transition, ...rest } = props;
      return <div ref={ref} {...rest} />;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ElectionQuiz', () => {
  it('renders the first question', () => {
    render(<ElectionQuiz />);
    expect(screen.getByText('What is the minimum age to be eligible to vote in India?')).toBeInTheDocument();
  });

  it('allows selecting an option and checking the answer', () => {
    render(<ElectionQuiz />);
    
    // Select correct option
    const option = screen.getByText('18 Years');
    fireEvent.click(option);
    
    // Check answer
    const checkButton = screen.getByText('Check Answer');
    fireEvent.click(checkButton);
    
    // Verify feedback
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    
    // Next button should appear
    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
