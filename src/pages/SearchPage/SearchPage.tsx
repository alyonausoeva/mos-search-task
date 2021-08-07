import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { cn } from '@bem-react/classname';

import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import { getSearchResults } from 'modules/Pokemon';
import './SearchPage.scss';

export const cnSearchPage = cn('SearchPage');

const Search: React.FC = () => {
    const pokemon = useSelector(getSearchResults);
    const [value, setValue] = useState<string>('');
    const rootEl = useRef<HTMLDivElement>(null);
    const [isVisible, setVisibility] = useState(true);

    useEffect(() => {
        const onClick = (e: any) =>
            (rootEl.current && rootEl.current.contains(e.target)) ||
            setVisibility(false);
        document.addEventListener('click', onClick);

        return () => document.removeEventListener('click', onClick);
    }, [isVisible]);

    return (
        <>
            <div ref={rootEl}>
                <SearchForm
                    value={value}
                    setValue={setValue}
                    isVisible={isVisible}
                    setVisibility={setVisibility}
                />
            </div>
            {pokemon && <SearchResult pokemon={pokemon} />}
        </>
    );
};

export default Search;
