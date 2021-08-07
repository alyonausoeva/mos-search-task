export const getSearchSuggestions = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
    const data = await response.json();
    const searchSuggestions = data.results.map((item: any) => item.name);

    return searchSuggestions;
};

export const getSearchResults = async (searchParam: string) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchParam}`
    );
    const { name, height, weight, abilities } = await response.json();
    return { name, height, weight, abilities };
};
