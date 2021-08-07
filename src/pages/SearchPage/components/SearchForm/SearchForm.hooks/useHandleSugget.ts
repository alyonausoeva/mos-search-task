import { useCallback } from 'react';

export const useHandlSugget = (
    input: React.RefObject<HTMLInputElement>,
    setValue: any,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const handleSugget = useCallback(
        (searchParam: string) => {
            input.current && input.current.focus();
            setValue(searchParam);
            setVisibility(true);
        },
        [setValue, setVisibility, input]
    );

    return handleSugget;
};
