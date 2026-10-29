"use client";

import { Package, ShoppingCart, Tags, LogOut, Menu, Pizza } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { logOutAction } from "@/actions/auth";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState } from "react";

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

export default function MobileSidebar() {
    const pathName = usePathname();
    const [open, setOpen] = useState(false);

    return (

        <div className="lg:hidden">
            <header className="sticky top-0 z-50 border-b border-app-border/70 bg-app-background/95 backdrop-blur">
                <div className="flex h-16 items-center px-4 justify-between">
                    <Sheet open={open} onOpenChange={setOpen} >
                            <SheetTrigger
                                render={(triggerProps) => (
                                <Button variant="ghost" size="icon" className="text-app-foreground hover:bg-app-card" {...triggerProps}>
                                <Menu className="h-6 w-6" />
                                </Button>
                                )}
                            />

                        <SheetContent side="left" className="w-72 border-app-border bg-app-background p-0 text-app-foreground">
                            <SheetHeader className="border-b border-app-border p-6">
                                <SheetTitle className="flex items-center gap-3 text-xl font-bold text-app-foreground">
                                    <Pizza className="size-6 text-brand-primary" aria-hidden="true" />
                                    Vorcaro Pizza
                                </SheetTitle>
                            </SheetHeader>

                                {/* MENU */}
                                <nav className="flex flex-col p-4 space-y-4">
                                    {menuItems.map(menu => {

                                        const Icon = menu.icon;
                                        const isActive = pathName === menu.href;

                                        return (
                                            <Link
                                            href={menu.href}
                                            key={menu.title}
                                            className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
                                                isActive ? "bg-brand-primary text-brand-primary-foreground" : "text-app-muted hover:bg-app-card hover:text-app-foreground"
                                            )}
                                            >

                                                <Icon className=" w-5 h-5"/>
                                                {menu.title}

                                            </Link>
                                        )
                                    })}
                                </nav>

                                    <div className=" absolute bottom-0 w-full border-t border-app-border p-4">
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

                        </SheetContent>
                    </Sheet>

                    <h1 className="flex items-center gap-2 text-xl font-bold text-app-foreground">
                        <Pizza className="size-5 text-brand-primary" aria-hidden="true" />
                        Vorcaro<span className="text-brand-primary"> Pizza</span>
                    </h1>
                        <div className="w-10"></div>

                </div>
            </header>
        </div>
    )
}