import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api/axios";


export default function AdminContact() {
  const qc = useQueryClient();

  // Filters + Search states
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);

  // Fetch filtered messages
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin-contact", { search, sort, filterUnread }],
    queryFn: async () => {
      const res = await api.get(
        `/admin/contact?search=${search}&sort=${sort}&unread=${filterUnread}`
      );
      return res.data;
    },
  });

  // Mark as read
  const markRead = useMutation({
    mutationFn: (id) => api.patch(`/admin/contact/${id}/read`),
    onSuccess: () => qc.invalidateQueries(["admin-contact"]),
  });

  // Delete message
  const deleteMsg = useMutation({
    mutationFn: (id) => api.delete(`/admin/contact/${id}`),
    onSuccess: () => qc.invalidateQueries(["admin-contact"]),
  });

  if (isLoading) return <div className="p-8">Loading contact messages…</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      {/* Filters Section */}
      <div className="flex items-center gap-4 mb-4">

        <input
          type="text"
          placeholder="Search name, phone, message..."
          className="border px-3 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort: Unread First</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        <button
          onClick={() => setFilterUnread(!filterUnread)}
          className={`px-3 py-2 rounded ${
            filterUnread ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Unread Only
        </button>

      </div>

      {/* Messages Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Contact</th>
            <th className="p-3 border">Method</th>
            <th className="p-3 border">Message</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id} className="hover:bg-gray-50">
              <td className="p-3 border">{msg.name}</td>
              <td className="p-3 border">{msg.contact}</td>
              <td className="p-3 border capitalize">{msg.method}</td>
              <td className="p-3 border">{msg.message}</td>

              <td className="p-3 border">
                {new Date(msg.createdAt).toLocaleString()}
              </td>

              <td className="p-3 border">
                {msg.isRead ? "✔ Read" : "❌ Unread"}
              </td>

              <td className="p-3 border space-x-2">
                {!msg.isRead && (
                  <button
                    onClick={() => markRead.mutate(msg._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => deleteMsg.mutate(msg._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
