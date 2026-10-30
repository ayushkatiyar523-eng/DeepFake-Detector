export const AnimatedBackground = () => {
  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none animate-gradient" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.08),transparent_50%)] pointer-events-none" />
      
      {/* Floating orbs */}
      <div className="fixed top-20 left-[10%] w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="fixed bottom-20 right-[15%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-[60%] w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '4s' }} />
    </>
  );
};
