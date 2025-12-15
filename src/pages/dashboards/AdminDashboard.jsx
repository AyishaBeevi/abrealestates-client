import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api/axios";

import AuditLogs from "./components/AuditLogs";
import AdminPropertyModal from "./components/AdminPropertyModal";
import AdminContact from "./components/AdminContact";
import AdminEnquiries from "./AdminEnquiries";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function AdminDashboard() {
  const qc = useQueryClient();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  /* ================= USERS ================= */
  const {
    data: users = [],
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await api.get("/api/admin/users")).data,
  });

  /* ================= PROPERTIES ================= */
  const { data: propertiesData, isLoading: propertiesLoading } = useQuery({
    queryKey: ["admin-properties"],
    queryFn: async () => (await api.get("/api/admin/properties")).data,
  });

  const properties = propertiesData?.properties || [];

  /* ================= CONTACT MESSAGES ================= */
  const {
    data: messages = [],
    isLoading: messagesLoading,
  } = useQuery({
    queryKey: ["admin-contact"],
    queryFn: async () => (await api.get("/api/admin/contact")).data,
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  /* ================= MUTATIONS ================= */
  const updateUserRole = useMutation({
    mutationFn: ({ id, role }) => api.patch(`/api/admin/users/${id}/role`, { role }),
    onSuccess: () => qc.invalidateQueries(["admin-users"]),
  });

  const approveProperty = useMutation({
    mutationFn: ({ id, approved }) =>
      api.patch(`/api/admin/properties/${id}/approve`, { approved }),
    onSuccess: () => qc.invalidateQueries(["admin-properties"]),
  });

  const deleteProperty = useMutation({
    mutationFn: (id) => api.delete(`/api/admin/properties/${id}`),
    onSuccess: () => qc.invalidateQueries(["admin-properties"]),
  });

  const toggleFeatured = useMutation({
    mutationFn: (id) => api.patch(`/api/admin/properties/${id}/featured`),
    onSuccess: () => qc.invalidateQueries(["admin-properties"]),
  });

  const toggleTopPick = useMutation({
    mutationFn: (id) => api.patch(`/api/admin/properties/${id}/top-pick`),
    onSuccess: () => qc.invalidateQueries(["admin-properties"]),
  });

  const updateAvailability = useMutation({
    mutationFn: ({ id, status }) =>
      api.patch(`/api/properties/${id}/availability`, { status }),
    onSuccess: () => qc.invalidateQueries(["admin-properties"]),
  });

  /* ================= LOADING ================= */
  if (usersLoading || propertiesLoading || messagesLoading) {
    return <div className="p-8">Loading admin dashboard…</div>;
  }

  if (usersError) {
    return <div className="p-8 text-red-600">Failed to load admin data</div>;
  }

  /* ================= STATS ================= */
  const chartData = {
    labels: ["Users", "Agents", "Admins", "Properties"],
    datasets: [
      {
        data: [
          users.length,
          users.filter((u) => u.role === "agent").length,
          users.filter((u) => u.role === "admin").length,
          properties.length,
        ],
        backgroundColor: ["#1e40af", "#059669", "#92400e", "#7c3aed"],
      },
    ],
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* ===== STATS CHART ===== */}
      <div className="bg-white p-6 rounded-xl shadow">
        <Bar data={chartData} options={{ plugins: { legend: { display: false } } }} />
      </div>

      {/* ===== TABS ===== */}
      <div className="flex gap-4 border-b pb-2 text-lg font-semibold overflow-x-auto whitespace-nowrap">
        {["users", "properties", "enquiries", "messages", "logs"].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 flex-shrink-0 ${
              activeTab === tab
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab === "users" && "Users"}
            {tab === "properties" && "Properties"}
            {tab === "enquiries" && "Enquiries"}
            {tab === "messages" && `Messages (${unreadCount})`}
            {tab === "logs" && "Audit Logs"}
          </button>
        ))}
      </div>

      {/* ================= USERS TAB ================= */}
      {activeTab === "users" && (
        <section className="bg-white p-6 rounded-xl shadow">

          {/* Desktop table */}
          <table className="hidden md:table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{u.name}</td>
                  <td className="p-3 border">{u.email}</td>
                  <td className="p-3 border capitalize">{u.role}</td>
                  <td className="p-3 border">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        updateUserRole.mutate({
                          id: u._id,
                          role: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="user">user</option>
                      <option value="agent">agent</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {users.map((u) => (
              <div key={u._id} className="border p-4 bg-white rounded-xl shadow">
                <p><strong>Name:</strong> {u.name}</p>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Role:</strong> {u.role}</p>

                <select
                  value={u.role}
                  onChange={(e) =>
                    updateUserRole.mutate({ id: u._id, role: e.target.value })
                  }
                  className="w-full mt-3 border rounded px-2 py-1"
                >
                  <option value="user">user</option>
                  <option value="agent">agent</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= PROPERTIES TAB ================= */}
      {activeTab === "properties" && (
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-1">Property Moderation</h2>
<p className="text-sm text-gray-500 mb-4">
  Showing most recent properties
</p>


          {/* Desktop table */}
          <table className="hidden md:table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Agent</th>
                <th className="p-3 border">Featured</th>
                <th className="p-3 border">Top Pick</th>
                <th className="p-3 border">Approved</th>
                <th className="p-3 border">Availability</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td
                    className="p-3 border text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedProperty(p)}
                  >
                    {p.title}
                  </td>

                  <td className="p-3 border">{p.agent?.name || "-"}</td>
                  <td className="p-3 border text-center">{p.isFeatured ? "⭐" : "—"}</td>
                  <td className="p-3 border text-center">{p.isTopPick ? "🔥" : "—"}</td>
                  <td className="p-3 border text-center">{p.isApproved ? "✅" : "❌"}</td>

                  {/* availability dropdown */}
                  <td className="p-3 border text-center">
                    <select
                      value={p.status}
                      onChange={(e) =>
                        updateAvailability.mutate({ id: p._id, status: e.target.value })
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                      <option value="rented">Rented</option>
                    </select>
                  </td>

                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => toggleFeatured.mutate(p._id)}
                      className={`px-3 py-1 rounded text-white ${
                        p.isFeatured ? "bg-yellow-600" : "bg-gray-600"
                      }`}
                    >
                      {p.isFeatured ? "Unfeature" : "Feature"}
                    </button>

                    <button
                      onClick={() => toggleTopPick.mutate(p._id)}
                      className={`px-3 py-1 rounded text-white ${
                        p.isTopPick ? "bg-purple-700" : "bg-purple-500"
                      }`}
                    >
                      {p.isTopPick ? "Remove" : "Top Pick"}
                    </button>

                    {!p.isApproved ? (
                      <button
                        onClick={() =>
                          approveProperty.mutate({ id: p._id, approved: true })
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          approveProperty.mutate({ id: p._id, approved: false })
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Reject
                      </button>
                    )}

                    <button
                      onClick={() => deleteProperty.mutate(p._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {properties.map((p) => (
              <div key={p._id} className="border p-4 bg-white rounded-xl shadow">
                <h3
                  className="text-blue-600 font-semibold cursor-pointer"
                  onClick={() => setSelectedProperty(p)}
                >
                  {p.title}
                </h3>

                <p><strong>Agent:</strong> {p.agent?.name || "-"}</p>
                <p><strong>Featured:</strong> {p.isFeatured ? "⭐" : "—"}</p>
                <p><strong>Top Pick:</strong> {p.isTopPick ? "🔥" : "—"}</p>
                <p><strong>Approved:</strong> {p.isApproved ? "Yes" : "No"}</p>

                {/* availability mobile dropdown */}
                <select
                  value={p.status}
                  onChange={(e) =>
                    updateAvailability.mutate({ id: p._id, status: e.target.value })
                  }
                  className="w-full mt-3 border rounded px-2 py-1"
                >
                  <option value="available">Available</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    onClick={() => toggleFeatured.mutate(p._id)}
                    className="px-3 py-2 text-white bg-yellow-600 rounded"
                  >
                    {p.isFeatured ? "Unfeature" : "Feature"}
                  </button>

                  <button
                    onClick={() => toggleTopPick.mutate(p._id)}
                    className="px-3 py-2 text-white bg-purple-600 rounded"
                  >
                    {p.isTopPick ? "Remove" : "Top Pick"}
                  </button>

                  <button
                    onClick={() =>
                      approveProperty.mutate({ id: p._id, approved: !p.isApproved })
                    }
                    className="px-3 py-2 text-white bg-green-600 rounded col-span-2"
                  >
                    {p.isApproved ? "Reject" : "Approve"}
                  </button>

                  <button
                    onClick={() => deleteProperty.mutate(p._id)}
                    className="px-3 py-2 text-white bg-red-600 rounded col-span-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= MESSAGES TAB ================= */}
      {activeTab === "messages" && (
        <section>
          <AdminContact />
        </section>
      )}

      {/* ================= ENQUIRIES TAB ================= */}
{activeTab === "enquiries" && (
  <section className="bg-white p-6 rounded-xl shadow">
    <AdminEnquiries />
  </section>
)}


      {/* ================= AUDIT LOG TAB ================= */}
      {activeTab === "logs" && (
        <section>
          <AuditLogs />
        </section>
      )}

      {/* ================= PROPERTY MODAL ================= */}
      <AdminPropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onApprove={() => {
          approveProperty.mutate({ id: selectedProperty._id, approved: true });
          setSelectedProperty(null);
        }}
        onReject={() => {
          approveProperty.mutate({ id: selectedProperty._id, approved: false });
          setSelectedProperty(null);
        }}
        onDelete={() => {
          deleteProperty.mutate(selectedProperty._id);
          setSelectedProperty(null);
        }}
        onFeature={() => toggleFeatured.mutate(selectedProperty._id)}
        onTopPick={() => toggleTopPick.mutate(selectedProperty._id)}
      />
    </div>
  );
}
