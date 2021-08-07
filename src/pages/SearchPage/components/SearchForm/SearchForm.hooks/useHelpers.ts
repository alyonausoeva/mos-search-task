import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { fetchSuggestionsRequest, fetchPokemonRequest } from 'modules/Pokemon';

export const useHelpers = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const dispatch = useDispatch();

    const handleChange = useCallback(
        value => {
            setValue(value);
            dispatch(fetchSuggestionsRequest());
            setVisibility(true);
        },
        [setValue, dispatch, setVisibility]
    );

    const handleSubmit = useCallback(
        async e => {
            e.preventDefault();
            setSuggestions([]);
            dispatch(fetchPokemonRequest(value));
        },
        [dispatch, value, setSuggestions]
    );

    const handleRemove = useCallback(() => {
        setValue('');
    }, [setValue]);

    return {
        handleChange,
        handleSubmit,
        handleRemove
    };
};
