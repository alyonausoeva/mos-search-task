import React, {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    KeyboardEvent,
    useRef
} from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';

import Button from 'components/Button';
import { getSearchSuggestions } from 'modules/Pokemon';
import { useKeyPress } from './SearchForm.hooks';
import { useHelpers } from './SearchForm.hooks';
import { useHandleKey } from './SearchForm.hooks';
import { useHandlSugget } from './SearchForm.hooks';
import './SearchPage-SearchForm.scss';

interface SearchFormProps {
    value: string;
    isVisible: boolean;
    setValue: Dispatch<SetStateAction<string>>;
    setVisibility: Dispatch<SetStateAction<boolean>>;
}

const SearchForm: React.FC<SearchFormProps> = ({
    value,
    setValue,
    isVisible,
    setVisibility
}: SearchFormProps) => {
    const cnSearchForm = cn('SearchForm');

    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [cursor, setCursor] = useState<number>(-1);
    const input = useRef<HTMLInputElement>(null);
    const selectedData = useSelector(getSearchSuggestions);

    useKeyPress('Escape', (e: KeyboardEvent<HTMLInputElement>) => {
        handleKeyPress(e);
    });
    useKeyPress('Enter', (e: KeyboardEvent<HTMLInputElement>) => {
        handleKeyPress(e);
    });

    useKeyPress('ArrowDown', (e: KeyboardEvent<HTMLInputElement>) => {
        handleKeyPress(e);
    });
    useKeyPress('ArrowUp', (e: KeyboardEvent<HTMLInputElement>) => {
        handleKeyPress(e);
    });

    const handleSugget = useHandlSugget(input, setValue, setVisibility);

    const { handleSubmit, handleChange, handleRemove } = useHelpers(
        value,
        setValue,
        setVisibility,
        setSuggestions
    );

    const handleKeyPress = useHandleKey(
        handleRemove,
        isVisible,
        handleSubmit,
        suggestions,
        setCursor
    );

    useEffect(() => {
        const newSuggestions =
            selectedData &&
            selectedData.filter(
                (item: string) =>
                    value.toLowerCase() &&
                    item.toLowerCase().startsWith(value.toLowerCase())
            );

        setSuggestions(newSuggestions);
    }, [value, selectedData]);

    return (
        <div>
            <form className={cnSearchForm()} onSubmit={handleSubmit}>
                <div className={cnSearchForm('InputBox')}>
                    <input
                        className={cnSearchForm('Input')}
                        type="text"
                        value={value}
                        onChange={e => handleChange(e.target.value)}
                        ref={input}
                        autoFocus={true}
                        onKeyPress={handleKeyPress}
                    />

                    <div
                        className={cnSearchForm('IconBox')}
                        onClick={handleRemove}
                    >
                        {value && (
                            <img
                                className={cnSearchForm('Icon')}
                                src={require('./assets/cross.svg')}
                                alt="cross"
                            />
                        )}
                    </div>

                    <Button disabled={!value} />
                </div>

                {isVisible && suggestions && suggestions.length > 0 && (
                    <div className={cnSearchForm('SuggestsList')}>
                        {suggestions.map((item: string, index: number) => {
                            value = value.toLowerCase();
                            const newItem = item
                                .toLowerCase()
                                .replace(value, '');

                            return (
                                <div
                                    key={item}
                                    onKeyPress={item => {
                                        console.log(item);
                                    }}
                                >
                                    {' '}
                                    {
                                        <div
                                            className={cnSearchForm('Suggest', [
                                                cnSearchForm({
                                                    hovered: cursor === index
                                                })
                                            ])}
                                            onClick={() => {
                                                handleSugget(item);
                                            }}
                                        >
                                            {value}
                                            <b>{newItem}</b>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SearchForm;
