
import React from 'react';
import { Award, Users, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: Users, label: "Happy Customers", value: "10K+" },
    { icon: Clock, label: "Years Experience", value: "20+" },
    { icon: Heart, label: "Dishes Served", value: "50K+" }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About Feasto
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Since 2003, Feasto has been serving authentic Malaysian cuisine in the heart of Kuala Lumpur. 
              Our passion for traditional flavors combined with modern presentation has made us a favorite 
              among locals and tourists alike.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every dish is prepared with fresh, locally-sourced ingredients and traditional cooking methods 
              passed down through generations. We believe in preserving the authentic taste of Malaysia 
              while creating memorable dining experiences.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="text-orange-600" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Restaurant interior"
                className="rounded-2xl h-48 w-full object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Chef cooking"
                className="rounded-2xl h-48 w-full object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Food preparation"
                className="rounded-2xl h-48 w-full object-cover -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Restaurant ambiance"
                className="rounded-2xl h-48 w-full object-cover"
              />
            </div>

            {/* Floating review card */}
            <div className="absolute -bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-semibold">5.0</span>
              </div>
              <p className="text-sm text-gray-600">
                "Best Malaysian restaurant in KL! Authentic flavors and great service."
              </p>
              <p className="text-xs text-gray-500 mt-1">- Sarah M.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
