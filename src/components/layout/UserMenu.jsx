import { Link } from "react-router-dom";

export default function UserMenu() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const roleLabel =
    user.role === "admin"
      ? "Admin"
      : user.role === "agent"
      ? "Agent"
      : "User";

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="flex items-center gap-1 text-gray-700">
        👤 Logged in as: <b>{roleLabel}</b>
      </span>

      {(user.role === "admin" || user.role === "agent") && (
        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}
