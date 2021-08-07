import { useCallback, KeyboardEvent } from 'react';

export const useHandleKey = (
    handleRemove: any,
    isVisible: boolean,
    handleSubmit: any,
    suggestions: Array<string>,
    setCursor: React.Dispatch<React.SetStateAction<number>>
) => {
    const handleKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowDown') {
                isVisible &&
                    setCursor((prev: number) =>
                        prev < suggestions.length - 1 ? ++prev : prev
                    );
            }
            if (e.key === 'ArrowUp') {
                setCursor((prev: number) => (prev > 0 ? --prev : prev));
            }
            if (e.key === 'Escape') {
                handleRemove();
            }
            if (e.key === 'Enter') {
                handleSubmit(e);
            }
        },
        [handleRemove, isVisible, handleSubmit, suggestions, setCursor]
    );

    return handleKeyPress;
};
