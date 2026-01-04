export default function KeepReading() {
  return (
    <div className="bg-accent rounded-lg p-12 max-w-5xl mx-auto">
      <div className="flex items-center flex-wrap">
        {/* Left side - takes available space */}
        <div className="flex-1">
          <h2 className="text-white text-[28px] font-bold mb-[10px]">
            Contact us now to kickstart your journey!
          </h2>
          <p className="text-white text-lg ">
            Still seeking more information on course selection for international
            students in Australia?
          </p>
        </div>

        {/* Right side with large left margin */}
        <div className="ml-[180px] flex-shrink-0 mt-10 sm:mt-0">
          <a
            href="/contact"
            className="bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-md"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
