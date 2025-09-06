import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Calendar, Users, Film, Headset as VrHeadset } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import { useBookingStore } from '../../stores/bookingStore';
import { useAuthStore } from '../../stores/authStore';
import { cities, addons } from '../../data/mockData';

export const BookingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { currentBooking, setBookingData, clearBooking } = useBookingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!currentBooking || !currentBooking.venueId) {
    navigate('/locations');
    return null;
  }

  // Find venue details
  const venue = cities
    .flatMap(c => c.towns)
    .flatMap(t => t.venues)
    .find(v => v.id === currentBooking.venueId);

  if (!venue) {
    navigate('/locations');
    return null;
  }

  const steps = [
    { number: 1, title: 'Review Booking', icon: Check },
    { number: 2, title: 'Add-ons', icon: Users },
    { number: 3, title: 'Details', icon: Calendar },
    { number: 4, title: 'Payment', icon: ArrowRight },
  ];

  const calculateTotal = () => {
    const basePrice = (venue.basePriceGBP * (currentBooking.guests || 1));
    const addonPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return basePrice + addonPrice;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete booking
      const bookingId = `booking_${Date.now()}`;
      setBookingData({
        id: bookingId,
        userId: user?.id,
        addons: selectedAddons,
        totalGBP: calculateTotal(),
        status: 'CONFIRMED',
      });
      
      clearBooking();
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">Review Your Booking</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{venue.name}</h3>
                  <p className="text-fog-gray text-sm">{venue.address}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {currentBooking.experience === 'MOVIE' ? (
                        <Film className="w-4 h-4 text-eerie-purple" />
                      ) : (
                        <VrHeadset className="w-4 h-4 text-ecto-green" />
                      )}
                      <span className="text-sm text-fog-gray">
                        {currentBooking.experience === 'MOVIE' ? 'Horror Cinema' : 'VR Experience'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-fog-gray" />
                      <span className="text-sm text-fog-gray">
                        {new Date(currentBooking.date || '').toLocaleDateString()} at {currentBooking.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-fog-gray" />
                      <span className="text-sm text-fog-gray">{currentBooking.guests} guests</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gunmetal/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-fog-gray">Base price ({currentBooking.guests} guests)</span>
                  <span className="text-white font-semibold">£{venue.basePriceGBP * (currentBooking.guests || 1)}</span>
                </div>
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">Enhance Your Experience</h2>
            <p className="text-fog-gray">Add optional extras to make your experience even more memorable</p>
            
            <div className="space-y-4">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedAddons.includes(addon.id)
                      ? 'border-ecto-green bg-ecto-green/10'
                      : 'border-fog-gray/20 hover:border-fog-gray/40'
                  }`}
                  onClick={() => toggleAddon(addon.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{addon.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-ecto-green">£{addon.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedAddons.length > 0 && (
              <div className="bg-gunmetal/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Selected Add-ons:</h4>
                {selectedAddons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex justify-between items-center">
                      <span className="text-fog-gray">{addon?.name}</span>
                      <span className="text-white">£{addon?.price}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        );

      case 3:
        return (
          <Card className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">Contact Details</h2>
            <p className="text-fog-gray">We'll use these details to confirm your booking</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fog-gray mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white focus:outline-none focus:border-ecto-green"
                  placeholder={user?.name || 'Enter your full name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fog-gray mb-2">Email Address *</label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white focus:outline-none focus:border-ecto-green"
                  placeholder={user?.email || 'Enter your email'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fog-gray mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white focus:outline-none focus:border-ecto-green"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1"
                />
                <label className="text-fog-gray text-sm">
                  I agree to the <a href="#" className="text-ecto-green hover:underline">Terms & Conditions</a> and 
                  understand the safety requirements for this experience.
                </label>
              </div>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-white">Review & Payment</h2>
            
            <div className="space-y-4">
              <div className="bg-gunmetal/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-fog-gray">Experience ({currentBooking.guests} guests)</span>
                  <span className="text-white">£{venue.basePriceGBP * (currentBooking.guests || 1)}</span>
                </div>
                
                {selectedAddons.map(addonId => {
                  const addon = addons.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex justify-between">
                      <span className="text-fog-gray">{addon?.name}</span>
                      <span className="text-white">£{addon?.price}</span>
                    </div>
                  );
                })}
                
                <div className="border-t border-fog-gray/20 pt-3">
                  <div className="flex justify-between">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <span className="text-ecto-green font-bold text-xl">£{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blood-red/10 border border-blood-red/20 rounded-lg p-4">
                <p className="text-blood-red text-sm">
                  <strong>Mock Payment:</strong> This is a demo booking system. No actual payment will be processed.
                </p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? 'bg-ecto-green text-charcoal'
                      : 'bg-gunmetal text-fog-gray'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-bold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 text-sm">
                  <div className={currentStep >= step.number ? 'text-ecto-green' : 'text-fog-gray'}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-6 ${currentStep > step.number ? 'bg-ecto-green' : 'bg-fog-gray/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={handleBack} icon={ArrowLeft}>
            {currentStep === 1 ? 'Back to Venue' : 'Previous'}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={
              (currentStep === 3 && (!customerDetails.name || !customerDetails.email || !customerDetails.phone || !agreedToTerms))
            }
            icon={currentStep === 4 ? Check : ArrowRight}
          >
            {currentStep === 4 ? 'Complete Booking' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};