import { ProductForm } from "@/components/dashboard/product-form";
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
        apiClient<Product[]>("/products?disabled=false", { token: token ?? "" }),
        apiClient<Category[]>("/category", { token: token ?? "" }),
    ]);

    return (

        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-app-border/50 bg-app-card/30 p-5 sm:flex-row sm:items-center sm:gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-app-foreground sm:text-4xl">Produtos</h1>
                    <p className="mt-2 text-sm text-app-muted sm:text-base">Gerencie os sabores do seu cardápio.</p>
                </div>

                <ProductForm categories={categories} />
            </div>

            {products.length !== 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="flex h-full flex-col overflow-hidden border-app-border/70 bg-app-card text-app-foreground shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-brand-primary/70 hover:shadow-xl hover:shadow-black/20">
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
                                        <Package className="h-4 w-4" />
                                        <span>{product.name}</span>
                                    </div>

                                    <DeleteButtonProduct productId={product.id}/>
                                </CardTitle>
                                <p className="text-sm text-app-muted">
                                    {product.category?.name ?? "Sem categoria"}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm leading-6 text-app-muted">{product.description}</p>
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