export interface Blog {
    content: string;
    title: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        name: string;
    };
}
export interface BlogInput {
    content: string;
    title: string;
    tags: string[];
}

export interface ApiError {
    status: number;
    data: {
        message: string;
    };
}
