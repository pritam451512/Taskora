import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);

        setMessage(res.data.message);
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
            "Verification failed."
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-5">
          Email Verification
        </h1>

        <p
          className={`text-lg ${
            success
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>

        {success && (
          <p className="mt-4 text-slate-500">
            Redirecting to login...
          </p>
        )}

      </div>

    </div>
  );
}

export default VerifyEmail;