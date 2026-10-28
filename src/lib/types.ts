
export interface User {

    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'STAFF';
    createdAt: string;
}


export interface AuthResponse {

    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    token: string;
}

export interface Category {

    id: string;
    name: string;
    createdAt: string;
}

export interface Product {

    id: string;
    name: string;
    price: number;
    description: string;
    category_id: string;
    banner: string;
    disabled: boolean;
    createdAt: string;
    category?: Pick<Category, "id" | "name">;
}