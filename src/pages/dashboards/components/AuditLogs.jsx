import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api/axios";
import { Clock, CheckCircle, Trash2, UserCog } from "lucide-react";

const actionIcon = (action) => {
  switch (action) {
    case "PROPERTY_APPROVED":
      return <CheckCircle className="text-green-600" />;
    case "PROPERTY_DELETED":
      return <Trash2 className="text-red-600" />;
    case "ROLE_CHANGED":
      return <UserCog className="text-blue-600" />;
    default:
      return <Clock className="text-gray-500" />;
  }
};

export default function AuditLogs() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["audit-logs"],
    queryFn: async () => {
      const res = await api.get("/admin/audit-logs");
      return res.data || [];
    },
  });

  if (isLoading) return <div>Loading audit logs…</div>;
  if (isError) return <div className="text-red-600">Failed to load logs</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Audit Logs</h2>

      <div className="relative border-l border-gray-200 pl-6 space-y-8">
        {data.map(log => (
          <div key={log._id} className="relative">

            {/* Icon */}
            <div className="absolute -left-3 top-1 bg-white">
              {actionIcon(log.action)}
            </div>

            {/* Card */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-medium">
                {log.performedBy?.name}{" "}
                <span className="text-gray-400 text-xs">
                  ({log.performedBy?.role})
                </span>
              </p>

              <p className="text-sm mt-1">
                <span className="font-semibold">
                  {log.action.replaceAll("_", " ")}
                </span>{" "}
                — {log.target?.label}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
