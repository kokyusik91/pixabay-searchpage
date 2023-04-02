import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/image/ImageContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import EmptyResult from './component/EmptyResult';
import getWallPapers from './utils/getWallPaper';
import { IGetAllPaper, Orient } from './types';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState<IGetAllPaper>({
        total: 0,
        totalHits: 0,
        hits: [],
    });
    console.log(data);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<Orient>({
        orientation: 'all',
        order: 'popular',
        per_page: '20',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const target = useRef(null);

    // 따로 state를 파지말고, 변수로 선언해서 사용하면 된다.
    const numberOfPages = data.totalHits
        ? Math.ceil(data.totalHits / Number(filters.per_page))
        : 0;

    const { order, orientation, per_page } = filters;

    useEffect(() => {
        const fetch = async () => {
            const result = await getWallPapers({
                q: query,
                orientation,
                order,
                per_page: per_page.toString(),
                page: currentPage.toString(),
            });

            if (currentPage === 1) {
                setData(result);
            } else {
                setData((prev) => ({
                    ...prev,
                    hits: [...prev.hits, ...result.hits],
                }));
            }
            // 기존 값을 누적시켜 줘야함.
        };
        fetch();
    }, [query, filters, currentPage]);

    const callback: IntersectionObserverCallback = ([entries]) => {
        if (entries.isIntersecting) {
            setCurrentPage((prev) => prev + 1);
        }
        // setPage로 페이지를 하나씩 늘리자. == useEffect에서 페칭을 해줌
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [query, filters]);

    useEffect(() => {
        if (!target.current) return;
        const observer = new IntersectionObserver(callback, {
            threshold: 1.0,
        });

        observer.observe(target.current);
    }, []);

    return (
        <>
            <Container>
                {/* <Title /> */}
                <Hero setQuery={setQuery} setFilters={setFilters} />
                <ResultContainer
                    data={data}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                />
                {currentPage !== numberOfPages && (
                    <div ref={target}>
                        <EmptyResult isLoading={data.totalHits} />
                    </div>
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
