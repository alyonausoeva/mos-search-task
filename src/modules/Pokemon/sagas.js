import { takeLatest, call, put } from 'redux-saga/effects';

import {
    fetchSuggestionsRequest,
    fetchSuggestionsSuccess,
    fetchSuggestionsError,
    fetchPokemonRequest,
    fetchPokemonSuccess,
    fetchPokemonError
} from './duck';
import { getSearchSuggestions, getSearchResults } from './api';

function* fetchSuggestionsWatcher() {
    yield takeLatest(fetchSuggestionsRequest, fetchSuggestionsFlow);
    yield takeLatest(fetchPokemonRequest, fetchPokemonFlow);
}

function* fetchSuggestionsFlow(action) {
    try {
        const searchParams = action.payload;
        const searchSuggestions = yield call(
            getSearchSuggestions,
            searchParams
        );

        yield put(fetchSuggestionsSuccess(searchSuggestions));
    } catch (error) {
        yield put(fetchSuggestionsError(error));
    }
}

function* fetchPokemonFlow(action) {
    try {
        const searchParams = action.payload;

        const searchResults = yield call(getSearchResults, searchParams);

        yield put(fetchPokemonSuccess(searchResults));
    } catch (error) {
        yield put(fetchPokemonError(error));
    }
}

export default function*() {
    yield fetchSuggestionsWatcher();
}
