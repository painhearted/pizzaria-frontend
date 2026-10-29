import { ShieldAlert } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AccessDenied() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-app-background px-4 py-8">
            <Card className="w-full max-w-md border-app-border bg-app-card text-app-foreground shadow-2xl shadow-black/25">
                <CardHeader className="items-center gap-4 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-brand-primary/15 text-brand-primary">
                        <ShieldAlert className="size-8" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                        Acesso negado
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm leading-6 text-app-muted">
                    <p>
                        Você não tem permissão para acessar o painel.
                    </p>
                    <p className="mt-2">
                        Caso acredite que isso seja um erro, consulte o administrador.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}