import React from 'react';
import { Ghost, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal border-t border-gunmetal/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Ghost className="w-8 h-8 text-ecto-green" />
              <span className="text-2xl font-heading font-bold text-white">
                Faded Footsteps
              </span>
            </div>
            <p className="text-fog-gray mb-6 max-w-md">
              Experience horror like never before. We bring you genuine scares in authentic locations across the UK, 
              combining traditional cinema with cutting-edge VR technology.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-fog-gray">
                <Mail className="w-4 h-4" />
                <span>hello@fadedsteps.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/locations" className="text-fog-gray hover:text-ecto-green transition-colors">
                  All Locations
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-fog-gray hover:text-ecto-green transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-fog-gray hover:text-ecto-green transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gunmetal/50 mt-8 pt-8 text-center">
          <p className="text-fog-gray">
            © 2025 Faded Footsteps. All rights reserved. | Crafted for the brave.
          </p>
        </div>
      </div>
    </footer>
  );
};