import 'react';

declare module 'react' {
    interface CSSProperties {
        '--hue'?: string;
        // Add other custom properties as needed
    }
}