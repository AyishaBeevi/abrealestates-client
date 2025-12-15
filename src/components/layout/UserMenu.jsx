import { Link } from "react-router-dom";

export default function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const isAgent = user.role === "agent";

  const roleLabel = isAdmin
    ? "Admin"
    : isAgent
    ? "Agent"
    : "User";

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="flex items-center gap-1 text-gray-700">
        👤 Logged in as: <b>{roleLabel}</b>
      </span>

      {(isAdmin || isAgent) && (
        <Link
          to={isAdmin ? "/dashboard/admin" : "/dashboard/agent"}
          className="px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}
