import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Film, Headset as VrHeadset } from 'lucide-react';
import { Card } from '../UI/Card';
import { Venue } from '../../types';

interface VenueCardProps {
  venue: Venue;
  cityId: string;
  townId: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, cityId, townId }) => {
  return (
    <Link to={`/locations/${cityId}/${townId}/${venue.id}`} className="block">
      <Card hover className="group overflow-hidden">
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <div className="absolute top-4 right-4">
            <div className="bg-ecto-green/20 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-ecto-green font-semibold">£{venue.basePriceGBP}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-heading font-bold text-white group-hover:text-ecto-green transition-colors">
            {venue.name}
          </h3>
          
          <div className="flex items-center space-x-2 text-fog-gray text-sm">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{venue.address}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-fog-gray text-sm">
              <Users className="w-4 h-4" />
              <span>Up to {venue.capacity} people</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {venue.experiences.includes('MOVIE') && (
                <div className="p-2 bg-eerie-purple/20 rounded-full">
                  <Film className="w-4 h-4 text-eerie-purple" />
                </div>
              )}
              {venue.experiences.includes('VR') && (
                <div className="p-2 bg-ecto-green/20 rounded-full">
                  <VrHeadset className="w-4 h-4 text-ecto-green" />
                </div>
              )}
            </div>
          </div>
          
          <p className="text-fog-gray text-sm line-clamp-2">
            {venue.description}
          </p>
        </div>
      </Card>
    </Link>
  );
};