import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../UI/Card';
import { City } from '../../types';

interface CityCardProps {
  city: City;
}

export const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const totalVenues = city.towns.reduce((acc, town) => acc + town.venues.length, 0);

  return (
    <Link to={`/locations/${city.id}`} className="block">
      <Card hover className="group overflow-hidden">
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <img
            src={city.heroImage}
            alt={city.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <h3 className="text-2xl font-heading font-bold text-white mb-1">
              {city.name}
            </h3>
            <div className="flex items-center space-x-2 text-fog-gray">
              <MapPin className="w-4 h-4" />
              <span>{totalVenues} haunted locations</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};