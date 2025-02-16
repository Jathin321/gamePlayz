'use client';
import React, { useState, useRef } from 'react';
import { Trophy } from 'lucide-react';
import BasicDetails from '../../components/CreateTournamentComponents/bacsicDetails';
import RulesSection from '../../components/CreateTournamentComponents/rulesSection';
import TeamSettings from '../../components/CreateTournamentComponents/teamSettings';
import PrizeDetails from '../../components/CreateTournamentComponents/prizeDetails';
import TournamentStatus from '../../components/CreateTournamentComponents/tournamentStatus';
import TournamentPreview from '../../components/CreateTournamentComponents/tournamentPreview';

const initialFormData = {
  name: '',
  image: '',
  description: '',
  game: '',
  startDate: '',
  endDate: '',
  slots: 16,
  teamSize: 5,
  entryFee: 0,
  prizePool: {
    first: 0,
    second: 0,
    third: 0,
  },
  rules: [],
  format: 'single-elimination',
  status: 'draft',
};

function CreateTournament() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const stepRefs = useRef([]); // Ref to store references to each step element

  const handleUpdateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tournament data:', formData);
  };

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Rules & Format' },
    { number: 3, title: 'Team Settings' },
    { number: 4, title: 'Prize Details' },
    { number: 5, title: 'Review' },
  ];

  // Function to handle next button click
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);

      // Scroll the next step into view
      if (stepRefs.current[currentStep]) {
        stepRefs.current[currentStep].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    } else {
      handleSubmit(new Event('submit'));
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">Create Tournament</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Set up your tournament and start recruiting teams</p>
        </div>

        {/* Step Indicator - Horizontal Slider for Mobile */}
        <div className="mb-8 overflow-x-auto no-scrollbar">
          <div className="flex space-x-4 sm:space-x-0 sm:flex-row sm:justify-between sm:items-center w-max sm:w-full">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => (stepRefs.current[index] = el)} // Store reference to each step
                className={`flex items-center flex-shrink-0 ${
                  currentStep === step.number ? 'sm:flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.number ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {step.number}
                </div>
                <div
                  className={`text-sm ml-2 ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
                {step.number < steps.length && (
                  <div
                    className={`hidden sm:block flex-1 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-purple-500' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Form Content */}
            <div className="flex-1 space-y-6">
              {currentStep === 1 && <BasicDetails formData={formData} onUpdate={handleUpdateForm} />}
              {currentStep === 2 && <RulesSection formData={formData} onUpdate={handleUpdateForm} />}
              {currentStep === 3 && <TeamSettings formData={formData} onUpdate={handleUpdateForm} />}
              {currentStep === 4 && <PrizeDetails formData={formData} onUpdate={handleUpdateForm} />}
              {currentStep === 5 && <TournamentPreview formData={formData} />}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                >
                  {currentStep === 5 ? 'Create Tournament' : 'Next'}
                </button>
              </div>
            </div>

            {/* Tournament Status Section */}
            <div className="w-full lg:w-1/3">
              <TournamentStatus formData={formData} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTournament;