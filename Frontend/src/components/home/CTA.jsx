import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-20 bg-emerald-500">
      <div className="max-w-7xl mx-auto px-5 text-center">

        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          Ready to Boost Your Productivity?
        </h2>

        <p className="mt-6 text-lg text-emerald-100 max-w-2xl mx-auto">
          Join thousands of users who manage their daily work with Taskora.
          Stay organized, stay productive and achieve more.
        </p>

        <Link
          to="/register"
          className="inline-block mt-10 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300"
        >
          Get Started Free
        </Link>

      </div>
    </section>
  );
}

export default CTA;