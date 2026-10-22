"use client";


import { useActionState, useEffect } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '@/components/ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import Link from 'next/link';
import { registerAction, type RegisterState } from '@/actions/auth';
import { useRouter } from 'next/navigation';


export function RegisterForm() {

    const [state, formAction, isPending] = useActionState<RegisterState | null, FormData>(
        registerAction,
        null
    );
    const router = useRouter();

    useEffect(() => {

        if (state?.success && state.redirectTo) {

            router.replace(state.redirectTo);
        }
    }, [state, router])

    return(

        <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
                    Vorcaro <span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" action={formAction}>
                    {/* Formulário de registro */}

                    <div className="flex flex-col gap-6">
                        <Label htmlFor="name" className="text-white">
                            Nome
                        </Label>
                        <input type="text"
                            id="name"
                            name="name"
                            placeholder="Digite seu nome"
                            required
                            minLength={3}
                            className="text-white bg-app-card border border-app-border"
                            />
                    </div>



                    <div className="space-y-4">
                        <Label htmlFor="email" className="text-white">
                            Email
                        </Label>
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email..."
                            required
                            className="text-white bg-app-card border border-app-border"
                            />
                    </div>



                    <div className="space-y-4">
                        <Label htmlFor="password" className="text-white">
                            Senha
                        </Label>
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            minLength={3}
                            className="text-white bg-app-card border border-app-border"
                            />
                    </div>


                    {state?.error && (
                        <p className="text-sm text-red-400" role="alert">
                            {state.error}
                        </p>
                    )}

                    <Button type="submit" className="w-full text-white bg-brand-primary hover:bg-brand-primary">
                        {isPending ? "Criando conta..." : "Criar conta"}
                    </Button>

                    <p className="text-center text-sm text-gray-100">
                        Já tem uma conta?
                        <Link href="/login" className="text-brand-primary font-semibold">
                         Faça o login
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}