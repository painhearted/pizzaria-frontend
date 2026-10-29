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
import { loginAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { Pizza } from 'lucide-react';



export function LoginForm() {

    const [state, formAction, isPending] = useActionState<Awaited<ReturnType<typeof loginAction>> | null, FormData>(
        loginAction,
        null
    );
    const router = useRouter();

    useEffect(() => {

        if (state?.success && state.redirectTo) {

            router.replace(state.redirectTo);
        }
    }, [state, router])

    return(

        <Card className="mx-auto w-full max-w-md rounded-3xl border-app-border/80 bg-app-card/95 px-2 py-4 text-app-foreground shadow-2xl shadow-black/25 sm:px-4 sm:py-6">
            <CardHeader className="w-full items-center gap-4 pb-5 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/20">
                    <Pizza className="size-8" aria-hidden="true" />
                </div>
                <CardTitle className="text-center text-4xl font-bold">
                    Vorcaro <span className="text-brand-primary">Pizza</span></CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" action={formAction}>
                    {/* Formulário de Login */}

                    <div className="mx-auto w-full max-w-sm space-y-2">
                        <Label htmlFor="email" className="text-app-foreground">
                            Email
                        </Label>
                        <input type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email..."
                            required
                            className="h-11 rounded-xl border-app-border bg-app-background/70 px-4 text-app-foreground placeholder:text-app-muted/70"
                            />
                    </div>



                    <div className="mx-auto w-full max-w-sm space-y-2">
                        <Label htmlFor="password" className="text-app-foreground">
                            Senha
                        </Label>
                        <input type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            minLength={3}
                            className="h-11 rounded-xl border-app-border bg-app-background/70 px-4 text-app-foreground placeholder:text-app-muted/70"
                            />
                    </div>


                    <Button type="submit" className="h-11 w-full rounded-xl bg-brand-primary font-bold text-brand-primary-foreground hover:bg-brand-primary/85">
                        {isPending ? "Acessando conta..." : "Acessar"}
                    </Button>

                    {state?.error && (

                        <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                            {state.error}
                        </div>
                    )}

                    <p className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center text-sm text-app-muted">
                        <span>Ainda não possui uma conta?</span>
                        <Link href="/register" className="font-semibold text-brand-primary hover:underline">
                         Crie uma conta
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}