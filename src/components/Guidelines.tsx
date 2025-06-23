import React from "react";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner */}
      <div
        className="h-[250px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/dist/images/banner-static.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-white text-3xl md:text-4xl font-bold">
          Guidelines for Restaurants
        </h1>
      </div>

      {/* Content Section */}
      <section className="px-4 md:px-10 py-10 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Restaurant Name</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Names must appear as on the restaurant's signboard.</li>
          <li>No taglines or establishment types in the name unless legally registered.</li>
          <li>Avoid abbreviations like A2B unless separately added as searchable aliases.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Restaurant Address</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Standardized format: [Shop No], [Landmark], [Road], [Neighborhood], [City]</li>
          <li>No abbreviations like St., Opp., No., etc.</li>
          <li>No other restaurant names as landmarks.</li>
          <li>Mention floor and building name if not on the ground floor.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Restaurant Features</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Pure Veg: only if no meat or eggs are served.</li>
          <li>Smoking Area: must have separate non-smoking section.</li>
          <li>Happy Hours: for alcoholic drinks only.</li>
          <li>WiFi: should be available for customers, not just staff.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Use 24-hour format (e.g., 09:00 to 18:00).</li>
          <li>Dine-in timings are mandatory; delivery can be added via request.</li>
          <li>No vague text like "Late Hours".</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Photos</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Only include relevant ambiance, façade, and food photos.</li>
          <li>Order: [Façade] → [Ambiance] → [Food]</li>
          <li>No people, collages, stock images, or watermark-heavy images.</li>
          <li>Only .JPEG and .PNG formats accepted.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Menus</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Max dimensions: 650x700 pixels.</li>
          <li>Keep menus clear, properly aligned, and readable.</li>
          <li>Include prices; avoid promotional-only menus.</li>
          <li>Menu page order: Appetizers → Main Course → Desserts.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Cover Photos</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>No stock images or superimposed logos.</li>
          <li>High resolution: 1200x500 pixels or higher.</li>
          <li>Horizontal images preferred for layout compatibility.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">New Listing Creation Guidelines</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>New listings created for major changes in cuisine, establishment type, or relocation.</li>
          <li>Name changes alone do not warrant new listings unless concept also changes.</li>
          <li>Menu price changes, facility additions/removals do not require a new listing.</li>
        </ul>

        <p className="mt-6">
          For any assistance, please contact us at{" "}
          <a href="mailto:restaurants@Feasto.com.my" className="text-primary font-medium underline">
            restaurants@Feasto.com.my
          </a>
        </p>
      </section>
    </div>
  );
};

export default Guidelines;
