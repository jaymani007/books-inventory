import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { axiosInstance } from "../services/axiosInstance";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        formik.resetForm();
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully", {
            position: "top-right",
          });
          navigate("/", { replace: true });
        } else {
          toast.error("Login failed. Please try again.", {
            position: "top-right",
          });
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Login failed. Please try again.",
          {
            position: "top-right",
          }
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center pr-50"
      style={{
        backgroundImage: `url('/images/bg2.jpg')`,
      }}
    >
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border border-gray-300 bg-white">
        <h1 className="text-3xl font-bold text-foreground mb-3 text-center text-gray-900">
          📚 BookStore
        </h1>
        <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
          Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              id="username"
              type="email"
              {...formik.getFieldProps("username")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition ${
                formik.touched.username && formik.errors.username
                  ? "border-destructive"
                  : "border-input"
              }`}
              placeholder="you@example.com"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 text-red-500 text-sm">
                {formik.errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition ${
                formik.touched.password && formik.errors.password
                  ? "border-destructive"
                  : "border-input"
              }`}
              placeholder=""
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-600/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
