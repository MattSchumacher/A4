export class ApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export class Article {
    title: string;
    url: string;
    publishedAt: Date;
    description: string;
    urlToImage: string;
    source?: Source;
    author?: any;
    content?: any;
}

export interface Source {
    id?: any;
    name: string;
}
