import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import api from "../../services/api/axios.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function ProfileForm() {
  const { user, setUser } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setFormData({ name: user.name, email: user.email, phone: user.phone || "" });
  }, [user]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/users/me", formData);
      setUser(res.data);
      addToast("Profile updated successfully!", "success");
    } catch (err) {
      addToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
