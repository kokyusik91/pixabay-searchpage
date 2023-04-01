import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useRef, useState, useId } from 'react';
import { request } from './utils/utils';
import EmptyResult from './component/EmptyResult';
import getWallPapers from './utils/getWallPaper';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState({
        orientation: 'all',
        order: 'popular',
        per_page: '20',
    });

    const [pages, setPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const { order, orientation, per_page } = filters;

    useEffect(() => {
        const fetch = async () => {
            const result = await getWallPapers({
                q: query,
                orientation,
                order,
                per_page,
                page: currentPage,
            });
            setData(result);
            setPages(Math.floor(result.totalHits / filters.per_page));
        };
        fetch();
    }, [query, filters, currentPage]);

    return (
        <>
            <Container>
                <Hero setQuery={setQuery} setFilters={setFilters} />
                <ResultContainer
                    data={data}
                    pages={pages}
                    setPages={setPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
