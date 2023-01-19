import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    });
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }
        if (delay !== null) {
            const timerId = setInterval(tick, delay);
            return () => clearInterval(timerId);
        }
    }, [delay]);
}

export default useInterval;