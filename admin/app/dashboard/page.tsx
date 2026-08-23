export default function AdminHomePage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: "💰",
    },
    { title: "Total Orders", value: "3,240", change: "+12.5%", icon: "🛒" },
    {
      title: "Total Products",
      value: "48",
      change: "4 out of stock",
      icon: "📦",
    },
    {
      title: "Registered Users",
      value: "1,234",
      change: "+18 new",
      icon: "👥",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Live store metrics and system status.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between text-gray-500 mb-2">
              <span className="text-xs font-semibold uppercase">
                {stat.title}
              </span>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
