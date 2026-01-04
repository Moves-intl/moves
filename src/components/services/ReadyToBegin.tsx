import { useNavigate } from "react-router-dom";

export default function ReadyToBeginSection() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://plus.unsplash.com/premium_photo-1664372145591-f7cc308ff5da?q=80&w=396&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&h=600"
              alt="Smiling student with phone and notebook"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">
            Ready to Begin?
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Visit your nearest Moves International office or schedule an
            appointment through the enquiry form. Your educational adventure
            awaits!
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 shadow-md"
          >
            Contact Us
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
