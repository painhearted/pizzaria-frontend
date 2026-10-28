"use server"

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Product } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function createProductAction(formData: FormData) {

    try {

        const token = await getToken();
        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");
        const categoryId = formData.get("category_id");
        const file = formData.get("file");

        if (
            !token ||
            typeof name !== "string" ||
            !name.trim() ||
            typeof price !== "string" ||
            !price.trim() ||
            typeof description !== "string" ||
            !description.trim() ||
            typeof categoryId !== "string" ||
            !categoryId.trim() ||
            !(file instanceof File) ||
            file.size === 0
        ) {
            return { success: false, error: "Preencha todos os campos do produto" };
        }

        const normalizedPrice = price
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", ".");
        const priceInReais = Number(normalizedPrice);
        if (!Number.isFinite(priceInReais) || priceInReais < 0) {
            return { success: false, error: "Informe um preço válido" };
        }

        const priceInCents = Math.round(priceInReais * 100);
        if (!Number.isSafeInteger(priceInCents)) {
            return { success: false, error: "Informe um preço válido" };
        }

        if (file.size > 4 * 1024 * 1024) {
            return { success: false, error: "A imagem deve ter no máximo 4 MB" };
        }

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            return { success: false, error: "A imagem deve estar no formato JPG, JPEG ou PNG" };
        }

        const productData = new FormData();
        productData.append("name", name.trim());
        productData.append("price", String(priceInCents));
        productData.append("description", description.trim());
        productData.append("category_id", categoryId.trim());
        productData.append("file", file);

        await apiClient<Product>("/product", {
            method: "POST",
            body: productData,
            token,
        });

        revalidatePath("/dashboard/products");

        return { success: true, error: "" };
    } catch (error) {

        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Erro ao criar produto" };
    }
}

export async function deleteProductAction(productId: string) {

    try {

        if(!productId) {

            return { success: false, error: "ID do produto não fornecido" };
        }

        const token = await getToken();

        if(!token) {

            return { success: false, error: "Token não fornecido" };
        }

        await apiClient(`/product?product_id=${productId}`, {
            method: "DELETE",
            token,
        });

        revalidatePath("/dashboard/products");
        return { success: true, error: "" };

    } catch (erro) {

        if(erro instanceof Error) {

            return { success: false, error: erro.message };
        }

        return { success: false, error: "Erro ao deletar produto" };
    }
}