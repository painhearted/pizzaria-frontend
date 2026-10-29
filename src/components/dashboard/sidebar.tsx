"use client";

import { Package, ShoppingCart, Tags, LogOut, Pizza } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { logOutAction } from "@/actions/auth";


interface SidebarProps {

    userName: string;
}

const menuItems = [
    {

    title: "Pedidos",
    href: "/dashboard",
    icon: ShoppingCart,

    },
    {
        title: "Produtos",
        href: "/dashboard/products",
        icon: Package,
    },
    {
        title: "Categorias",
        href: "/dashboard/categories",
        icon: Tags,
    }
]

export default function Sidebar({ userName }: SidebarProps) {

    const pathname = usePathname();

    return ( 

        <aside className="hidden h-[100dvh] w-72 shrink-0 flex-col border-r border-app-border/70 bg-app-background/95 lg:flex">
            {/* HEADER */}

            <div className="border-b border-app-border/70 p-6">
                <h2 className="flex items-center gap-3 text-2xl font-bold text-app-foreground">
                    <span className="flex size-10 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground">
                        <Pizza className="size-5" aria-hidden="true" />
                    </span>
                    <span>Vorcaro<span className="text-brand-primary"> Pizza</span></span>
                </h2>
                <p className="mt-3 text-sm text-app-muted">Olá, {userName}!</p>
            </div>


            {/* MENU */}
            <nav className="flex-1 p-4 space-y-4">
                {menuItems.map(menu => {

                    const Icon = menu.icon;
                    const isActive = pathname === menu.href;

                    return (
                        <Link
                        href={menu.href}
                        key={menu.title}
                        className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
                            isActive ? "bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/15" : "text-app-muted hover:bg-app-card hover:text-app-foreground"
                        )}
                        >

                            <Icon className=" w-5 h-5"/>
                            {menu.title}

                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-app-border/70 p-4">
                <form action={logOutAction}>
                    <Button
                        type="submit" 
                        variant="ghost"
                        className="w-full justify-start gap-3 text-app-muted hover:bg-app-card hover:text-app-foreground"
                    >
                        <LogOut className="w-5 h-5"/>

                        Sair
                    </Button>
                </form>
            </div>
        </aside>
    )
}