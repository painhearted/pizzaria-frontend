"use client";

import { deleteProductAction } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    
    productId: string;
}

export function DeleteButtonProduct({productId}: DeleteButtonProps) {

    
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleDeleteProduct () {

        const result = await deleteProductAction(productId);

        if(result.success) {

            setError(null);
            router.refresh();
            return;
        }

        setError(result.error || "Não foi possível excluir o produto.");

    }

    return (
        <div className="flex items-center gap-2">
            <Button type="button" onClick={handleDeleteProduct} aria-label="Excluir produto">
                <Trash className="w-5 h-5"/>
            </Button>
            {error && <span className="sr-only" role="alert">{error}</span>}
        </div>
    );
}
