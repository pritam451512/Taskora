import { Link } from "react-router-dom";
import logo from "../assets/taskora.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";


function Login() {
const navigate = useNavigate();
const { getCurrentUser } = useAuth();

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm();



const onSubmit = async (data) => {
  try {
    const res = await loginUser(data);
    await getCurrentUser();

    toast.success(res.data.message);

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center bg-emerald-500 text-white p-12">

          <img
            src={logo}
            alt="Taskora"
            className="w-16 mb-6"
          />

          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back 👋
          </h1>

          <p className="mt-6 text-lg text-emerald-100 leading-8">
            Log in to continue managing your daily tasks,
            projects and productivity with Taskora.
          </p>

        </div>

        {/* Right */}

        <div className="p-8 sm:p-12 flex flex-col justify-center">

          <div className="lg:hidden flex justify-center mb-8">

            <img
              src={logo}
              alt="Taskora"
              className="w-14"
            />

          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Login
          </h2>

          <p className="text-slate-500 mt-2">
            Welcome back! Please login to your account.
          </p>

          <form
  onSubmit={handleSubmit(onSubmit)}
  className="mt-8 space-y-5"
>

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
  type="email"
  placeholder="Enter your email"
  {...register("email", {
    required: "Email is required",
  })}
  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
/>

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

             <input
  type="password"
  placeholder="Enter your password"
  {...register("password", {
    required: "Password is required",
  })}
  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-emerald-500"
/>

            </div>

           <button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
>
  {isSubmitting ? "Logging in..." : "Login"}
</button>

          </form>

          <p className="text-center mt-8 text-slate-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-emerald-500 font-semibold"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;