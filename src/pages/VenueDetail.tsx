import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Film, Headset as VrHeadset, Calendar, Clock, AlertTriangle, Star } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { cities, timeSlots } from '../data/mockData';
import { useBookingStore } from '../stores/bookingStore';
import { useAuthStore } from '../stores/authStore';

export const VenueDetail: React.FC = () => {
  const { city: cityId, town: townId, venue: venueId } = useParams<{ 
    city: string; 
    town: string; 
    venue: string; 
  }>();
  
  const navigate = useNavigate();
  const { setBookingData } = useBookingStore();
  const { isAuthenticated } = useAuthStore();
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<'MOVIE' | 'VR' | ''>('');
  const [guests, setGuests] = useState(2);

  const city = cities.find(c => c.id === cityId);
  const town = city?.towns.find(t => t.id === townId);
  const venue = town?.venues.find(v => v.id === venueId);

  if (!city || !town || !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Venue Not Found</h1>
          <Link to="/locations" className="text-ecto-green hover:underline">
            ← Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedExperience) {
      alert('Please select all booking details');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: window.location.pathname } });
      return;
    }

    setBookingData({
      venueId: venue.id,
      experience: selectedExperience,
      date: selectedDate,
      time: selectedTime,
      guests,
    });

    navigate('/book');
  };

  // Generate next 30 days for date selection
  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1); // Start from tomorrow
    return date.toISOString().split('T')[0];
  });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <nav className="text-fog-gray mb-4">
            <Link to="/locations" className="hover:text-ecto-green">Locations</Link>
            <span className="mx-2">→</span>
            <Link to={`/locations/${city.id}`} className="hover:text-ecto-green">{city.name}</Link>
            <span className="mx-2">→</span>
            <Link to={`/locations/${city.id}/${town.id}`} className="hover:text-ecto-green">{town.name}</Link>
            <span className="mx-2">→</span>
            <span className="text-white">{venue.name}</span>
          </nav>
          <Link 
            to={`/locations/${city.id}/${town.id}`}
            className="flex items-center space-x-2 text-fog-gray hover:text-ecto-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {town.name}</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Venue Info */}
          <div className="space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-80 rounded-xl overflow-hidden"
            >
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-ecto-green/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-ecto-green font-bold text-lg">£{venue.basePriceGBP}</span>
                </div>
              </div>
            </motion.div>

            {/* Venue Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                  {venue.name}
                </h1>
                <div className="flex items-center space-x-2 text-fog-gray mb-4">
                  <MapPin className="w-5 h-5" />
                  <span>{venue.address}</span>
                </div>
                <div className="flex items-center space-x-6 text-fog-gray">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Up to {venue.capacity} people</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {venue.experiences.includes('MOVIE') && (
                      <div className="flex items-center space-x-1 bg-eerie-purple/20 px-3 py-1 rounded-full">
                        <Film className="w-4 h-4 text-eerie-purple" />
                        <span className="text-eerie-purple text-sm">Movie</span>
                      </div>
                    )}
                    {venue.experiences.includes('VR') && (
                      <div className="flex items-center space-x-1 bg-ecto-green/20 px-3 py-1 rounded-full">
                        <VrHeadset className="w-4 h-4 text-ecto-green" />
                        <span className="text-ecto-green text-sm">VR</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Card>
                <h3 className="text-xl font-bold text-white mb-3">About This Location</h3>
                <p className="text-fog-gray leading-relaxed">
                  {venue.description}
                </p>
              </Card>

              <Card className="border-blood-red/20 bg-blood-red/5">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-blood-red flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Safety Information</h3>
                    <p className="text-fog-gray">
                      {venue.safetyNotes}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Booking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <Card className="space-y-6">
              <h2 className="text-2xl font-heading font-bold text-white">Book Your Experience</h2>
              
              {/* Experience Selection */}
              <div>
                <label className="block text-sm font-medium text-fog-gray mb-3">
                  Choose Experience *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {venue.experiences.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setSelectedExperience(exp)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedExperience === exp
                          ? 'border-ecto-green bg-ecto-green/10 text-ecto-green'
                          : 'border-fog-gray/20 text-fog-gray hover:border-fog-gray/40'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {exp === 'MOVIE' ? (
                          <Film className="w-5 h-5" />
                        ) : (
                          <VrHeadset className="w-5 h-5" />
                        )}
                        <span className="font-semibold">
                          {exp === 'MOVIE' ? 'Horror Cinema' : 'VR Horror'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-fog-gray mb-3">
                  Select Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white focus:outline-none focus:border-ecto-green"
                  >
                    <option value="">Choose a date</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-GB', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-fog-gray mb-3">
                  Select Time *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-ecto-green text-charcoal'
                          : 'bg-gunmetal text-fog-gray hover:bg-gunmetal/80'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-fog-gray mb-3">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 bg-gunmetal text-white rounded-lg hover:bg-gunmetal/80 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-white font-semibold text-lg px-4">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(venue.capacity, guests + 1))}
                    className="w-10 h-10 bg-gunmetal text-white rounded-lg hover:bg-gunmetal/80 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-fog-gray text-sm mt-2">Maximum {venue.capacity} guests</p>
              </div>

              {/* Price Summary */}
              <div className="bg-gunmetal/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-fog-gray">Base price ({guests} guests)</span>
                  <span className="text-white font-semibold">£{venue.basePriceGBP * guests}</span>
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={handleBooking}
                className="w-full"
                disabled={!selectedDate || !selectedTime || !selectedExperience}
              >
                {!isAuthenticated ? 'Login to Book' : 'Continue Booking'}
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};