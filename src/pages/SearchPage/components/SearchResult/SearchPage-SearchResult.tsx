import React from 'react';

import { cnSearchPage } from 'pages/SearchPage';
import './SearchPage-SearchResult.scss';

interface ISearchResultProps {
    pokemon: any;
}

const SearchResult: React.FC<ISearchResultProps> = ({ pokemon }: any) => {
    return (
        <div className={cnSearchPage('SearchResult')}>
            <h3 className={cnSearchPage('Name')}>
                {pokemon.abilities
                    ? `Покемон ${pokemon.name.toUpperCase()}`
                    : 'No result'.toUpperCase()}
            </h3>
            {pokemon.abilities && (
                <div>
                    <div> Height: {pokemon.weight}</div>
                    <div> Weight: {pokemon.height}</div>
                    <ul className={cnSearchPage('Abilities')}>
                        Abilities:{' '}
                        {pokemon.abilities &&
                            pokemon.abilities.map((item: any) => {
                                return (
                                    <li
                                        className={cnSearchPage('Ability')}
                                        key={item.ability.name}
                                    >
                                        {item.ability.name}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchResult;
