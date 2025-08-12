'use client';

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-to-br from-[#f5f5f5] via-[#e8eaf6] to-[#c5cae9]"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAgIiBmaWxsPSJub25lIiBzdHJva2U9ImdyYXkiIHN0cm9rZS13aWR0aD0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Images */}
          <div className="mb-12 lg:mb-0 space-y-6">
            <div className="relative transform transition-transform duration-500 hover:scale-105">
              <img
                src="/images/about-image.jpg"
                alt="Hotel Exterior"
                className="rounded-lg shadow-xl w-full h-[300px] object-cover border-2 border-[#1a237e]/10"
              />
            </div>
            <div className="relative transform transition-transform duration-500 hover:scale-105">
              <img
                src="/images/about-image-2.jpg"
                alt="Hotel Interior"
                className="rounded-lg shadow-xl w-full h-[300px] object-cover border-2 border-[#1a237e]/10"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6">
              About Hotel Lagoon
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Welcome to Hotel Lagoon, where luxury meets tranquility. Nestled
              in a prime location, our hotel offers an unforgettable experience
              with world-class amenities and exceptional service.
            </p>

            {/* Vision & Promise */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700">
                  To create memorable experiences and become the preferred
                  choice for travelers seeking luxury and comfort.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Promise
                </h3>
                <p className="text-gray-700">
                  Exceptional service, luxurious accommodations, and
                  unforgettable moments for every guest.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-700">Luxury Rooms</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-700">Service</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  100%
                </div>
                <div className="text-gray-700">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
