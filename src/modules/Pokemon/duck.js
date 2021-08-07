import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import * as constants from './constants';

export const fetchSuggestionsRequest = createAction(
    constants.FETCH_SUGGESTIONS_REQUEST
);
export const fetchSuggestionsSuccess = createAction(
    constants.FETCH_SUGGESTIONS_SUCCESS
);
export const fetchSuggestionsError = createAction(
    constants.FETCH_SUGGESTIONS_ERROR
);

export const fetchPokemonRequest = createAction(
    constants.FETCH_POKEMON_REQUEST
);
export const fetchPokemonSuccess = createAction(
    constants.FETCH_POKEMON_SUCCESS
);
export const fetchPokemonError = createAction(constants.FETCH_POKEMON_ERROR);
export const removePokemon = createAction(constants.REMOVE_POKEMON);

const searchSuggestions = handleActions(
    {
        [fetchSuggestionsRequest]: () => null,
        [fetchSuggestionsSuccess]: (_state, action) => action.payload,
        [fetchSuggestionsError]: (_state, action) => action.payload
    },
    null
);

const searchResults = handleActions(
    {
        [fetchPokemonRequest]: () => null,
        [fetchPokemonSuccess]: (_state, action) => action.payload,
        [fetchPokemonError]: (_state, action) => action.payload,
        [removePokemon]: () => null
    },
    null
);

export default combineReducers({
    searchSuggestions,
    searchResults
});
