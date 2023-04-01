import styled from 'styled-components';
import { ReactComponent as PrevIcon } from '../asset/prev.svg';
import { ReactComponent as NextIcon } from '../asset/next.svg';
import { useState } from 'react';

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    color: var(--text); ;
`;

const PageSelect = styled.select`
    cursor: pointer;
    background-color: var(--primary);
    border: none;
    font-size: 16px;
    color: var(--highlight);
    font-weight: bold;
    font-family: inherit;
    &:focus {
        outline: none;
    }
`;

const Pagination = ({ pages, setCurrentPage, currentPage }) => {
    const grid = Array(1 * pages)
        .fill()
        .map((arr, i) => parseInt(i + 1));
    console.log('currentPage', currentPage);
    const handleClickPrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleClickNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleChangeSelect = (e) => {
        setCurrentPage(Number(e.target.value));
    };

    return (
        <Nav>
            {currentPage > 1 ? (
                <PrevIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={handleClickPrevPage}
                />
            ) : null}
            {`총 ${pages} 중 `}
            <PageSelect
                name="page"
                onChange={handleChangeSelect}
                value={currentPage}
            >
                {grid.map((number) => (
                    <option value={number} key={number}>
                        {number}
                    </option>
                ))}
            </PageSelect>
            페이지
            {currentPage < pages ? (
                <NextIcon
                    width="24"
                    cursor="pointer"
                    fill="var(--text)"
                    onClick={handleClickNextPage}
                />
            ) : null}
        </Nav>
    );
};

export default Pagination;
