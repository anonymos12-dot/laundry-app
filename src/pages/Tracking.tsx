import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';
import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  address: string;
  service_type: string;
  pickup_date: string;
  pickup_time: string;
  status: 'pending' | 'picked_up' | 'processing' | 'out_for_delivery' | 'completed';
  created_at: string;
}

const statusSteps = [
  { key: 'pending', label: 'Pickup Scheduled', icon: Clock },
  { key: 'picked_up', label: 'Picked Up', icon: Package },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { key: 'completed', label: 'Completed', icon: CheckCircle }
];

export function Tracking() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      fetchBookings(location.state.email);
    }
  }, [location.state]);

  const fetchBookings = async (emailToSearch: string) => {
    if (!emailToSearch.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_email', emailToSearch)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (!data || data.length === 0) {
        setError('No bookings found for this email');
        setBookings([]);
      } else {
        setBookings(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookings(email);
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Enter your email to view all your bookings
          </p>
        </div>

        <Card className="mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="sm:w-auto">
              {isLoading ? 'Searching...' : 'Track Orders'}
            </Button>
          </form>
        </Card>

        {bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const currentStatusIndex = getStatusIndex(booking.status);
              const StatusIcon = statusSteps[currentStatusIndex]?.icon || Clock;

              return (
                <Card key={booking.id}>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.service_type === 'wash_fold' ? 'Wash & Fold' : 'Dry Clean'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Booked on {new Date(booking.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                        <StatusIcon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-blue-900">
                          {statusSteps[currentStatusIndex]?.label}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Pickup Address</p>
                          <p className="text-sm text-gray-600">{booking.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Pickup Schedule</p>
                          <p className="text-sm text-gray-600">
                            {new Date(booking.pickup_date).toLocaleDateString()} at {booking.pickup_time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex justify-between items-center">
                      {statusSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;

                        return (
                          <div key={step.key} className="flex flex-col items-center flex-1 relative">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all mb-2 ${
                                isActive
                                  ? isCurrent
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-400'
                              }`}
                            >
                              <StepIcon className="w-6 h-6" />
                            </div>
                            <p
                              className={`text-xs text-center font-medium ${
                                isActive ? 'text-gray-900' : 'text-gray-400'
                              }`}
                            >
                              {step.label}
                            </p>

                            {index < statusSteps.length - 1 && (
                              <div
                                className={`absolute top-6 left-1/2 w-full h-1 -z-10 transition-all ${
                                  index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                                style={{ transform: 'translateY(-50%)' }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {booking.status === 'completed' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                      <p className="text-green-800 font-medium">
                        Thank you for choosing Pressd! We hope you enjoyed our service.
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {bookings.length === 0 && !error && !isLoading && email && (
          <Card className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any bookings associated with this email address.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
