
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

export interface Items {

    id: string,
    amount: number,
    product: {

        id: string,
        name: string,
        price: number,
        description: string,
        banner: string,

    }

}

export interface Order {

    id: string,
    table: number,
    name?: string,
    status: boolean, //false = produzindo, true = finalizado
    draft: boolean, //true = rascunho(em produção), false = enviar para produção
    createdAt: string,
    items?: Items[];
}

