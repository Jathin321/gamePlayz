'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Trophy, CheckCircle2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BasicDetails from '../../../../components/CreateScrimComponents/bacsicDetails';
import RulesSection from '../../../../components/CreateScrimComponents/rulesSection';
import TeamSettings from '../../../../components/CreateScrimComponents/teamSettings';
import PrizeDetails from '../../../../components/CreateScrimComponents/prizeDetails';
import TournamentStatus from '../../../../components/CreateScrimComponents/tournamentStatus';
import TournamentPreview from '../../../../components/CreateScrimComponents/tournamentPreview';
import { createScrim, getSpaceDetailsBySlug } from '../../../../actions/prismaActions';

const initialFormData = {
  name: '',
  image: '',
  description: '',
  gameId: '',
  spaceId: '',
  adminId: '',
  slug: '',
  startDate: '',
  endDate: '',
  slots: '16',
  teamSize: '5',
  entryFee: '0',
  prizePool: '0',
  prizeDistribution: {
    first: 0,
    second: 0,
    third: 0,
  },
  rules: [],
  matchesCount: '0',
  format: 'single-elimination',
  status: 'upcoming',
};

function CreateTournament() {
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [spaceDetails, setSpaceDetails] = useState(null);
  const stepRefs = useRef([]); // Ref to store references to each step element
  const { slug } = useParams();

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      const response = await getSpaceDetailsBySlug(slug);
      if (response) {
        setSpaceDetails(response);
        setFormData((prev) => ({
          ...prev,
          spaceId: response.id,
          adminId: response.admin.id,
        }));
      } else {
        setError('Failed to fetch space details.');
      }
    };

    fetchSpaceDetails();
  }, [slug]);

  const handleUpdateForm = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamSize = parseInt(formData.teamSize, 10);
    const entryFee = parseFloat(formData.entryFee);
    const slots = parseInt(formData.slots, 10);
    const prizePool = parseFloat(formData.prizePool);
    const matchesCount = parseInt(formData.matchesCount, 10);

    // Check if startDate is before endDate
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError('Start date must be before end date.');
      return;
    }

    const finalFormData = {
      ...formData,
      teamSize: isNaN(teamSize) ? 1 : teamSize,
      entryFee: isNaN(entryFee) ? 0 : entryFee,
      slots: isNaN(slots) ? 16 : slots,
      prizePool: isNaN(prizePool) ? 0 : prizePool,
      matchesCount: isNaN(matchesCount) ? 0 : matchesCount,
      spaceId: spaceDetails.id,
      adminId: spaceDetails.admin.id,
    };
    console.log(finalFormData);

    // Call createScrim function to insert data into the database
    const response = await createScrim(finalFormData);
    if (!response.success) {
      setError(response.error);
      setSuccess(false); // Clear any previous success message
      return;
    }

    console.log('Tournament data:', finalFormData);
    setError(''); // Clear any previous errors
    setSuccess(true); // Set success message
  };

  const steps = [
    { number: 1, title: 'Basic Details' },
    { number: 2, title: 'Rules & Matches Count' },
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

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="flex flex-col items-center space-y-4 bg-purple-800 rounded-lg p-8 shadow-lg">
          <CheckCircle2 className="h-24 w-24 text-white" />
          <p className="text-2xl font-semibold text-white text-center">
            Scrim created successfully!
          </p>
          <Link
            href="/scrims"
            className="mt-6 px-6 py-3 bg-white text-violet-700 rounded-lg font-semibold hover:bg-violet-100 transition duration-300"
          >
            Go to Scrims
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">Create Scrim</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-400">Set up your scrim match and start recruiting teams</p>
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
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              {success && <p className="text-green-500 text-center mt-4">{success}</p>}

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