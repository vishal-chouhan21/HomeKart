export interface OrderItem {
  id: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  total: number;
  status: "Completed" | "Pending" | "Cancelled";
  date: string;
}

const ORDERS_DATA: OrderItem[] = [
  {
    id: "ORD-8921",
    customerName: "Aarav Sharma",
    customerEmail: "aarav@example.com",
    itemsCount: 2,
    total: 369.49,
    status: "Completed",
    date: "Aug 23, 2026",
  },
  {
    id: "ORD-8922",
    customerName: "Priya Patel",
    customerEmail: "priya@example.com",
    itemsCount: 1,
    total: 119.5,
    status: "Pending",
    date: "Aug 23, 2026",
  },
  {
    id: "ORD-8923",
    customerName: "Rohan Verma",
    customerEmail: "rohan@example.com",
    itemsCount: 3,
    total: 95.0,
    status: "Completed",
    date: "Aug 22, 2026",
  },
  {
    id: "ORD-8924",
    customerName: "Sneha Gupta",
    customerEmail: "sneha@example.com",
    itemsCount: 1,
    total: 249.99,
    status: "Cancelled",
    date: "Aug 21, 2026",
  },
];

export default function OrdersAdminPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500 mt-1">
          Track store orders, payment status, and fulfillments.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Order ID</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Total</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ORDERS_DATA.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {order.customerEmail}
                    </p>
                  </td>
                  <td className="px-6 py-4">{order.itemsCount} items</td>
                  <td className="px-6 py-4 text-slate-500">{order.date}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        order.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                      View Order &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
