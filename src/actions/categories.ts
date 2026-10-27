"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(formData: FormData) {

    try {

        const token = await getToken();
        const name = formData.get("name");

        if (!token || typeof name !== "string" || !name.trim()) {

            return { success: false, error: "Erro ao criar categoria" };
        }

        await apiClient<Category>("/category", {
            
            method: "POST",
            body: JSON.stringify({ name: name.trim() }),
            token: token,
        });

        revalidatePath("/dashboard/categories");

        return { success: true, error: "" };
    } catch (error) {

        if (error instanceof Error) {

            return { success: false, error: error.message };

        }

        return { success: false, error: "Erro ao criar categoria" };
    }
}
