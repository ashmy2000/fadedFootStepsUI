import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, MapPin, Calendar, Download, Plus, Edit, Trash } from 'lucide-react';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { useAuthStore } from '../../stores/authStore';
import { mockBookings, cities } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');

  const totalBookings = mockBookings.length;
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalGBP, 0);
  const totalVenues = cities.reduce((sum, city) => sum + city.towns.reduce((townSum, town) => townSum + town.venues.length, 0), 0);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'venues', label: 'Venues', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-fog-gray text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-ecto-green">{totalBookings}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-fog-gray text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-ecto-green">£{totalRevenue}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-fog-gray text-sm">Active Venues</p>
            <p className="text-3xl font-bold text-ecto-green">{totalVenues}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-fog-gray text-sm">Cities</p>
            <p className="text-3xl font-bold text-ecto-green">{cities.length}</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
        <div className="space-y-3">
          {mockBookings.slice(0, 5).map((booking) => {
            const venueDetails = cities
              .flatMap(c => c.towns)
              .flatMap(t => t.venues)
              .find(v => v.id === booking.venueId);
            
            return (
              <div key={booking.id} className="flex items-center justify-between py-2 border-b border-fog-gray/10 last:border-b-0">
                <div>
                  <p className="text-white font-medium">{venueDetails?.name}</p>
                  <p className="text-fog-gray text-sm">{new Date(booking.date).toLocaleDateString()} - {booking.guests} guests</p>
                </div>
                <div className="text-right">
                  <p className="text-ecto-green font-semibold">£{booking.totalGBP}</p>
                  <p className="text-fog-gray text-sm">{booking.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );

  const renderVenues = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Venue Management</h3>
        <Button icon={Plus}>Add New Venue</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.flatMap(city => 
          city.towns.flatMap(town => 
            town.venues.map(venue => (
              <Card key={venue.id}>
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-bold text-white mb-2">{venue.name}</h4>
                <p className="text-fog-gray text-sm mb-3 line-clamp-2">{venue.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-ecto-green font-semibold">£{venue.basePriceGBP}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" icon={Edit}>Edit</Button>
                    <Button size="sm" variant="danger" icon={Trash}>Delete</Button>
                  </div>
                </div>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Booking Management</h3>
        <Button variant="secondary" icon={Download}>Export CSV</Button>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-fog-gray/20">
                <th className="text-left py-3 text-fog-gray">ID</th>
                <th className="text-left py-3 text-fog-gray">Venue</th>
                <th className="text-left py-3 text-fog-gray">Date</th>
                <th className="text-left py-3 text-fog-gray">Guests</th>
                <th className="text-left py-3 text-fog-gray">Total</th>
                <th className="text-left py-3 text-fog-gray">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((booking) => {
                const venueDetails = cities
                  .flatMap(c => c.towns)
                  .flatMap(t => t.venues)
                  .find(v => v.id === booking.venueId);
                
                return (
                  <tr key={booking.id} className="border-b border-fog-gray/10">
                    <td className="py-3 text-fog-gray text-sm">{booking.id.slice(-8)}</td>
                    <td className="py-3 text-white">{venueDetails?.name}</td>
                    <td className="py-3 text-fog-gray">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="py-3 text-fog-gray">{booking.guests}</td>
                    <td className="py-3 text-ecto-green font-semibold">£{booking.totalGBP}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'CONFIRMED' 
                          ? 'bg-ecto-green/20 text-ecto-green'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">User Management</h3>
      <Card>
        <p className="text-fog-gray">User management features coming soon...</p>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'venues':
        return renderVenues();
      case 'bookings':
        return renderBookings();
      case 'users':
        return renderUsers();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-fog-gray">Welcome back, {user?.name}</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-fog-gray/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-ecto-green text-ecto-green'
                    : 'border-transparent text-fog-gray hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};