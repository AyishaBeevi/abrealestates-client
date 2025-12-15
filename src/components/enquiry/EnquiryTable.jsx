import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api/axios";

export default function EnquiryTable({ enquiries, isAdmin = false }) {
  if (!enquiries.length) {
    return (
      <div className="text-center text-secondary py-20">
        No enquiries yet.
      </div>
    );
  }
  const qc = useQueryClient();

const updateStatus = useMutation({
  mutationFn: ({ id, status }) =>
    api.patch(`/enquiries/${id}/status`, { status }),
  onSuccess: () => {
    qc.invalidateQueries();
  },
});


  return (
    <div className="overflow-x-auto border border-secondary/20 rounded-xl bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-secondary">
            <th className="px-4 py-3">Property</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Preferred</th>
            {isAdmin && <th className="px-4 py-3">Agent</th>}
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {enquiries.map((e) => (
            <tr
              key={e._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-primary">
                <Link
                  to={`/properties/${e.property}`}
                  className="hover:underline"
                >
                  {e.propertyTitle}
                </Link>
              </td>

              <td className="px-4 py-3">{e.name}</td>

              <td className="px-4 py-3">{e.contact}</td>

              <td className="px-4 py-3 capitalize text-secondary">
                {e.preferredContact}
              </td>

              {isAdmin && (
                <td className="px-4 py-3 text-secondary">
                  {e.agent?.name || "—"}
                </td>
              )}

              <td className="px-4 py-3">
  <select
    value={e.status}
    onChange={(ev) =>
      updateStatus.mutate({
        id: e._id,
        status: ev.target.value,
      })
    }
    className="border rounded-md px-2 py-1 text-sm"
  >
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="closed">Closed</option>
  </select>
</td>


              <td className="px-4 py-3 text-secondary">
                {new Date(e.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
