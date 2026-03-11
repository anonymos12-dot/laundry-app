import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { supabase } from '../lib/supabase';
import { Building2, CheckCircle, Dumbbell, Hotel, Briefcase } from 'lucide-react';

interface FormData {
  businessName: string;
  businessType: 'hotel' | 'gym' | 'other' | '';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  message: string;
}

export function B2B() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    message: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessType) newErrors.businessType = 'Please select business type';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Email is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('b2b_inquiries').insert([
        {
          business_name: formData.businessName,
          business_type: formData.businessType,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
          contact_phone: formData.contactPhone,
          message: formData.message
        }
      ]);

      if (error) throw error;

      setIsSuccess(true);
      setFormData({
        businessName: '',
        businessType: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Business Solutions</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Partner with Pressd
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Streamline your laundry operations with our bulk service solutions for hotels, gyms, and businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <Hotel className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Hotels</h3>
            <p className="text-gray-600 leading-relaxed">
              High-volume linen and towel service with guaranteed turnaround times. Perfect for boutique and luxury hotels.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <Dumbbell className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gyms & Spas</h3>
            <p className="text-gray-600 leading-relaxed">
              Fresh towels and gym wear cleaning. Daily or weekly pickup schedules tailored to your needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Offices</h3>
            <p className="text-gray-600 leading-relaxed">
              Uniform cleaning and employee laundry benefits. Boost productivity by saving your team's time.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose Pressd for Business?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Volume Discounts</h3>
                  <p className="text-gray-600">
                    Competitive pricing for bulk orders with transparent monthly billing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Daily, weekly, or custom pickup schedules that fit your operations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dedicated Account Manager</h3>
                  <p className="text-gray-600">
                    Personal point of contact for all your laundry needs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality Guarantee</h3>
                  <p className="text-gray-600">
                    30+ years of industry expertise ensuring perfect results every time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-time Tracking</h3>
                  <p className="text-gray-600">
                    Monitor your orders and inventory through our dashboard
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  We've received your inquiry. Our team will contact you within 24 hours to discuss your requirements.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="outline">
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Request a Quote
                </h2>

                <Input
                  label="Business Name"
                  placeholder="Your Company Name"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  error={errors.businessName}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
                    value={formData.businessType}
                    onChange={(e) => updateField('businessType', e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="hotel">Hotel</option>
                    <option value="gym">Gym/Spa</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
                  )}
                </div>

                <Input
                  label="Contact Name"
                  placeholder="Your Name"
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  error={errors.contactName}
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  error={errors.contactEmail}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  error={errors.contactPhone}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your requirements
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors resize-none"
                    rows={4}
                    placeholder="Estimated volume, preferred schedule, special requirements..."
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
