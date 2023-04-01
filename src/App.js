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
    const [latestKeywordList, setLatestKeywordList] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const result = await getWallPapers({
                q: query,
            });
            setData(result);
        };
        fetch();
    }, [query]);

    // const fetchImages = async (text) => {
    //     const result = await request(
    //         `https://pixabay.com/api/?key=${
    //             process.env.REACT_APP_PIXABAY
    //         }&q=${encodeURIComponent(text)}`
    //     );
    //     setImages(result);
    // };

    // 최초 한번 이미지 가져오기
    // useEffect(() => {
    //     fetchImages('');
    // }, []);

    // const handleSearchImages = async (e) => {
    //     if (e.code === 'Enter') {
    //         await fetchImages(inputRef.current.value);
    //         setLatestKeywordList((prev) => {
    //             return [...prev, inputRef.current.value];
    //         });
    //     }
    //     // inputRef.current.value = '';
    // };

    // useEffect(() => {
    //     window.addEventListener('keydown', handleSearchImages);

    //     return () => {
    //         window.removeEventListener('keydown', handleSearchImages);
    //     };
    // }, []);

    return (
        <>
            <Container>
                <Hero
                    latestKeywordList={latestKeywordList}
                    setQuery={setQuery}
                />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
