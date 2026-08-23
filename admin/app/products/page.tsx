export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "PRD-101",
    name: "Wireless Noise-Canceling Headphones",
    category: "Audio",
    price: 249.99,
    stock: 45,
    status: "In Stock",
  },
  {
    id: "PRD-102",
    name: "Minimalist Mechanical Keyboard",
    category: "Accessories",
    price: 119.5,
    stock: 12,
    status: "Low Stock",
  },
  {
    id: "PRD-103",
    name: "Smart Fitness & Health Watch",
    category: "Wearables",
    price: 179.0,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PRD-104",
    name: "Classic Leather Minimalist Wallet",
    category: "Lifestyle",
    price: 45.0,
    stock: 85,
    status: "In Stock",
  },
  {
    id: "PRD-105",
    name: "Anodized Aluminum Water Bottle",
    category: "Lifestyle",
    price: 28.0,
    stock: 110,
    status: "In Stock",
  },
];

export default function ProductsAdminPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, update inventory, and create catalog items.
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm shadow-indigo-100">
          + Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Product</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Price</th>
                <th className="px-6 py-3.5">Stock</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRODUCTS_DATA.map((prod) => (
                <tr
                  key={prod.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{prod.name}</p>
                    <p className="text-xs text-slate-400">{prod.id}</p>
                  </td>
                  <td className="px-6 py-4">{prod.category}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ${prod.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">{prod.stock} units</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        prod.status === "In Stock"
                          ? "bg-emerald-50 text-emerald-700"
                          : prod.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {prod.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                      Edit
                    </button>
                    <button className="text-xs font-semibold text-rose-600 hover:text-rose-800">
                      Delete
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
