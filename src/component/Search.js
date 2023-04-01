import { forwardRef, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: auto;
    justify-content: center;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px;
    padding: 4px 16px;
    width: 100%;
    align-items: center;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
`;

const SearchInput = styled.input`
    background: transparent;
    font-size: 16px;
    outline: none;
    color: #5e5e5e;
    border: none;
    flex: auto;
    margin-left: 8px;
`;

const SearchOptionButton = styled.p`
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
    color: #5e5e5e;
`;

const Search = ({ setQuery, setFilters }) => {
    const searchTagsFromLocalStorage = JSON.parse(
        localStorage.getItem('searchTags')
    );
    const initialSearchTag = searchTagsFromLocalStorage
        ? searchTagsFromLocalStorage
        : [];
    const [searchOption, setSearchOption] = useState(false);
    const [searchList, setSearchList] = useState(initialSearchTag);

    const inputRef = useRef('');

    const toggleSearchOption = () => {
        setSearchOption((prev) => !prev);
    };

    const onSearch = (e) => {
        if (e.code === 'Enter') {
            const currentValue = e.target.value;
            setQuery(currentValue);

            inputRef.current.value = '';
            setSearchList((prev) => [...prev, currentValue]);
        }
    };

    const handleClickSearch = (tag) => {
        setQuery(tag);
        inputRef.current.value = tag;
    };

    const handleDelete = (id) => {
        const newSearchTag = [...searchList];
        newSearchTag.splice(id, 1);
        setSearchList(newSearchTag);
    };

    useEffect(() => {
        localStorage.setItem('searchTags', JSON.stringify(searchList));
    }, [searchList]);

    return (
        <>
            <SearchBoxContainer>
                <SearchInputContainer>
                    <SearchIcon width="24" fill="#5e5e5e" />
                    <SearchInput
                        placeholder="검색어 입력 후 ENTER"
                        onKeyDown={onSearch}
                        ref={inputRef}
                    />
                    <SearchOptionButton onClick={toggleSearchOption}>
                        검색 옵션 {searchOption ? '닫기' : '열기'}
                    </SearchOptionButton>
                </SearchInputContainer>
                {searchOption && <SearchOption setFilters={setFilters} />}
            </SearchBoxContainer>
            <SearchTagContainer>
                {/* {latestKeywordList.map((item) => (
                    <SearchTag key={item} text={item} />
                ))} */}
                {searchList?.map((item, idx) => (
                    <SearchTag
                        item={item}
                        key={item + idx}
                        handleClickSearch={() => handleClickSearch(item)}
                        handleDelete={() => handleDelete(idx)}
                    />
                ))}
            </SearchTagContainer>
        </>
    );
};

export default Search;

// 검색어을 입력하고 엔터를 친다
// 최근 검색어 태그가 노출된다.

// 최근 검색어를 관리하는 배열이 있어야한다.
// 근데 map을 뿌릴때, key가 중복되면 안되는건 어떻게 해결해야할까? idx로 가자
