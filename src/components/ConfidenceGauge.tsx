import { useEffect, useState } from "react";

interface ConfidenceGaugeProps {
  confidence: number;
}

export const ConfidenceGauge = ({ confidence }: ConfidenceGaugeProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(confidence);
    }, 100);
    return () => clearTimeout(timer);
  }, [confidence]);

  const percentage = displayValue * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayValue * circumference);

  const getColor = () => {
    if (confidence >= 0.75) return "hsl(var(--destructive))";
    if (confidence >= 0.5) return "hsl(var(--secondary))";
    return "hsl(var(--primary))";
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          opacity="0.2"
        />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${getColor()})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">
          {Math.round(percentage)}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">Confidence</span>
      </div>
    </div>
  );
};
