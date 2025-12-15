import { useQuery } from "@tanstack/react-query";
import api from "../../services/api/axios";
import EnquiryTable from "../../components/enquiry/EnquiryTable";

export default function AdminEnquiries() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-enquiries"],
    queryFn: async () => {
      const res = await api.get("/enquiries/admin");
      return res.data;
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-6">
        All Property Enquiries
      </h1>

      {isLoading ? (
        <p className="text-secondary">Loading enquiries…</p>
      ) : (
        <EnquiryTable enquiries={data} isAdmin />
      )}
    </div>
  );
}
