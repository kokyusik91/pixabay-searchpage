export interface IGetAllPaper {
    total: number;
    totalHits: number;
    hits: IGetAllPaper[];
}

export interface IWallPapers {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

export type IParamObj = {
    q: string;
    orientation: 'all' | 'horizontal' | 'vertical';
    order: 'popular' | 'latest';
    per_page: string;
    page: string;
};

export type Orient = Pick<IParamObj, 'orientation' | 'order' | 'per_page'>;

export type Orientation = IParamObj['orientation'];
