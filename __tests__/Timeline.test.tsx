import { render, screen, fireEvent } from '@testing-library/react';
import Timeline from '@/components/election/Timeline';

jest.mock('framer-motion', () => ({
  motion: {
    div: require('react').forwardRef((props: any, ref: any) => {
      const { initial, animate, exit, layout, transition, ...rest } = props;
      return <div ref={ref} {...rest} />;
    }),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Timeline', () => {
  it('renders the timeline header', () => {
    render(<Timeline />);
    expect(screen.getByText('Election Timeline')).toBeInTheDocument();
  });

  it('renders the first event expanded by default', () => {
    render(<Timeline />);
    expect(screen.getByText('Election Announced')).toBeInTheDocument();
    expect(screen.getByText(/The official dates are announced/i)).toBeInTheDocument();
  });

  it('expands another event when clicked', () => {
    render(<Timeline />);
    
    const nominationEvent = screen.getByText('Nomination Filing');
    fireEvent.click(nominationEvent);
    
    expect(screen.getByText(/Candidates from various parties/i)).toBeInTheDocument();
  });
});
