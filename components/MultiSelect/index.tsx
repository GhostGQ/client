import React, {useEffect, useRef, useState} from 'react';
import {BiTrash} from "react-icons/bi";
import {useTranslation} from "react-i18next";

// Custom deep comparison for arrays of string | number
function isEqual(arr1: (string | number)[], arr2: (string | number)[]): boolean {
    if (arr1.length !== arr2.length) return false;
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    return sortedArr1.every((value, index) => value === sortedArr2[index]);
}

interface MultiSelectProps {
    options: string[];
    selectedValues?: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
    disabled?: boolean;
    translatablePrefix?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
                                                     options,
                                                     selectedValues = [],
                                                     onChange,
                                                     placeholder = 'Выберите опции...',
                                                     isSearchable = true,
                                                     className = '',
                                                     disabled = false,
                                                     translatablePrefix = null
                                                 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>(selectedValues);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {t} = useTranslation('common')

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sync selected state with selectedValues prop only if they differ
    useEffect(() => {
        if (!isEqual(selected, selectedValues)) {
            setSelected(selectedValues);
        }
    }, [selectedValues]);

    // Filter options based on search input
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    // Handle option selection
    const handleOptionClick = (value: string) => {
        const updatedSelection = selected.includes(value)
            ? selected.filter(item => item !== value)
            : [...selected, value];
        setSelected(updatedSelection);
        onChange(updatedSelection);
    };

    // Handle deletion of a selected item
    const handleDelete = (value: string) => {
        const updatedSelection = selected.filter(item => item !== value);
        setSelected(updatedSelection);
        onChange(updatedSelection);
    };

    // Display selected values or placeholder
    const getDisplayValue = () => {
        if (selected.length === 0) return <span className="text-white">{placeholder}</span>;
        const selectedLabels = selected
            .map(value => options.find(option => option === value))
            .filter(label => label !== undefined);
        return (
            <ul className='flex flex-wrap items-center gap-x-2 gap-y-2'>
                {selectedLabels.map(e => (
                    <li
                        key={e}
                        className='inline-flex items-center gap-x-2 px-1.5 py-1 rounded-md text-white bg-gray-500'
                    >
                        {e}

                        <button
                            onClick={() => handleDelete(e)}
                        >
                            <BiTrash/></button>
                    </li>
                ))}
            </ul>);
    };

    // Toggle dropdown and reset search
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            setSearch('');
        }
    };

    return (
        <div
            className={`relative w-full font-sans ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            ref={wrapperRef}
        >
            <div
                className="flex justify-between items-center border border-[#444444] bg-[#2a2a2a] rounded-md p-2 cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex-grow text-gray-700">{getDisplayValue()}</div>
                <div className="text-sm">{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 border bg-[#2a2a2a] border-[#444444] rounded-md shadow-lg z-10 max-h-[200px] overflow-y-auto">
                    {isSearchable && (
                        <input
                            type="text"
                            className="w-full p-2 border-b border-gray-800 outline-none disabled:cursor-not-allowed"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Поиск..."
                            disabled={disabled}
                        />
                    )}
                    <ul className="m-0 p-0 list-none">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map(option => (
                                <li
                                    key={option}
                                    className={`p-2 cursor-pointer hover:bg-gray-600 ${selected.includes(option) ? 'text-blue-300' : 'text-white'}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {
                                        translatablePrefix ?
                                            t(`${translatablePrefix}.${option}`) :
                                            option
                                    }
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">Нет результатов</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
