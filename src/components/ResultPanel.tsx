interface ResultPanelProps {
  confidence: number;
}

export const ResultPanel = ({ confidence }: ResultPanelProps) => {
  const isReal = confidence < 0.5;
  const displayConfidence = isReal ? (1 - confidence) : confidence;
  const percentage = Math.round(95 + ((displayConfidence - 0.5) / 0.5) * 5);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-scale-in">
      <div 
        className={`glass-panel rounded-2xl p-12 text-center space-y-6 ${
          isReal 
            ? 'border-[hsl(var(--real-glow))] shadow-[0_0_40px_rgba(255,77,109,0.3)]' 
            : 'border-[hsl(var(--fake-glow))] shadow-[0_0_40px_rgba(0,255,179,0.3)] animate-pulse'
        }`}
        style={{
          background: isReal 
            ? 'rgba(255,77,109,0.3)' 
            : 'rgba(0,255,179,0.3)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="space-y-4">
          <h2 
            className={`text-6xl font-bold`}
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              color: isReal ? '#ff4d6d' : '#00ffb3', // 👈 color of text changes here
              textShadow: isReal 
                ? '0 0 20px rgba(255,77,109,0.5)' 
                : '0 0 20px rgba(0,255,179,0.5)',
            }}
          >
            {isReal ? '❌ FAKE' : '✅ REAL'}
          </h2>
          
          <p 
            className="text-lg text-muted-foreground animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Confidence: {percentage}%
          </p>
        </div>
      </div>
    </div>
  );
};
