import {
  FaTasks,
  FaSearch,
  FaChartLine,
  FaMobileAlt,
  FaLock,
  FaBolt,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaTasks size={28} />,
      title: "Task Management",
      description:
        "Create, organize and manage your daily tasks with an intuitive interface.",
    },
    {
      icon: <FaSearch size={28} />,
      title: "Smart Search",
      description:
        "Instantly search and filter tasks by title, priority or status.",
    },
    {
      icon: <FaChartLine size={28} />,
      title: "Track Progress",
      description:
        "Monitor completed and pending work with clear progress indicators.",
    },
    {
      icon: <FaMobileAlt size={28} />,
      title: "Responsive",
      description:
        "Works perfectly across desktop, tablet and mobile devices.",
    },
    {
      icon: <FaLock size={28} />,
      title: "Secure Login",
      description:
        "JWT authentication keeps your account and task data secure.",
    },
    {
      icon: <FaBolt size={28} />,
      title: "Fast Performance",
      description:
        "Optimized React application for a smooth user experience.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5">

        <div className="text-center mb-14">

          <p className="text-emerald-500 font-semibold uppercase tracking-widest">
            Features
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4">
            Everything You Need
          </h2>

          <p className="text-slate-600 mt-5 max-w-2xl mx-auto leading-8">
            Taskora provides all the tools you need to organize,
            prioritize and complete your work efficiently.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
            >

              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-500 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;