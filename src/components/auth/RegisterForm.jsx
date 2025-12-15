import { useState } from "react";
import { useToast } from "../../context/ToastContext.jsx";
import api from "../../services/api/axios.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function RegisterForm() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      addToast("Registered successfully! You can now login.", "success");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      addToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
