import styled from 'styled-components';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { request } from './utils/utils';
import EmptyResult from './component/EmptyResult';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [images, setImages] = useState({});
    const inputRef = useRef(null);

    const fetchImages = async (text) => {
        const result = await request(
            `https://pixabay.com/api/?key=${
                process.env.REACT_APP_PIXABAY
            }&q=${encodeURIComponent(text)}`
        );
        setImages(result);
    };

    // 최초 한번 이미지 가져오기
    useEffect(() => {
        fetchImages('');
    }, []);

    const handleSearchImages = async (e) => {
        if (e.code === 'Enter') {
            await fetchImages(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleSearchImages);

        return () => window.removeEventListener('keydown', handleSearchImages);
    }, []);

    return (
        <>
            <Container>
                <Hero ref={inputRef} />
                {images && images.hits.length !== 0 ? (
                    <ResultContainer images={images} />
                ) : (
                    <EmptyResult />
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
