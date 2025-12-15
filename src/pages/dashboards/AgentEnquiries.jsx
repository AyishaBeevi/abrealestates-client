import { useQuery } from "@tanstack/react-query";
import api from "../../services/api/axios";
import EnquiryTable from "../../components/enquiry/EnquiryTable";
import { useAuth } from "../../context/AuthContext";

export default function AgentEnquiries() {
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ["agent-enquiries"],
    queryFn: async () => {
      const res = await api.get("/api/enquiries/agent");
      return res.data;
    },
    enabled: user?.role === "agent", 
  });

  if (!user) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-primary mb-6">
        Property Enquiries
      </h1>

      {isLoading ? (
        <p className="text-secondary">Loading enquiries…</p>
      ) : (
        <EnquiryTable enquiries={data} />
      )}
    </div>
  );
}
