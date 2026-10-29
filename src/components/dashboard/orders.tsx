"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, RefreshCcw } from "lucide-react";
import { Order } from "@/lib/types";
import { apiClient } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatPrice } from "@/lib/format";
import { OrderModal } from "./order-modal";



interface OrdersProps {

    token: string;
}

export function Orders({ token }: OrdersProps) {


    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<null | string>(null);
    const [error, setError] = useState<string | null>(null);

    async function fetchOrders() {
        setLoading(true);
        setError(null);

        try {

            const response = await apiClient<Order[]>("/orders?draft=false", {
                method: "GET",
                cache: "no-store",
                token: token,
            });

            const pendingOrders = response.filter(order => !order.status)

            setOrders(pendingOrders);
        } catch {
            setError("Não foi possível carregar os pedidos.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchOrders();
    }, [token])


    const calculateOrderTotal = (order: Order) => {

        if(!order.items) return 0;

        return order.items.reduce((total, item) => {

            return total + item.product.price * item.amount;

        }, 0);
    }

    return (

            <div className="space-y-4 sm:space-y-6">
        
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-app-border/50 bg-app-card/30 p-5 sm:flex-row sm:items-center sm:gap-6">
        
                    <div>
                        <h1 className="text-3xl font-bold text-app-foreground sm:text-4xl">Pedidos</h1>
                        <p className="mt-2 text-sm text-app-muted sm:text-base">Acompanhe os pedidos que estão no forno.</p>
                    </div>
        
                    <Button aria-label="Atualizar pedidos" className="bg-brand-primary text-brand-primary-foreground shadow-lg shadow-brand-primary/15 hover:bg-brand-primary/85"
                    onClick={fetchOrders}
                    >
                        <RefreshCcw className="w-5 h-5"/>
                    </Button>
        
                </div>


                {loading ? (
                    <div>
                        <p className="text-center text-app-muted">Carregando pedidos...</p>
                    </div>

                ) : error ? (
                    <p className="text-center text-red-400" role="alert">{error}</p>

                ) : orders.length === 0 ? (

                    <div>
                        <p className="text-center text-app-muted">Nenhum pedido encontrado.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {orders.map( order => (
                            <Card key={order.id}
                            className="border-app-border/70 bg-app-card text-app-foreground shadow-lg shadow-black/10 transition-all hover:-translate-y-1 hover:border-brand-primary/70 hover:shadow-xl"
                            >

                               <CardHeader>
                                    <div className="flex items-center justify-between gap-2">
                                        <CardTitle className="text-lg lg:text-xl font-bold">
                                            Mesa {order.table}
                                        </CardTitle>

                                        <Badge variant="secondary" className="text-xs select-none">Produção</Badge>
                                    </div>
                               </CardHeader>

                               <CardContent className="space-y-3 sm:space-y-4 mt-auto">

                                <div>
                                    {order.items && order.items.length > 0 && (
                                        <div className="space-y-1">
                                            {order.items.slice(0, 2).map(item => (
                                                <p key={item.id} className="truncate text-xs text-app-muted sm:text-sm">
                                                   - {item.amount}x {item.product.name}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col xl:flex-row items-center justify-between pt-4 border-t border-app-border gap-4">

                                    <div className="self-start ">
                                        <p className="text-sm text-app-muted md:text-base">Total</p>
                                        <p className="text-base lg:text-lg font-bold text-brand-primary">
                                            {formatPrice(calculateOrderTotal(order))}
                                        </p>
                                    </div>

                                    <Button
                                    size="sm"
                                    className="bg-brand-primary font-bold text-brand-primary-foreground
                                    hover:bg-brand-primary/85
                                    w-full
                                    lg:w-auto"
                                    onClick={ () => setSelectedOrder(order.id)}>
                                        <EyeIcon className="w-5 h-5"/>
                                        Detalhes
                                    </Button>
                                </div>

                               </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                    <OrderModal
                     orderId={selectedOrder}
                     onClose={ async () => {
                        setSelectedOrder(null);
                        await fetchOrders();
                     }}
                     token={token}
                    />
                
                </div>
    );
}