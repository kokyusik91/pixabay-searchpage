import styled from 'styled-components';
import ImageCard from './ImageCard';
import Pagination from './Pagination';
import EmptyResult from './EmptyResult';
import ImageModal from './ImageModal';
import { useState } from 'react';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = ({
    data,
    setCurrentPage,
    currentPage,
    numberOfPages,
}) => {
    const [currentDetailImage, setCurrentDetailImage] = useState(null);

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {currentDetailImage && (
                <ImageModal
                    currentDetailImage={currentDetailImage}
                    setCurrentDetailImage={setCurrentDetailImage}
                />
            )}
            <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                numberOfPages={numberOfPages}
            />
            <ResultsWrapper>
                {data.hits?.length > 0 ? (
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentDetailImage(imgData)}
                        />
                    ))
                ) : (
                    <EmptyResult />
                )}
                {/* 검색 결과가 없을 시 페이지네이션과 ImgCard 목록 대신 EmptyResult가 렌더되어야 합니다. */}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
