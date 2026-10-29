import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { apiClient } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { Order } from "@/lib/types";
import { finishOrderAction } from "@/actions/orders";
import { useRouter } from "next/navigation";

interface OrderModalProps {
    orderId: string | null;
    onClose: () => Promise<void>;
    token: string;
}

export function OrderModal({ onClose, orderId, token }: OrderModalProps) {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!orderId) {
            setOrder(null);
            setError(null);
            return;
        }

        let isCurrentRequest = true;

        async function fetchOrder() {
            try {
                setLoading(true);
                setError(null);

                const response = await apiClient<Order>(
                    `/order/detail?order_id=${orderId}`,
                    {
                        method: "GET",
                        token,
                    },
                );

                if (isCurrentRequest) {
                    setOrder(response);
                }
            } catch {
                if (isCurrentRequest) {
                    setOrder(null);
                    setError("Não foi possível carregar os detalhes do pedido.");
                }
            } finally {
                if (isCurrentRequest) {
                    setLoading(false);
                }
            }
        }

        void fetchOrder();

        return () => {
            isCurrentRequest = false;
        };
    }, [orderId, token]);

    const total = order?.items?.reduce(
        (sum, item) => sum + item.product.price * item.amount,
        0,
    ) ?? 0;

    const handleFinishOrder = async () => {

        if(!orderId) return;

        const result = await finishOrderAction(orderId as string);

        if (!result.success) {

            console.log(result.error);
        }

        if(result.success) {

            router.refresh();
            onClose();
            
        }
    }

    return (
        <Dialog
            open={Boolean(orderId)}
            onOpenChange={(open) => {
                if (!open) {
                    void onClose();
                }
            }}
        >
            <DialogContent
                className="border-app-border bg-app-card p-4 text-white sm:max-w-md sm:p-5"
            >
                <DialogHeader className="items-center gap-0">
                    <DialogTitle className="text-center text-lg font-bold">
                        Detalhe do pedido
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <p className="py-6 text-center text-gray-300">
                        Carregando detalhes...
                    </p>
                ) : error ? (
                    <p className="py-6 text-center text-red-400" role="alert">
                        {error}
                    </p>
                ) : order ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                                <p className="mb-1 text-[10px] text-gray-400">
                                    Nome da categoria
                                </p>
                                <p className="font-semibold">Mesa {order.table}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] text-gray-400">Cliente</p>
                                <p className="font-semibold">
                                    {order.name || "Não informado"}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] text-gray-400">Status</p>
                                <Badge className="bg-brand-primary px-2 text-[10px] text-brand-primary-foreground hover:bg-brand-primary">
                                    Em produção
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold">Itens do pedido</h3>
                            {order.items && order.items.length > 0 ? (
                                <div className="space-y-2">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-md border border-app-border bg-app-background p-2.5 text-xs"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="font-semibold">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-gray-400">
                                                        {item.product.description}
                                                    </p>
                                                    <p className="mt-1 text-[10px] text-gray-400">
                                                        {formatPrice(item.product.price)} x {item.amount}
                                                    </p>
                                                </div>
                                                <div className="shrink-0 text-right">
                                                    <p className="text-[10px] text-gray-400">
                                                        Quantidade: {item.amount}
                                                    </p>
                                                    <p className="mt-1 font-bold">
                                                        Subtotal: {formatPrice(
                                                            item.product.price * item.amount,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    Nenhum item encontrado.
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t border-app-border pt-3">
                            <span className="font-semibold">Total</span>
                            <span className="text-lg font-bold text-brand-primary">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>
                ) : null}

                <DialogFooter className="mt-0 gap-2 border-t-0 bg-transparent p-0 sm:flex-col">
                    <DialogClose
                        render={
                            <Button
                                variant="outline"
                                className="order-2 w-full border-app-border bg-transparent text-white hover:bg-app-background hover:text-white sm:order-2"
                            />
                        }
                    >
                        Fechar
                    </DialogClose>
                    <Button className="order-1 w-full bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary sm:order-1"
                    onClick={handleFinishOrder}
                    >
                        Finalizar pedido
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
