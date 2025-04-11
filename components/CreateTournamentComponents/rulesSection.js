import { List, Plus, X } from 'lucide-react';

function RulesSection({ formData, onUpdate }) {
  const addRule = () => {
    onUpdate({ rules: [...formData.rules, ''] });
  };

  const updateRule = (index, value) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    onUpdate({ rules: newRules });
  };

  const removeRule = (index) => {
    const newRules = formData.rules.filter((_, i) => i !== index);
    onUpdate({ rules: newRules });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Tournament Rules</h2>
      
      <div className="space-y-6">
        {/* Rules List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-400">
              Tournament Rules
            </label>
            <button
              type="button"
              onClick={addRule}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Rule
            </button>
          </div>

          <div className="space-y-3">
            {formData.rules.map((rule, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <List className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={rule}
                  onChange={(e) => updateRule(index, e.target.value)}
                  className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Rule ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeRule(index)}
                  className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {formData.rules.length === 0 && (
              <div className="text-center py-8 bg-gray-700/50 rounded-lg">
                <List className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">No rules added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RulesSection;
