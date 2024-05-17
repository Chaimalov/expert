import { useEffect, useRef } from 'react'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(handler: () => void) => {
    const domNode = useRef<T | null>(null);

    useEffect(() => {
        function maybeHandler(event: MouseEvent) {
            if (domNode.current && !domNode.current.contains(event.target as Node)) {
                handler();
            }
        }

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    }, [handler]);

    return domNode;
};
