import { useEffect } from 'react';

export const useKeyPress = (key: string, action: any) => {
    useEffect(() => {
        function onKeyup(e: any) {
            if (e.key === key) action(e);
        }
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
    }, [action, key]);
};
