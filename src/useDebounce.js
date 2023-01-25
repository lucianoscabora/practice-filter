import { useRef } from "react";

export default function useDebounce(func, delay) {

    const timeoutRef = useRef(null);

    function debouncedFunc(...params) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = window.setTimeout(() => {
            func(...params);
        }, delay);
        
    }

    return debouncedFunc;
}