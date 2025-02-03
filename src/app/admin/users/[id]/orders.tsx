import { useEffect, useState } from "react";

export default function UserOrders({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error al obtener pedidos:", error);
      }
    }
    fetchOrders();
  }, [userId]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Historial de Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.id} className="border p-2 rounded-lg shadow-sm">
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
