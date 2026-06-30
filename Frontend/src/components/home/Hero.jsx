import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-white via-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side */}

          <div>

            <span className="inline-block bg-emerald-100 text-emerald-600 px-4 py-2 rounded-full text-sm font-semibold">
               Manage Your Work Smarter
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Organize Your
              <span className="text-emerald-500"> Tasks </span>

              <br />

              Focus On What
              <br />

              Really Matters.
            </h1>

            <p className="mt-8 text-slate-600 text-lg leading-8 max-w-xl">

              Taskora helps you manage projects,
              organize daily work,
              track progress and increase productivity
              using a clean modern dashboard.

            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg"
              >
                Get Started
              </Link>

              <button
                className="border border-slate-300 px-8 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-500 transition"
              >
                Learn More
              </button>

            </div>

            {/* Stats */}

            <div className="mt-12 flex gap-10 flex-wrap">

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  10K+
                </h2>

                <p className="text-slate-500">
                  Active Users
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  50K+
                </h2>

                <p className="text-slate-500">
                  Tasks Managed
                </p>

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-900">
                  99%
                </h2>

                <p className="text-slate-500">
                  Satisfaction
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex justify-center">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">

              {/* Header */}

              <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">

                <div>

                  <h2 className="font-semibold">
                    My Tasks
                  </h2>

                  <p className="text-xs text-slate-300">
                    Monday, Today
                  </p>

                </div>

                <button className="bg-emerald-500 px-3 py-2 rounded-lg text-sm">
                  + Add
                </button>

              </div>

              {/* Body */}
                            <div className="p-6 space-y-4">

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Landing Page Design
                    </h3>

                    <p className="text-sm text-slate-500">
                      UI / UX
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Backend API
                    </h3>

                    <p className="text-sm text-slate-500">
                      Express + MongoDB
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                    In Progress
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Dashboard
                    </h3>

                    <p className="text-sm text-slate-500">
                      React Components
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Deployment
                    </h3>

                    <p className="text-sm text-slate-500">
                      Vercel
                    </p>
                  </div>

                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Pending
                  </span>
                </div>

              </div>

              {/* Footer */}

              <div className="border-t border-slate-200 p-6">

                <div className="flex justify-between mb-2">

                  <span className="text-slate-600">
                    Progress
                  </span>

                  <span className="font-semibold text-emerald-500">
                    50%
                  </span>

                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                  <div className="bg-emerald-500 h-full w-1/2 rounded-full"></div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;