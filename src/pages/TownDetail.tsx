import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { VenueCard } from '../components/Cards/VenueCard';
import { cities } from '../data/mockData';

export const TownDetail: React.FC = () => {
  const { city: cityId, town: townId } = useParams<{ city: string; town: string }>();
  
  const city = cities.find(c => c.id === cityId);
  const town = city?.towns.find(t => t.id === townId);

  if (!city || !town) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Location Not Found</h1>
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
          className="mb-8 space-y-2"
        >
          <Link 
            to="/locations" 
            className="flex items-center space-x-2 text-fog-gray hover:text-ecto-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Locations</span>
          </Link>
          <nav className="text-fog-gray">
            <Link to="/locations" className="hover:text-ecto-green">Locations</Link>
            <span className="mx-2">→</span>
            <Link to={`/locations/${city.id}`} className="hover:text-ecto-green">{city.name}</Link>
            <span className="mx-2">→</span>
            <span className="text-white">{town.name}</span>
          </nav>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            {town.name}
          </h1>
          <div className="flex items-center space-x-2 text-fog-gray text-lg">
            <MapPin className="w-5 h-5" />
            <span>{town.venues.length} haunted {town.venues.length === 1 ? 'location' : 'locations'} available</span>
          </div>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {town.venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <VenueCard venue={venue} cityId={city.id} townId={town.id} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};