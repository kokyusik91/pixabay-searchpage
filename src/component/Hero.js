import styled from 'styled-components';
import Search from './Search';
import { forwardRef } from 'react';

const Container = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--secondary);
`;

const HeroTitle = styled.h1`
    margin: 8px 0px;
`;

const HeroTitleLink = styled.a`
    text-decoration: none;
    color: var(--text);
    &:hover {
        color: var(--highlight);
    }
`;

const HeroSubtitle = styled.p`
    margin: 0px;
    color: var(--highlight);
    font: 24px;
`;

const Content = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: 120px 32px 16px 32px;
`;

const Hero = ({ setQuery, setSearchList, setFilters, filters }) => {
    return (
        <Container>
            <Content>
                <HeroTitle>
                    <HeroTitleLink href="./">배경화면 검색 엔진</HeroTitleLink>
                </HeroTitle>
                <HeroSubtitle>오늘 나의 배경화면은? 👀</HeroSubtitle>
                <Search
                    setQuery={setQuery}
                    setSearchList={setSearchList}
                    setFilters={setFilters}
                    filters={filters}
                />
            </Content>
        </Container>
    );
};

export default Hero;
