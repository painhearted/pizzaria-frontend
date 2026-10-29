import { CategoryForm } from "@/components/dashboard/category-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category } from "@/lib/types";
import { Tags } from 'lucide-react';

export const instant = false;

export default async function Categories() {

    const token = await getToken();
    const categories = await apiClient<Category[]>("/category", {

        token: token ?? ""
    })



    return (

        <div className="space-y-4 sm:space-y-6">

            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-app-border/50 bg-app-card/30 p-5 sm:flex-row sm:items-center sm:gap-6">

                <div>
                    <h1 className="text-3xl font-bold text-app-foreground sm:text-4xl">Categorias</h1>
                    <p className="mt-2 text-sm text-app-muted sm:text-base">Organize os sabores do seu cardápio.</p>
                </div>

                <CategoryForm/>

            </div>

            {categories.length !== 0 && (

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {categories.map( category => (

                        <Card key={category.id} className="border-app-border/70 bg-app-card text-app-foreground shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-brand-primary/70 hover:shadow-xl">
                            <CardHeader>
                                <CardTitle className="gap-2 flex items-center text-base md:text-lg">
                                    <Tags className="w-5 h-5"/>
                                    <span>{category.name}</span>
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-app-muted text-sm">
                                    Código: {category.id.slice(0, 8)}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

        </div>
    );
}