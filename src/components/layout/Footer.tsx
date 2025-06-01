import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Facebook</span>
              <Facebook size={20} />
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Instagram</span>
              <Instagram size={20} />
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">Twitter</span>
              <Twitter size={20} />
            </Link>
            <Link to="/" className="text-gray-500 hover:text-gray-900">
              <span className="sr-only">YouTube</span>
              <Youtube size={20} />
            </Link>
          </div>
          <div className="mt-8 md:mt-0 text-center md:text-right">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ZIM Gym Management. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;