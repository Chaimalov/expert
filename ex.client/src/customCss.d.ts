import 'react';

declare module 'react' {
  interface CSSProperties {
    '--customColor'?: string;
    // Add other custom properties as needed
  }
}
