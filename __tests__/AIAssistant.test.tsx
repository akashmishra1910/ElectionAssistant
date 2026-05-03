import { render, screen, fireEvent, act } from '@testing-library/react';
import AIAssistant from '@/components/ui/AIAssistant';

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

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('AIAssistant', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('opens chat window when floating button is clicked', () => {
    render(<AIAssistant />);
    
    const openButton = screen.getByLabelText('Open AI Assistant');
    fireEvent.click(openButton);
    
    expect(screen.getByText('Election AI Guide')).toBeInTheDocument();
  });

  it('handles user input and shows mock response', async () => {
    // Mock fetch for this specific test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ reply: "NOTA stands for 'None of the Above'" }),
      })
    ) as jest.Mock;

    render(<AIAssistant />);
    
    // Open chat
    fireEvent.click(screen.getByLabelText('Open AI Assistant'));
    
    // Type question
    const input = screen.getByPlaceholderText('Ask a question...');
    fireEvent.change(input, { target: { value: 'what is nota?' } });
    
    // Submit
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    // User message should appear immediately
    expect(screen.getByText('what is nota?')).toBeInTheDocument();
    
    // Fast forward timers to simulate API response
    await act(async () => {
      // Allow promises to resolve
      await Promise.resolve();
    });
    
    // Assistant response should appear
    expect(screen.getByText(/NOTA stands for 'None of the Above'/i)).toBeInTheDocument();
  });
});
