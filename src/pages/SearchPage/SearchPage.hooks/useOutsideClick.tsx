import { useEffect } from 'react';

const useOutsideClick = (rootEl: any, setVisibility: any) => {
    useEffect(() => {
        const onClick = (e: any) =>
            (rootEl.current && rootEl.current.contains(e.target)) ||
            setVisibility(false);

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [rootEl, setVisibility]);

    return null;
};

export default useOutsideClick;
