"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { createCategoryAction } from '@/actions/categories';





export function CategoryForm() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    async function handleCreateCategory(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const result = await createCategoryAction(formData);

        if (!result.success) {
            setError(result.error);
            return;
        }

        setError(null);
        setOpen(false);
        router.refresh();
    }

    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button className="bg-brand-primary hover:bg-brand-primary font-semibold" />
                }
            >
                <Plus className="h-5 w-5 mr-2"/>
                Nova categoria
            </DialogTrigger>


            <DialogContent className="border-app-border bg-app-card p-6 text-app-foreground sm:p-6">
                <DialogHeader>
                    <DialogTitle>
                        Criar nova categoria
                    </DialogTitle>

                    <DialogDescription>
                        Criando nova categoria
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={ handleCreateCategory }>
                    <div>
                        <Label htmlFor="name" className="mb-2">Nome da categoria</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Digite o nome da categoria"
                            className="border-app-border bg-app-background text-app-foreground placeholder:text-app-muted/70"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400" role="alert">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full bg-brand-primary font-bold text-brand-primary-foreground hover:bg-brand-primary/85">
                        Criar categoria
                    </Button>

                </form>
            </DialogContent>
        </Dialog>

    )
}