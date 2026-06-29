import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaFire,
} from "react-icons/fa";

function StatCard({ title, value }) {
  const config = {
    "Total Tasks": {
      icon: <FaTasks />,
      color: "bg-blue-100 text-blue-600",
    },
    Completed: {
      icon: <FaCheckCircle />,
      color: "bg-green-100 text-green-600",
    },
    Pending: {
      icon: <FaClock />,
      color: "bg-yellow-100 text-yellow-600",
    },
    "High Priority": {
      icon: <FaFire />,
      color: "bg-red-100 text-red-600",
    },
  };

  const current =
    config[title] || {
      icon: <FaTasks />,
      color: "bg-slate-100 text-slate-600",
    };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${current.color}`}
        >
          {current.icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;