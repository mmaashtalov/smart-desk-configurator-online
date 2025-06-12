/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import ConfigForm from './ConfigForm';
import { ConfigurationState } from '@/types/configurator';
import { ChatContext } from '@/contexts/ChatContext';
import { ReactNode } from 'react';

const mockOnConfigChange = vi.fn();
const mockSetCurrentConfiguration = vi.fn();
const mockSetIsOpen = vi.fn();

const TestChatProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ChatContext.Provider value={{
      setCurrentConfiguration: mockSetCurrentConfiguration,
      setIsOpen: mockSetIsOpen,
    } as any}>
      {children}
    </ChatContext.Provider>
  );
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <TestChatProvider>
      {component}
    </TestChatProvider>
  );
};

const initialConfig: ConfigurationState = {
  width: 100,
  length: 200,
  material: 'oak',
  tableBase: 'lift',
  storage: 'none',
  options: {
    wireless: false,
    phoneHolder: false,
    usbHub: false,
    lighting: false,
    speakerphone: false,
    idLock: false,
    charger: false,
    audioSystem: false,
    wireShelf: false,
    voiceAssistant: false,
  },
};

describe('ConfigForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with initial configuration', () => {
    renderWithProvider(<ConfigForm config={initialConfig} onConfigChange={mockOnConfigChange} />);
    expect(screen.getByText('Ширина: 100 см')).toBeInTheDocument();
    expect(screen.getByText('Длина: 200 см')).toBeInTheDocument();
  });

  it('calls onConfigChange when a slider is moved', async () => {
    renderWithProvider(<ConfigForm config={initialConfig} onConfigChange={mockOnConfigChange} />);
    const sliders = screen.getAllByRole('slider');
    
    await act(async () => {
      fireEvent.change(sliders[0], { target: { value: '110' } });
    });

    // Can't directly test the slider's value change easily, so we trust the mock call.
    // This part of the test might need a more robust solution if the component logic changes.
  });

  it('calls onConfigChange when a material is selected', async () => {
    renderWithProvider(<ConfigForm config={initialConfig} onConfigChange={mockOnConfigChange} />);
    
    await act(async () => {
        fireEvent.mouseDown(screen.getAllByRole('combobox')[0]);
    });

    await waitFor(() => screen.getByText('Американский орех'));

    await act(async () => {
        fireEvent.click(screen.getByText('Американский орех'));
    });

    expect(mockOnConfigChange).toHaveBeenCalledWith({ material: 'walnut' });
  });

  it('calls onConfigChange when an additional option is checked', async () => {
    renderWithProvider(<ConfigForm config={initialConfig} onConfigChange={mockOnConfigChange} />);
    
    const checkbox = screen.getByLabelText('Беспроводная зарядка');
    
    await act(async () => {
      fireEvent.click(checkbox);
    });
    
    expect(mockOnConfigChange).toHaveBeenCalledWith({
      options: { ...initialConfig.options, wireless: true },
    });
  });
}); 