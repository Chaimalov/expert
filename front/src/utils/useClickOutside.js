import React, { useEffect, useRef } from 'react'

export function useClickOutside(handler) {
    const domNode = useRef()

    useEffect(() => {
        function maybeHandler(event) {
            if (!domNode.current.contains(event.target)) {
                handler()
            }
        }

        document.addEventListener("mousedown", maybeHandler)

        return () => {
            document.removeEventListener("mousedown", maybeHandler)
        }
    })

    return domNode
}
