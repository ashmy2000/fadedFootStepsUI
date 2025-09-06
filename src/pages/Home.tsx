import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Film, Headset as VrHeadset, Calendar, Star, ChevronRight, Users, Clock, Shield } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { CityCard } from '../components/Cards/CityCard';
import { cities } from '../data/mockData';

export const Home: React.FC = () => {
  const featuredCities = cities.slice(0, 2);
  
  const steps = [
    {
      icon: MapPin,
      title: 'Pick Location',
      description: 'Choose from our carefully selected haunted venues across the UK',
    },
    {
      icon: Film,
      title: 'Choose Experience',
      description: 'Select between immersive movie nights or cutting-edge VR horror',
    },
    {
      icon: Calendar,
      title: 'Book & Enjoy',
      description: 'Reserve your spot and prepare for an unforgettable experience',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Birmingham',
      rating: 5,
      text: 'Absolutely terrifying in the best way! The VR experience in the abandoned mill was so realistic I still get chills thinking about it.',
    },
    {
      name: 'James R.',
      location: 'London',
      rating: 5,
      text: 'Perfect date night activity if you want to hold hands very tightly! The Victorian mortuary setting was incredibly atmospheric.',
    },
    {
      name: 'Emma L.',
      location: 'Birmingham',
      rating: 5,
      text: 'The cinema basement experience was phenomenal. Watching horror films in an actually haunted location hits different.',
    },
  ];

  const faqs = [
    {
      question: 'Is it actually scary?',
      answer: 'Our experiences range from atmospheric tension to genuine frights. We provide content warnings and you can always step out if needed.',
    },
    {
      question: 'Are the locations really haunted?',
      answer: 'Many of our venues have documented paranormal activity. We choose locations with authentic historical significance and reported supernatural encounters.',
    },
    {
      question: 'What safety measures are in place?',
      answer: 'All venues undergo safety inspections, we provide safety briefings, and trained staff are present at all times. Emergency exits are clearly marked.',
    },
    {
      question: 'Can I bring friends?',
      answer: 'Absolutely! Most experiences are more fun with friends. Check individual venue capacity - most accommodate 8-15 people.',
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg"
            alt="Haunted location"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/70 to-charcoal" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight">
              Where <span className="text-ecto-green animate-pulse">Horror</span>
              <br />
              Meets Reality
            </h1>
            
            <p className="text-xl md:text-2xl text-fog-gray max-w-2xl mx-auto">
              Experience genuine scares in authentic haunted locations across the UK. 
              Cinema nights and VR horror adventures that blur the line between fiction and reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" icon={MapPin}>
                <Link to="/locations" className="flex items-center space-x-2">
                  <span>Explore Locations</span>
                </Link>
              </Button>
              <Button size="lg" variant="ghost">
                <a href="#how-it-works" className="flex items-center space-x-2">
                  <span>How it Works</span>
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-10 opacity-20"
        >
          <VrHeadset className="w-16 h-16 text-ecto-green" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-10 opacity-20"
        >
          <Film className="w-12 h-12 text-eerie-purple" />
        </motion.div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            How it <span className="text-ecto-green">Works</span>
          </h2>
          <p className="text-xl text-fog-gray max-w-2xl mx-auto">
            Three simple steps to your most thrilling experience yet
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card glass className="text-center h-full">
                <div className="w-16 h-16 bg-ecto-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-ecto-green" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-fog-gray">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-ecto-green/50" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Locations */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Featured <span className="text-blood-red">Locations</span>
          </h2>
          <p className="text-xl text-fog-gray max-w-2xl mx-auto">
            Discover our most popular haunted venues
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredCities.map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="ghost" icon={MapPin}>
            <Link to="/locations">View All Locations</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card glass className="text-center">
              <Shield className="w-12 h-12 text-ecto-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Safety First</h3>
              <p className="text-fog-gray">Professional safety measures and trained staff at every location</p>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card glass className="text-center">
              <Users className="w-12 h-12 text-eerie-purple mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Group Fun</h3>
              <p className="text-fog-gray">Perfect for date nights, friend groups, and team building events</p>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card glass className="text-center">
              <Clock className="w-12 h-12 text-blood-red mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Flexible Times</h3>
              <p className="text-fog-gray">Evening sessions available 7 days a week to fit your schedule</p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            What People <span className="text-ecto-green">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card glass>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-ecto-green fill-current" />
                  ))}
                </div>
                <p className="text-fog-gray mb-4">"{testimonial.text}"</p>
                <div className="text-white font-semibold">
                  {testimonial.name}
                  <span className="text-fog-gray font-normal"> - {testimonial.location}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Frequently Asked <span className="text-blood-red">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-fog-gray">{faq.answer}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <Card glass className="p-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Ready to Face Your <span className="text-blood-red">Fears</span>?
          </h2>
          <p className="text-xl text-fog-gray mb-8 max-w-2xl mx-auto">
            Join thousands of thrill-seekers who have experienced horror like never before. 
            Your next unforgettable adventure is just a click away.
          </p>
          <Button size="lg" className="block mx-auto w-fit animate-glow">
            <Link to="/locations">Book Your Experience</Link>
          </Button>
        </Card>
      </section>
    </div>
  );
};