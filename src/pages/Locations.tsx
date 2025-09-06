import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { CityCard } from '../components/Cards/CityCard';
import { cities } from '../data/mockData';

export const Locations: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Choose Your <span className="text-blood-red">Nightmare</span>
          </h1>
          <p className="text-xl text-fog-gray max-w-2xl mx-auto">
            Explore our carefully curated haunted locations across the UK. 
            Each venue offers its own unique blend of history, atmosphere, and genuine scares.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>

        {cities.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-fog-gray/50 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-fog-gray mb-2">No Locations Yet</h3>
            <p className="text-fog-gray">
              We're working on adding more spine-chilling locations. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};