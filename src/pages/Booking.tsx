import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';
import { ChevronRight, ChevronLeft, Check, MapPin, Calendar, User } from 'lucide-react';

type Step = 1 | 2 | 3;

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  serviceType: 'wash_fold' | 'dry_clean' | '';
  pickupDate: string;
  pickupTime: string;
}

export function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    serviceType: '',
    pickupDate: '',
    pickupTime: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
      if (!formData.customerEmail.trim()) newErrors.customerEmail = 'Email is required';
      if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    } else if (currentStep === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    } else if (currentStep === 3) {
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((step + 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('bookings').insert([
        {
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          address: formData.address,
          service_type: formData.serviceType,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime
        }
      ]).select();

      if (error) throw error;

      navigate('/tracking', {
        state: { bookingId: data[0].id, email: formData.customerEmail }
      });
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Pickup
          </h1>
          <p className="text-lg text-gray-600">
            Quick and easy in just 3 steps
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  s < step
                    ? 'bg-green-500 text-white'
                    : s === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 ${
                    s < step ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card>
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Details
                </h2>
              </div>

              <Input
                label="Full Name"
                placeholder="John Doe"
                value={formData.customerName}
                onChange={(e) => updateField('customerName', e.target.value)}
                error={errors.customerName}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.customerEmail}
                onChange={(e) => updateField('customerEmail', e.target.value)}
                error={errors.customerEmail}
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.customerPhone}
                onChange={(e) => updateField('customerPhone', e.target.value)}
                error={errors.customerPhone}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Address
                </label>
                <textarea
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
                  rows={3}
                  placeholder="Enter your complete address..."
                  value={formData.address}
                  onChange={(e) => updateField('address', e.target.value)}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Service
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => updateField('serviceType', 'wash_fold')}
                  className={`p-8 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === 'wash_fold'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Wash & Fold
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Perfect for everyday clothes. Professional wash, dry, and fold service.
                  </p>
                  <p className="text-2xl font-bold text-blue-600">₹99/kg</p>
                </button>

                <button
                  onClick={() => updateField('serviceType', 'dry_clean')}
                  className={`p-8 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === 'dry_clean'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Dry Clean
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Premium care for delicate garments. Suits, dresses, and more.
                  </p>
                  <p className="text-2xl font-bold text-blue-600">₹149/pc</p>
                </button>
              </div>

              {errors.serviceType && (
                <p className="text-sm text-red-600">{errors.serviceType}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Schedule Pickup
                </h2>
              </div>

              <Input
                label="Pickup Date"
                type="date"
                min={minDate}
                value={formData.pickupDate}
                onChange={(e) => updateField('pickupDate', e.target.value)}
                error={errors.pickupDate}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Pickup Time Slot
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM', '2:00 PM - 4:00 PM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => updateField('pickupTime', time)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                        formData.pickupTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.pickupTime && (
                  <p className="mt-2 text-sm text-red-600">{errors.pickupTime}</p>
                )}
              </div>

              <div className="bg-blue-50 p-6 rounded-xl mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900">
                      {formData.serviceType === 'wash_fold' ? 'Wash & Fold' : 'Dry Clean'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pickup:</span>
                    <span className="font-medium text-gray-900">
                      {formData.pickupDate} at {formData.pickupTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((step - 1) as Step)}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </Button>
            )}

            {step < 3 ? (
              <Button onClick={handleNext} className="ml-auto">
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="ml-auto"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
