const products = [
  {
    name: 'P3 Mix',
    image: '/public/dist/images/hardware1.webp',
    features: [
      '10\" high-resolution display.',
      'Built-in high-speed printer 80mm.',
      '4GB RAM+32GB ROM.',
      'Ergonomically designed for a comfortable grip.',
      'Total Weight 670g.',
    ],
  },
  {
    name: 'V3 Mix',
    image: '/public/dist/images/hardware2.webp',
    features: [
      '10\" high-resolution display.',
      'Handheld or pair with optional multi-function cradle.',
      'Thermal printer Print speed: 70mm/s.',
      'Weight 710g (handheld).',
    ],
  },
  {
    name: 'D3 Pro',
    image: '/public/dist/images/hardware3.webp',
    features: [
      '15.6\" full screen main display.',
      'Optional 10\" customer display screen.',
      'Aluminum body.',
      'Cables hidden away in the body.',
      'D3 Pro weight 4.5kg, 2nd screen 0.88kg.',
    ],
  },
  {
    name: 'D3 Mini',
    image: '/public/dist/images/hardware4.webp',
    features: [
      '10.1\" high-resolution display.',
      '4\" IPS capacitive touchscreen secondary display.',
      'Built-in 80mm receipt printer.',
      'Total weight 1.1kg.',
    ],
  },
  {
    name: 'D2S Plus',
    image: '/public/dist/images/hardware5.webp',
    features: [
      '15.6\" high-resolution main display.',
      '10.1\" customer display screen.',
      'Built-in 80mm thermal printer.',
      'Total weight 4.2kg.',
    ],
  },
  {
    name: 'T2S',
    image: '/public/dist/images/hardware6.webp',
    features: [
      '15.6\" high-resolution main display.',
      '10.1\" customer display screen.',
      'Built-in thermal printer 80mm.',
      'Total weight 5.7kg.',
    ],
  },
  {
    name: 'P3',
    image: '/public/dist/images/hardware7.webp',
    features: [
      '6.75\" HD display.',
      'Built-in thermal printer 58mm.',
      '13 days standby time.',
      'Total weight 400g.',
    ],
  },
  {
    name: 'K2',
    image: '/public/dist/images/hardware8.webp',
    features: [
      '24\" FHD display.',
      'Great for self ordering and payment.',
      'Optional K2 Stand is available.',
      'Weight wall mounted: 16.5kg, with stand: 50kg.',
    ],
  },
];

const HardwarePage = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Cutting-Edge POS Hardware Built to <span className="text-orange-500">Elevate Your Business</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Equip your business with modern, high-performance POS devices designed for speed, reliability, and seamless integration.
            From sleek designs to robust functionality, our hardware ensures smooth operations and an exceptional customer experience.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md">
            Get a Free Demo Today
          </button>
        </div>
        <div>
          <img
            src="/public/dist/images/hardware-1.webp"
            alt="POS Hardware"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 text-center">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">{product.name}</h3>
              <ul className="text-left text-gray-700 space-y-2 mb-4">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-orange-500">✔️</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-gray-200 px-4 py-2 rounded">📄 Brochure</button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">🖼️ Images</button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded">▶️ Video</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HardwarePage;
