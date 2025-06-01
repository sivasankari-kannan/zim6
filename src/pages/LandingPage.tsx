import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar, BarChart3, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { memberships } from '../data/mockData';
import MembershipCard from '../components/membership/MembershipCard';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Manage Your Gym <br />
                  <span className="text-accent-300">Efficiently</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-lg">
                  ZIM is the all-in-one gym management solution that helps you track members, 
                  attendance, and memberships all in one place.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/signin">
                    <Button size="lg" variant="accent">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.pexels.com/photos/3836861/pexels-photo-3836861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Gym management" 
                  className="rounded-lg shadow-xl max-w-full h-auto animate-fade-in"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-dark-900 mb-4">Everything you need to manage your gym</h2>
              <p className="text-xl text-gray-600">
                Simplify your gym operations with our comprehensive management tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <Users className="h-8 w-8" />, 
                  title: 'Member Management', 
                  description: 'Keep track of all your members with detailed profiles and history.' 
                },
                { 
                  icon: <Calendar className="h-8 w-8" />, 
                  title: 'Attendance Tracking', 
                  description: 'Monitor check-ins and check-outs with our easy-to-use attendance system.' 
                },
                { 
                  icon: <BarChart3 className="h-8 w-8" />, 
                  title: 'Analytics Dashboard', 
                  description: 'Get insights into your gym performance with our comprehensive dashboard.' 
                },
                { 
                  icon: <Dumbbell className="h-8 w-8" />, 
                  title: 'Membership Plans', 
                  description: 'Create and manage different membership plans and subscriptions.' 
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-enter" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Membership Plans */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-dark-900 mb-4">Membership Plans</h2>
              <p className="text-xl text-gray-600">
                Choose the perfect membership plan for your fitness journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {memberships.map((membership, idx) => (
                <MembershipCard 
                  key={membership.id} 
                  membership={membership}
                  isPopular={idx === 1} // Make the Standard plan "popular"
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-dark-900 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600">
                Gym owners and managers love using ZIM
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "ZIM has transformed how we manage our gym. Attendance tracking is seamless and our members love it!",
                  name: "Sarah Johnson",
                  title: "Fitness Center Owner",
                  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
                {
                  quote: "The dashboard analytics have given us insights we never had before. We've increased member retention by 23%!",
                  name: "Michael Chen",
                  title: "Gym Manager",
                  avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
                {
                  quote: "I can't imagine running our fitness studio without ZIM. The member management features are simply outstanding.",
                  name: "Jessica Miller",
                  title: "Studio Director",
                  avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow animate-enter" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex-grow">
                      <svg className="h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="mt-4 text-gray-600 italic">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;