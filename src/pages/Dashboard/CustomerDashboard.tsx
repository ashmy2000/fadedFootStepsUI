import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Film, Headset as VrHeadset, User, Mail } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useAuthStore } from '../../stores/authStore';
import { mockBookings, cities } from '../../data/mockData';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  
  const userBookings = mockBookings.filter(booking => booking.userId === user?.id);
  const upcomingBookings = userBookings.filter(booking => 
    new Date(booking.date) > new Date() && booking.status !== 'COMPLETED'
  );
  const pastBookings = userBookings.filter(booking => 
    new Date(booking.date) <= new Date() || booking.status === 'COMPLETED'
  );

  const getVenueDetails = (venueId: string) => {
    for (const city of cities) {
      for (const town of city.towns) {
        const venue = town.venues.find(v => v.id === venueId);
        if (venue) return { venue, city, town };
      }
    }
    return null;
  };

  const renderBookingCard = (booking: any, isUpcoming: boolean = false) => {
    const venueDetails = getVenueDetails(booking.venueId);
    if (!venueDetails) return null;

    const { venue, city, town } = venueDetails;

    return (
      <Card key={booking.id} className="space-y-4">
        <div className="flex items-start space-x-4">
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{venue.name}</h3>
            <p className="text-fog-gray text-sm">{city.name}, {town.name}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                {booking.experience === 'MOVIE' ? (
                  <Film className="w-4 h-4 text-eerie-purple" />
                ) : (
                  <VrHeadset className="w-4 h-4 text-ecto-green" />
                )}
                <span className="text-sm text-fog-gray">
                  {booking.experience === 'MOVIE' ? 'Horror Cinema' : 'VR Experience'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-fog-gray" />
                <span className="text-sm text-fog-gray">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-fog-gray" />
                <span className="text-sm text-fog-gray">{booking.time}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              booking.status === 'CONFIRMED' 
                ? 'bg-ecto-green/20 text-ecto-green'
                : booking.status === 'PENDING'
                ? 'bg-yellow-500/20 text-yellow-500'
                : 'bg-fog-gray/20 text-fog-gray'
            }`}>
              {booking.status}
            </div>
            <p className="text-white font-bold text-lg mt-2">£{booking.totalGBP}</p>
          </div>
        </div>
        
        {isUpcoming && (
          <div className="flex items-center space-x-3 text-sm text-fog-gray">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{venue.address}</span>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Welcome back, <span className="text-ecto-green">{user?.name}</span>
          </h1>
          <p className="text-xl text-fog-gray">Manage your horror experiences and bookings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-6">Upcoming Experiences</h2>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map(booking => renderBookingCard(booking, true))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <Calendar className="w-16 h-16 text-fog-gray/50 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-fog-gray mb-2">No Upcoming Bookings</h3>
                  <p className="text-fog-gray mb-6">Ready for your next scare?</p>
                  <Button>
                    <a href="/locations">Book New Experience</a>
                  </Button>
                </Card>
              )}
            </section>

            {/* Past Bookings */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-6">Past Experiences</h2>
              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map(booking => renderBookingCard(booking))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <p className="text-fog-gray">No past bookings yet</p>
                </Card>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <h3 className="text-xl font-bold text-white mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-fog-gray" />
                  <div>
                    <p className="text-white font-medium">{user?.name}</p>
                    <p className="text-fog-gray text-sm">Customer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-fog-gray" />
                  <p className="text-fog-gray">{user?.email}</p>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card>
              <h3 className="text-xl font-bold text-white mb-4">Your Horror Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-fog-gray text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-ecto-green">{userBookings.length}</p>
                </div>
                <div>
                  <p className="text-fog-gray text-sm">Experiences Survived</p>
                  <p className="text-2xl font-bold text-white">{pastBookings.length}</p>
                </div>
                <div>
                  <p className="text-fog-gray text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-blood-red">
                    £{userBookings.reduce((sum, booking) => sum + booking.totalGBP, 0)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full">
                  <a href="/locations">Book New Experience</a>
                </Button>
                <Button variant="ghost" className="w-full">
                  View All Locations
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};