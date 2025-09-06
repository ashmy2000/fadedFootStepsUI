import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { cities } from '../data/mockData';

export const CityDetail: React.FC = () => {
  const { city: cityId } = useParams<{ city: string }>();
  const city = cities.find(c => c.id === cityId);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">City Not Found</h1>
          <Link to="/locations" className="text-ecto-green hover:underline">
            ← Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to="/locations" 
            className="flex items-center space-x-2 text-fog-gray hover:text-ecto-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Locations</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-12"
        >
          <img
            src={city.heroImage}
            alt={city.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
              {city.name}
            </h1>
            <div className="flex items-center space-x-2 text-fog-gray">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{city.towns.length} areas to explore</span>
            </div>
          </div>
        </motion.div>

        {/* Towns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {city.towns.map((town, index) => (
            <motion.div
              key={town.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/locations/${city.id}/${town.id}`} className="block">
                <Card hover className="group overflow-hidden">
                  <div className="relative h-48 -mx-6 -mt-6 mb-4">
                    <img
                      src={town.image}
                      alt={town.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-2xl font-heading font-bold text-white mb-1">
                        {town.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-fog-gray">
                        <MapPin className="w-4 h-4" />
                        <span>{town.venues.length} haunted {town.venues.length === 1 ? 'location' : 'locations'}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};