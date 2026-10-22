"use server";

import { User } from '@/lib/types';
import { apiClient } from '@/lib/api';

export type RegisterState = {
    success: boolean;
    error: string;
    redirectTo?: string;
};

export async function registerAction(
    _prevState: RegisterState | null,
    formData: FormData
): Promise<RegisterState> {

    try {
        const email = formData.get("email");
        const name = formData.get("name");
        const password = formData.get("password");

        if (
            typeof email !== "string" ||
            typeof name !== "string" ||
            typeof password !== "string"
        ) {
            return {
                success: false,
                error: "Preencha todos os campos.",
            };
        }

        const data = {
            name,
            email,
            password,
        };

        await apiClient<User>("/users", {
            method: "POST",
            body: JSON.stringify(data),
        });


        return { success: true, error: "", redirectTo: "/login" };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Erro ao criar conta.",
        };
    }
}