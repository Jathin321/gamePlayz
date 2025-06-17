import React, { useState, useEffect, Fragment } from 'react';
import { Brackets, Users, AlertCircle, Calendar, Plus, Trash2, Info, Zap, ArrowLeft, Check } from 'lucide-react';

function FormatDetails({ formData, onUpdate }) {
  // Existing state
  const [rounds, setRounds] = useState(Array.isArray(formData.rounds) ? formData.rounds : []);
  
  // New states for auto-generate brackets feature
  const [showBracketGenerator, setShowBracketGenerator] = useState(false);
  const [maxMatchesPerRound, setMaxMatchesPerRound] = useState(8);
  const [bracketType, setBracketType] = useState("single-elimination");
  const [thirdPlaceMatch, setThirdPlaceMatch] = useState(false);
  
  // Initialize rounds if not already set
  useEffect(() => {
    if (!Array.isArray(formData.rounds) || formData.rounds.length === 0) {
      const initialRounds = [
        {
          name: "Group Stage",
          teamsPerGroup: 4,
          numberOfGroups: Math.ceil(formData.slots / 4),
          teamsQualifying: 2,
        }
      ];
      
      setRounds(initialRounds);
      onUpdate({ rounds: initialRounds });
    } else {
      setRounds(formData.rounds);
    }
  }, []);

  // Calculate number of teams for each round based on previous round
  const calculateTeamProgression = () => {
    const progression = [];
    let remainingTeams = formData.slots;
    
    // Ensure rounds is always an array before using forEach
    if (!Array.isArray(rounds)) {
      return progression;
    }
    
    rounds.forEach((round, index) => {
      const totalGroups = round.numberOfGroups || 1;
      const teamsQualifying = round.teamsQualifying || 1;
      const teamsInRound = index === 0 ? formData.slots : progression[index - 1].teamsAdvancing;
      
      progression.push({
        roundName: round.name,
        teamsInRound: teamsInRound,
        teamsPerGroup: round.teamsPerGroup,
        totalGroups: totalGroups,
        teamsAdvancing: totalGroups * teamsQualifying,
      });
      
      remainingTeams = totalGroups * teamsQualifying;
    });
    
    return progression;
  };

  const progression = calculateTeamProgression();

  // Generate brackets automatically based on total teams and max matches per round
  const generateBrackets = () => {
    const totalTeams = formData.slots;
    let remainingTeams = totalTeams;
    const generatedRounds = [];
    
    // Determine if we need a group stage
    if (totalTeams > maxMatchesPerRound * 2) {
      // Calculate how many teams should advance from group stage to keep within max matches
      const teamsPerGroup = 4; // Standard size
      const totalGroups = Math.ceil(totalTeams / teamsPerGroup);
      const teamsQualifying = Math.min(
        2, // Default 2 teams qualify per group
        Math.floor(maxMatchesPerRound * 2 / totalGroups) // But limited by max matches constraint
      );

      // Group stage
      generatedRounds.push({
        name: "Group Stage",
        teamsPerGroup: teamsPerGroup,
        numberOfGroups: totalGroups,
        teamsQualifying: teamsQualifying,
      });
      
      remainingTeams = totalGroups * teamsQualifying;
    }
    
    // Generate elimination rounds
    while (remainingTeams > 1) {
      let roundName;
      if (remainingTeams <= 2) roundName = "Finals";
      else if (remainingTeams <= 4) roundName = "Semi Finals";
      else if (remainingTeams <= 8) roundName = "Quarter Finals";
      else if (remainingTeams <= 16) roundName = "Round of 16";
      else roundName = `Round of ${remainingTeams}`;
      
      // In elimination rounds we typically have direct matchups (2 teams per group)
      const teamsPerGroup = 2;
      const numberOfGroups = Math.ceil(remainingTeams / teamsPerGroup);
      
      generatedRounds.push({
        name: roundName,
        teamsPerGroup: teamsPerGroup,
        numberOfGroups: numberOfGroups,
        teamsQualifying: 1, // In elimination, only winner advances
      });
      
      remainingTeams = numberOfGroups; // Winners advance
    }
    
    // Add third-place match if requested
    if (thirdPlaceMatch && generatedRounds.length > 1) {
      // Insert before the final round
      generatedRounds.splice(generatedRounds.length - 1, 0, {
        name: "Third Place Match",
        teamsPerGroup: 2,
        numberOfGroups: 1,
        teamsQualifying: 1,
      });
    }
    
    setRounds(generatedRounds);
    onUpdate({ 
      rounds: generatedRounds,
      format: bracketType,
      thirdPlaceMatch
    });
    setShowBracketGenerator(false);
  };

  // Rest of your existing functions
  const updateRound = (index, updates) => {
    const updatedRounds = [...rounds];
    updatedRounds[index] = { ...updatedRounds[index], ...updates };
    
    // Update subsequent rounds if needed
    if (updates.teamsQualifying || updates.numberOfGroups) {
      for (let i = index + 1; i < updatedRounds.length; i++) {
        const prevRound = updatedRounds[i - 1];
        const teamsAdvancing = prevRound.numberOfGroups * prevRound.teamsQualifying;
        
        // Update number of groups in next round if needed
        if (teamsAdvancing < updatedRounds[i].numberOfGroups * updatedRounds[i].teamsPerGroup) {
          updatedRounds[i].numberOfGroups = Math.ceil(teamsAdvancing / updatedRounds[i].teamsPerGroup);
        }
      }
    }
    
    setRounds(updatedRounds);
    onUpdate({ rounds: updatedRounds });
  };

  // Add a new round
  const addRound = () => {
    // Your existing addRound logic
    const lastRound = rounds[rounds.length - 1];
    const teamsAdvancing = lastRound.numberOfGroups * lastRound.teamsQualifying;
    const teamsPerGroup = Math.min(4, teamsAdvancing);
    const numberOfGroups = Math.ceil(teamsAdvancing / teamsPerGroup);
    
    let roundName = "Round " + (rounds.length + 1);
    if (teamsAdvancing <= 4) roundName = "Finals";
    else if (teamsAdvancing <= 8) roundName = "Semi Finals";
    else if (teamsAdvancing <= 16) roundName = "Quarter Finals";
    else if (rounds.length === 0) roundName = "Group Stage";
    
    const newRound = {
      name: roundName,
      teamsPerGroup: teamsPerGroup,
      numberOfGroups: numberOfGroups,
      teamsQualifying: Math.min(2, teamsPerGroup),
    };
    
    const updatedRounds = [...rounds, newRound];
    setRounds(updatedRounds);
    onUpdate({ rounds: updatedRounds });
  };

  // Remove a round
  const removeRound = (index) => {
    if (rounds.length <= 1) return; // Keep at least one round
    
    const updatedRounds = rounds.filter((_, i) => i !== index);
    setRounds(updatedRounds);
    onUpdate({ rounds: updatedRounds });
  };

  // Render bracket generator UI
  const renderBracketGenerator = () => (
    <div className="bg-gray-700/70 backdrop-blur-sm rounded-lg p-5 border border-purple-500/30 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button 
            className="mr-3 p-2 hover:bg-gray-600 rounded-full transition-colors"
            onClick={() => setShowBracketGenerator(false)}
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <h3 className="text-lg font-medium flex items-center">
            <Zap className="w-5 h-5 text-yellow-400 mr-2" />
            Auto-Generate Brackets
          </h3>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Max matches per round */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Max Matches Per Round
          </label>
          <div className="relative">
            <input
              type="range"
              min="1"
              max="32"
              value={maxMatchesPerRound}
              onChange={(e) => setMaxMatchesPerRound(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>32</span>
            </div>
            <div className="mt-1 text-center">
              <span className="bg-purple-600/30 text-purple-300 px-2 py-0.5 text-sm rounded-full">
                {maxMatchesPerRound} matches
              </span>
            </div>
          </div>
        </div>

        {/* Bracket type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bracket Type
          </label>
          <select
            value={bracketType}
            onChange={(e) => setBracketType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="single-elimination">Single Elimination</option>
            <option value="double-elimination">Double Elimination</option>
            <option value="round-robin">Round Robin</option>
          </select>
        </div>
      </div>

      {/* Third place match toggle */}
      <div className="mt-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={thirdPlaceMatch}
            onChange={() => setThirdPlaceMatch(!thirdPlaceMatch)}
            className="w-4 h-4 rounded accent-purple-500"
          />
          <span className="text-sm text-gray-300">Include third place match</span>
        </label>
      </div>

      {/* Generate button */}
      <div className="mt-5 flex justify-end">
        <button
          onClick={generateBrackets}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Generate Brackets
        </button>
      </div>

      {/* Preview of what will be generated based on current settings */}
      <div className="mt-5 p-4 bg-gray-800/70 rounded-lg border border-gray-700">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Preview Structure</h4>
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1 bg-gray-700 rounded-lg flex items-center">
            <span className="text-sm text-gray-300 mr-2">{formData.slots} Teams</span>
            <span className="text-purple-400">→</span>
          </div>

          {/* Calculate and show anticipated rounds based on current settings */}
          {(() => {
            let teams = formData.slots;
            const structure = [];
            
            if (teams > maxMatchesPerRound * 2) {
              const groupTeams = 4;
              const groups = Math.ceil(teams / groupTeams);
              const advancing = Math.min(2, Math.floor(maxMatchesPerRound * 2 / groups)) * groups;
              structure.push(`Group Stage (${groups} groups)`);
              teams = advancing;
            }
            
            while (teams > 1) {
              let name;
              if (teams <= 2) name = "Finals";
              else if (teams <= 4) name = "Semi Finals";
              else if (teams <= 8) name = "Quarter Finals";
              else name = `Round of ${teams}`;
              
              structure.push(name);
              teams = Math.ceil(teams / 2);
              
              if (thirdPlaceMatch && teams === 1) {
                structure.push("Third Place Match");
              }
            }
            
            return structure.map((name, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="text-purple-400">→</span>}
                <div className="px-3 py-1 bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-300">{name}</span>
                </div>
              </Fragment>
            ));
          })()}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Tournament Format</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Tournament Brackets</h3>
          
          {!showBracketGenerator ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowBracketGenerator(true)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                Auto-Generate
              </button>
              <button
                type="button"
                onClick={addRound}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                disabled={progression[progression.length - 1]?.teamsAdvancing <= 1}
              >
                <Plus className="w-4 h-4" />
                Add Round
              </button>
            </div>
          ) : null}
        </div>
        
        {/* Show bracket generator UI if activated */}
        {showBracketGenerator ? renderBracketGenerator() : (
          /* Original rounds UI */
          <div className="space-y-6">
            {rounds.map((round, roundIndex) => (
              <div 
                key={roundIndex} 
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      {roundIndex + 1}
                    </div>
                    <input
                      type="text"
                      value={round.name}
                      onChange={(e) => updateRound(roundIndex, { name: e.target.value })}
                      className="bg-gray-700 text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
                      placeholder="Round Name"
                    />
                  </div>
                  
                  {roundIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => removeRound(roundIndex)}
                      className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Teams per Group - Range input */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-400">
                        Teams per Group
                      </label>
                      <span className="bg-purple-600/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                        {round.teamsPerGroup}
                      </span>
                    </div>
                    <div className="relative mt-2">
                      <input
                        type="range"
                        min={2}
                        max={roundIndex === 0 ? Math.min(8, formData.slots) : Math.min(8, progression[roundIndex].teamsInRound)}
                        value={round.teamsPerGroup}
                        onChange={(e) => updateRound(roundIndex, { 
                          teamsPerGroup: parseInt(e.target.value) || 2,
                          numberOfGroups: Math.ceil((roundIndex === 0 ? formData.slots : progression[roundIndex-1]?.teamsAdvancing || 0) / parseInt(e.target.value))
                        })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                        <span>2</span>
                        <span>{roundIndex === 0 ? Math.min(8, formData.slots) : Math.min(8, progression[roundIndex].teamsInRound)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Number of Groups - Range input */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-400">
                        Number of Groups
                      </label>
                      <span className="bg-purple-600/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                        {round.numberOfGroups}
                      </span>
                    </div>
                    <div className="relative mt-2">
                      <input
                        type="range"
                        min={1}
                        max={roundIndex === 0 ? 32 : Math.ceil(progression[roundIndex-1]?.teamsAdvancing / 2)}
                        value={round.numberOfGroups}
                        onChange={(e) => updateRound(roundIndex, { numberOfGroups: parseInt(e.target.value) || 1 })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                        <span>1</span>
                        <span>{roundIndex === 0 ? 32 : Math.ceil(progression[roundIndex-1]?.teamsAdvancing / 2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Teams Qualifying per Group - Range input */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-400">
                        Teams Qualifying
                      </label>
                      <span className="bg-purple-600/30 text-purple-300 px-2 py-0.5 text-xs rounded-full">
                        {round.teamsQualifying}
                      </span>
                    </div>
                    <div className="relative mt-2">
                      <input
                        type="range"
                        min={1}
                        max={Math.max(1, round.teamsPerGroup - 1)}
                        value={round.teamsQualifying}
                        onChange={(e) => updateRound(roundIndex, { teamsQualifying: parseInt(e.target.value) || 1 })}
                        className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 ${
                          roundIndex === rounds.length - 1 && progression[roundIndex]?.teamsAdvancing <= 1 ? 'opacity-50' : ''
                        }`}
                        disabled={roundIndex === rounds.length - 1 && progression[roundIndex]?.teamsAdvancing <= 1}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                        <span>1</span>
                        <span>{Math.max(1, round.teamsPerGroup - 1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Round Summary */}
                <div className="mt-4 bg-gray-800/70 p-3 rounded-lg text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Teams in this round:</span>
                    <span className="font-medium text-white">
                      {progression[roundIndex]?.teamsInRound || formData.slots}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-400">Teams advancing:</span>
                    <span className={`font-medium ${roundIndex === rounds.length - 1 && progression[roundIndex]?.teamsAdvancing === 1 ? 'text-green-400' : 'text-white'}`}>
                      {progression[roundIndex]?.teamsAdvancing || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Tournament progression visualization */}
        <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
          <h4 className="text-sm uppercase text-gray-300 font-semibold mb-3 flex items-center">
            <Brackets className="w-4 h-4 mr-2 text-purple-400" />
            Tournament Progression
          </h4>
          
          <div className="flex flex-wrap items-center justify-between">
            {progression.map((stage, i) => (
              <div key={i} className="flex items-center mb-3">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-lg bg-gray-700 flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-400">Round {i+1}</span>
                    <span className="text-lg font-bold text-white">{stage.teamsInRound}</span>
                    <span className="text-xs text-gray-400">teams</span>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{stage.roundName}</span>
                </div>
                
                {i < progression.length - 1 && (
                  <div className="h-0.5 w-10 bg-purple-600 mx-1"></div>
                )}
              </div>
            ))}
            
            {progression[progression.length - 1]?.teamsAdvancing === 1 && (
              <>
                <div className="h-0.5 w-10 bg-purple-600 mx-1"></div>
                <div className="flex flex-col items-center mb-3">
                  <div className="w-16 h-16 rounded-lg bg-green-700/30 border border-green-500/50 flex flex-col items-center justify-center">
                    <span className="text-xs text-gray-300">Winner</span>
                    <span className="text-lg font-bold text-white">1</span>
                    <span className="text-xs text-gray-300">team</span>
                  </div>
                  <span className="text-xs text-gray-300 mt-1">Champion</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Match Format Section - Keep your existing match settings UI */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-medium mb-4">Match Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Match Format */}
          <div>
            <label htmlFor="matchFormat" className="block text-sm font-medium text-gray-400 mb-1">
              Match Format
            </label>
            <select
              id="matchFormat"
              value={formData.matchFormat || 'BO1'}
              onChange={(e) => onUpdate({ matchFormat: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="BO1">Best of 1</option>
              <option value="BO3">Best of 3</option>
              <option value="BO5">Best of 5</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">
              Notes / Additional Info
            </label>
            <textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., All matches will be played on Erangel map..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormatDetails;