import React from 'react';

interface PasswordStrengthIndicatorProps {
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = '' }) => {
  console.log("Rendering PasswordStrengthIndicator");

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;

    // Award points for different criteria
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[A-Z]/.test(pass)) score++; // Uppercase
    if (/[a-z]/.test(pass)) score++; // Lowercase
    if (/[0-9]/.test(pass)) score++; // Numbers
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Symbols

    // Cap score if too short
    if (pass.length < 8 && score > 1) score = 1;
    if (pass.length < 6 && score > 0) score = 0;


    return Math.min(score, 4); // Max strength level 4
  };

  const strength = getStrength(password);
  const strengthLabels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-red-500',      // Very Weak
    'bg-orange-500',   // Weak
    'bg-yellow-500',   // Medium
    'bg-lime-500',    // Strong
    'bg-green-500'     // Very Strong
  ];

  const activeStrength = Math.max(0, Math.min(strength, strengthLabels.length -1));

  return (
    <div className="w-full mt-2">
      <div className="flex h-2 mb-1 overflow-hidden rounded">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-1/4 transition-colors duration-300 ease-in-out ${
              i < activeStrength ? strengthColors[activeStrength] : 'bg-gray-200'
            } ${i > 0 ? 'ml-1' : ''}`}
          ></div>
        ))}
      </div>
      {password && strengthLabels[activeStrength] && (
        <p className={`text-xs ${
          activeStrength === 0 ? 'text-red-500' :
          activeStrength === 1 ? 'text-orange-500' :
          activeStrength === 2 ? 'text-yellow-600' : // Darker yellow for better readability
          activeStrength === 3 ? 'text-lime-600' : // Darker lime for better readability
          'text-green-600' // Darker green
        }`}>
          Strength: {strengthLabels[activeStrength]}
        </p>
      )}
       {!password && (
        <p className="text-xs text-gray-400">Enter a password to see strength.</p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;