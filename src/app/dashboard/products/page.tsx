import { ProductForm } from "@/components/dashboard/product-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Product } from "@/lib/types";
import { Package } from "lucide-react";
import { DeleteButtonProduct } from "@/components/dashboard/delete-button";

export const instant = false;

export default async function Products() {

    const token = await getToken();
    const [products, categories] = await Promise.all([
        apiClient<Product[]>("/products?disabled=false", { token: token! }),
        apiClient<Category[]>("/category", { token: token! }),
    ]);

    return (

        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">Produtos</h1>
                    <p className="mt-1 text-sm sm:text-base">Gerencie os produtos do seu cardápio.</p>
                </div>

                <ProductForm categories={categories} />
            </div>

            {products.length !== 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex h-full flex-col overflow-hidden border-app-border bg-app-card text-white transition-shadow hover:shadow-md">
                            <div className="h-56 shrink-0 bg-app-background sm:h-64">
                                <img
                                    src={product.banner}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base md:text-lg justify-between">
                                    <div className="flex flex-row gap-2 items-center">
                                        <Package className="h-5 w-5" />
                                        <span>{product.name}</span>
                                    </div>

                                    <DeleteButtonProduct productId={product.id}/>
                                </CardTitle>
                                <p className="text-sm text-gray-400">
                                    {product.category?.name ?? "Sem categoria"}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-gray-200">{product.description}</p>
                                <p className="mt-3 font-semibold text-brand-primary">
                                    {(product.price / 100).toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}