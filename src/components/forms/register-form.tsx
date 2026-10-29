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
import { Pizza } from 'lucide-react';


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

        <Card className="w-full max-w-md mx-auto border-app-border/80 bg-app-card/95 text-app-foreground shadow-2xl shadow-black/25">
            <CardHeader className="items-center gap-3 pb-3">
                <div className="flex size-14 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/20">
                    <Pizza className="size-8" aria-hidden="true" />
                </div>
                <CardTitle className="text-center text-4xl font-bold">
                    Vorcaro <span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" action={formAction}>
                    {/* Formulário de registro */}

                    <div className="flex flex-col gap-6">
                        <Label htmlFor="name" className="text-app-foreground">
                            Nome
                        </Label>
                        <input type="text"
                            id="name"
                            name="name"
                            placeholder="Digite seu nome"
                            required
                            minLength={3}
                            className="border-app-border bg-app-background/70 text-app-foreground placeholder:text-app-muted/70"
                            />
                    </div>



                    <div className="space-y-4">
                        <Label htmlFor="email" className="text-app-foreground">
                            Email
                        </Label>
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email..."
                            required
                            className="border-app-border bg-app-background/70 text-app-foreground placeholder:text-app-muted/70"
                            />
                    </div>



                    <div className="space-y-4">
                        <Label htmlFor="password" className="text-app-foreground">
                            Senha
                        </Label>
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            minLength={3}
                            className="border-app-border bg-app-background/70 text-app-foreground placeholder:text-app-muted/70"
                            />
                    </div>


                    {state?.error && (
                        <p className="text-sm text-red-400" role="alert">
                            {state.error}
                        </p>
                    )}

                    <Button type="submit" className="w-full bg-brand-primary font-bold text-brand-primary-foreground hover:bg-brand-primary/85">
                        {isPending ? "Criando conta..." : "Criar conta"}
                    </Button>

                    <p className="text-center text-sm text-app-muted">
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