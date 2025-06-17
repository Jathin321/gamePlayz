
'use client';
import { useState } from 'react';

const TournamentRegistration = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [region, setRegion] = useState('');

  const teams = [
    { id: 1, name: 'Team Alpha' },
    { id: 2, name: 'Team Beta' },
    { id: 3, name: 'Team Gamma' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend or payment gateway)
    console.log({
      selectedTeam,
      contactEmail,
      contactPhone,
      paymentMethod,
      region,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-violet-500 dark:text-violet-500 mb-6">
          Tournament Registration
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Team Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Your Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            >
              <option value="" disabled>
                Choose a team
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contact Information
            </label>
            <input
              type="email"
              placeholder="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 mb-2"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            >
              <option value="" disabled>
                Choose a payment method
              </option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
            </select>
          </div>

          {/* Region/Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Region/Location
            </label>
            <input
              type="text"
              placeholder="Enter your region or location"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-700 transition-colors duration-300"
          >
            Register for Tournament
          </button>
        </form>
      </div>
    </div>
  );
};

export default TournamentRegistration;