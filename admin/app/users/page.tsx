export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Customer";
  status: "Active" | "Inactive";
  registeredDate: string;
}

const USERS_DATA: UserItem[] = [
  {
    id: "USR-01",
    name: "Vishal Singh",
    email: "vishalsinghchouhan77@gmail.com",
    role: "Admin",
    status: "Active",
    registeredDate: "Aug 21, 2026",
  },
  {
    id: "USR-02",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Customer",
    status: "Active",
    registeredDate: "Aug 19, 2026",
  },
  {
    id: "USR-03",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "Customer",
    status: "Active",
    registeredDate: "Aug 15, 2026",
  },
  {
    id: "USR-04",
    name: "Rahul Joshi",
    email: "rahul@example.com",
    role: "Customer",
    status: "Inactive",
    registeredDate: "Jul 28, 2026",
  },
];

export default function UsersAdminPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Accounts</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage customer profiles, roles, and administrative access.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USERS_DATA.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        user.role === "Admin"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {user.registeredDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                      Edit
                    </button>
                    <button className="text-xs font-semibold text-rose-600 hover:text-rose-800">
                      Block
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
