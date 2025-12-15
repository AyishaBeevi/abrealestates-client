import React, { useState } from "react";
import AddPropertyForm from "./AddProperty";
import AgentPropertyList from "./components/AgentPropertyList";
import EditPropertyModal from "./components/EditPropertyModal";
import AgentEnquiries from "./AgentEnquiries";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function AgentDashboard() {
  const [editingProperty, setEditingProperty] = useState(null);

  if (!user) {
    return <div className="p-8">Checking permissions…</div>;
  }

  if (user.role !== "agent") {
    return <Navigate to="/login" />;
  }
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold text-[#0e2442]">Agent Dashboard</h1>

      {/* Add new property */}
      <AddPropertyForm />

      {/* Property list */}
      <AgentPropertyList
        onEdit={(p) => setEditingProperty(p)}
      />

      {/* ================= ENQUIRIES ================= */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#0e2442] mb-4">
          Property Enquiries
        </h2>
        <AgentEnquiries />
      </section>

      {/* Edit modal */}
      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
        />
      )}
    </div>
  );
}
