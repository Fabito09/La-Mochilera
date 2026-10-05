"use client";

import { useEffect, useState } from "react";
import { accountPage } from "@/content/paginas/cuenta";
import { fetchCustomerOrders, type CustomerOrder } from "@/lib/customer-api";
import { formatPriceInColones } from "@/lib/format-price";
import { orderStatusLabel } from "@/lib/order-status";

const dateFormatter = new Intl.DateTimeFormat("es-CR", { dateStyle: "long" });

function itemDescription(item: CustomerOrder["items"][number]): string {
  const name = typeof item.product === "object" ? item.product.name : "Producto";
  const details = [item.color, item.size && `talla ${item.size}`].filter(Boolean).join(", ");
  return `${item.quantity} × ${name}${details ? ` (${details})` : ""}`;
}

export function OrderHistory() {
  const [orders, setOrders] = useState<CustomerOrder[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchCustomerOrders().then(setOrders, () => setHasError(true));
  }, []);

  if (hasError) return <p className="text-sm text-muted-foreground">No pudimos cargar sus pedidos.</p>;
  if (!orders) return <p className="text-sm text-muted-foreground">Cargando sus pedidos…</p>;
  if (orders.length === 0) return <p className="text-sm text-muted-foreground">{accountPage.noOrders}</p>;

  return (
    <ul className="divide-y border-y">
      {orders.map((order) => (
        <li key={order.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto]">
          <div>
            <p className="font-medium">
              Pedido #{order.id} · {dateFormatter.format(new Date(order.createdAt))}
            </p>
            <ul className="mt-1 text-sm text-muted-foreground">
              {order.items.map((item, index) => (
                <li key={item.id ?? index}>{itemDescription(item)}</li>
              ))}
            </ul>
          </div>
          <div className="sm:text-right">
            <p className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {orderStatusLabel(order.status)}
            </p>
            {order.total != null && <p className="mt-2 font-medium">{formatPriceInColones(order.total)}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
