
export interface ConfigurationState {
  width: number;
  length: number;
  material: 'oak' | 'walnut' | 'rosewood';
  tableBase: 'lift' | 'liftClosed' | 'staticP' | 'staticZ';
  storage: 'none' | 'hanging' | 'mobile' | 'integratedS' | 'integratedM';
  options: {
    wireless: boolean;
    phoneHolder: boolean;
    usbHub: boolean;
    lighting: boolean;
    speakerphone: boolean;
    idLock: boolean;
    charger: boolean;
    audioSystem: boolean;
    wireShelf: boolean;
    voiceAssistant: boolean;
  };
}

export interface MaterialOption {
  value: string;
  label: string;
  description: string;
  price: number;
}

export interface BaseOption {
  value: string;
  label: string;
  description: string;
  price: number;
}

export interface StorageOption {
  value: string;
  label: string;
  description: string;
  price: number;
}

export interface AdditionalOption {
  key: keyof ConfigurationState['options'];
  label: string;
  description: string;
  price: number;
  tooltip: string;
}
