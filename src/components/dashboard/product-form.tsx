"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Plus, Upload } from "lucide-react";

import { createProductAction } from "@/actions/products";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/types";
import Image from "next/image";

interface ProductFormProps {
    categories: Category[];
}

export function ProductForm({ categories }: ProductFormProps) {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [priceValue, setPriceValue] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    async function handleCreateProduct(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        const form = event.currentTarget;

        const result = await createProductAction(new FormData(form));

        if (!result.success) {
            setError(result.error);
            return;
        }

        setError(null);
        setOpen(false);
        form.reset();
        setPriceValue("");
        setImagePreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
        router.refresh();
    }


    function formatToBrl(value: string){

        const numbers = value.replace(/\D/g, "");

        if(!numbers) return "";

        const amount = parseInt(numbers) / 100;

        return amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
    
    function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatToBrl(e.target.value);
        setPriceValue(formatted);
    }


    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];

        if(file) {

            if(file.size > 5 * 1024 * 1024) {
                setError("O tamanho da imagem não pode ultrapassar 5MB.");
                return;
            }

            const reader = new FileReader(); 
            reader.onloadend = () => {

                setImagePreview(reader.result as string);
            }

            reader.readAsDataURL(file);
        }
    }

    function clearImage() {
        setImagePreview(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button className="bg-brand-primary font-semibold hover:bg-brand-primary" />
                }
            >
                <Plus className="mr-2 h-5 w-5" />
                Novo produto
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto bg-app-card p-6 text-white sm:p-6">
                <DialogHeader>
                    <DialogTitle>Criar novo produto</DialogTitle>
                    <DialogDescription>
                        Cadastre os dados e a imagem do produto.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleCreateProduct}>
                    <div>
                        <Label htmlFor="name" className="mb-2">Nome do produto</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="Ex.: Margherita"
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <div>
                        <Label htmlFor="price" className="mb-2">Preço</Label>
                        <Input
                            id="price"
                            name="price"
                            type="text"
                            inputMode="decimal"
                            required
                            placeholder="Ex.: 45,00"
                            className="border-app-border bg-app-background text-white"
                            value={priceValue}
                            onChange={ handlePriceChange }
                        />
                    </div>

                    <div>
                        <Label htmlFor="description" className="mb-2">Descrição</Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            placeholder="Ex.: Molho, queijo e manjericão"
                            className="border-app-border bg-app-background text-white"
                        />
                    </div>

                    <div>
                        <Label htmlFor="category_id" className="mb-2">Categoria</Label>
                        <Select
                            name="category_id"
                            required
                            defaultValue=""
                        >
                            <SelectTrigger
                            id="category_id"
                            className="h-8 w-full cursor-pointer border-app-border bg-app-background px-2.5 text-white focus-visible:ring-3 focus-visible:ring-ring/50"
                            >
                                <SelectValue placeholder="Selecione uma categoria" />
                            </SelectTrigger>
                            <SelectContent className="border-app-border bg-app-background text-white">
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="file" className="mb-2">Imagem do produto</Label>

                        <Input
                            ref={imageInputRef}
                            id="file"
                            name="file"
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            onChange={handleImageChange}
                            required
                            className="hidden"
                        />

                        {imagePreview ? (
                            <div className="space-y-2">
                                <div className="relative h-48 w-full overflow-hidden rounded-lg border">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview da imagem"
                                        fill
                                        className="object-cover z-10"
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={clearImage}
                                        className="absolute top-2 right-2 z-20"
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                                <Upload className="h-8 w-8 mx-auto text-white mb-2"/>
                                <Label
                                    htmlFor="file"
                                    className="cursor-pointer rounded-lg bg-brand-primary px-4 py-2 font-semibold text-black hover:bg-brand-primary"
                                >
                                    Clique para selecionar uma imagem
                                </Label>
                            </div>
                        )}
                        </div>

                    {error && (
                        <p className="text-sm text-red-400" role="alert">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="w-full bg-brand-primary text-white hover:bg-brand-primary">
                        Criar produto
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
