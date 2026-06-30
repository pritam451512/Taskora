import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerUser } from "../services/auth.service";
import logo from "../assets/taskora.png";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

 const onSubmit = async (data) => {
  try {
    const res = await registerUser(data);

    console.log("SUCCESS:", res);

    toast.success(res.data.message);

    navigate("/login");
  } catch (error) {
    console.log("ERROR:", error.response);

    toast.error(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex-col justify-center p-14">

          <img
            src={logo}
            alt="Taskora"
            className="w-20 mb-8"
          />

          <h1 className="text-5xl font-bold leading-tight">
            Join Taskora 
          </h1>

          <p className="mt-6 text-lg leading-8 text-emerald-100">
            Organize your work, manage tasks efficiently,
            and boost your productivity with Taskora.
          </p>

        </div>

        {/* Right */}

        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="lg:hidden flex justify-center mb-6">

            <img
              src={logo}
              alt="Taskora"
              className="w-16"
            />

          </div>

          <h2 className="text-4xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Create your free account to continue.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Name */}

            <div>

              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name is required",
                })}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* Email */}

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
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="Create password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-8 text-slate-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;