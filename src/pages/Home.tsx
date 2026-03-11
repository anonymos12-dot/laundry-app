import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Clock, Shield, Truck, Award, Sparkles, CheckCircle } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Premium Laundry Service</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Time is
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              Precious
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Delhi's most trusted doorstep laundry service. We connect you with premium laundries
            that have been perfecting their craft for decades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="w-full sm:w-auto">
                Schedule a Pickup
              </Button>
            </Link>
            <Link to="/tracking">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Time-Effective</h3>
            <p className="text-gray-600 leading-relaxed">
              Same-day pickup and 48-hour delivery. Your schedule, our priority.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cost-Effective</h3>
            <p className="text-gray-600 leading-relaxed">
              Premium quality at transparent prices. No hidden fees, ever.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Doorstep Service</h3>
            <p className="text-gray-600 leading-relaxed">
              Free pickup and delivery. We come to you, wherever you are.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Partnered with laundries that have 30+ years of expertise.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 md:p-16 text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-10 h-10 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold">Built on Family Legacy</h2>
            </div>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              For over 30 years, our family has been at the heart of Delhi's laundry industry.
              We've built relationships with the finest laundries in the city, ensuring every
              garment receives the expert care it deserves. When you choose Pressd, you're
              choosing three decades of trust, excellence, and dedication.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Quality Assured</p>
                  <p className="text-sm text-gray-400">Every piece inspected twice</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Eco-Friendly</p>
                  <p className="text-sm text-gray-400">Sustainable practices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold mb-1">Secure Handling</p>
                  <p className="text-sm text-gray-400">Your clothes, our responsibility</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience Premium Care?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers across Delhi
          </p>
          <Link to="/booking">
            <Button size="lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
