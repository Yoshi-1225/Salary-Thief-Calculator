import React from 'react';

interface SalarySectionProps {
  salary: string;
  setSalary: (value: string) => void;
  presets: number[];
}

const SalarySection: React.FC<SalarySectionProps> = ({ salary, setSalary, presets }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">月薪 (NT$)</label>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-xl font-bold text-center transition-colors bg-white text-gray-900"
        placeholder="例如: 45000"
      />
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {presets.map((amount) => (
          <button
            key={amount}
            onClick={() => setSalary(amount.toString())}
            type="button"
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full border border-gray-200 hover:border-blue-200 transition-all active:scale-95"
          >
            ${amount.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SalarySection;