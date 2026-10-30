import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { ResultPanel } from "@/components/ResultPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ExternalLink, Shield, ChevronDown, RotateCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type ToolType = null | "deepfake" | "phishing";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<ToolType>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<number | null>(null);

  const analyzeImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("https://anonymousananta-atharv-image-detector.hf.space/predict", {
        method: "POST",
        body: formData
      });
      
      if (!res.ok) throw new Error("Analysis failed");
      
      const data = await res.json();
      return Number(data.result);
    } catch (error) {
      console.error("Analysis error:", error);
      throw error;
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeImage(selectedImage);
      setAnalysisResult(result);
      toast.success("Analysis complete");
    } catch (error) {
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setSelectedTool(null);
    toast.success("Ready for new analysis");
  };

  const handleToolSelect = (tool: ToolType) => {
    if (tool === "phishing") {
      window.open("https://phish-sentinel-ml.vercel.app/", "_blank");
    } else {
      setSelectedTool(tool);
    }
  };


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <ThemeToggle />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header - Always visible */}
        <header className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-primary neon-glow animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-secondary neon-text">
              Multi-Model AI Agent
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-primary font-semibold neon-text">
            Developed by Team ANANTA
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Analyze with intelligent detection models
          </p>
        </header>

        {/* Initial Landing View */}
        {!selectedTool && (
          <div className="space-y-16 animate-fade-in">
            {/* Tool Selection */}
            <div className="flex flex-col items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 gold-glow group px-8 py-6 text-lg"
                  >
                    <Shield className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Select Detection Tool
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 bg-card border-border z-50">
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-accent focus:bg-accent py-3"
                    onClick={() => handleToolSelect("deepfake")}
                  >
                    <Shield className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-base">Deepfake Detection</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-accent focus:bg-accent py-3"
                    onClick={() => handleToolSelect("phishing")}
                  >
                    <ExternalLink className="mr-2 h-5 w-5 text-secondary" />
                    <span className="text-base">Phishing Scanner</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <p className="text-sm text-muted-foreground max-w-lg text-center">
                Choose a tool to begin your analysis. Our AI ensures security and authenticity in digital media.
              </p>
            </div>

            {/* About Project Section */}
            <section className="glass-panel rounded-2xl p-8 md:p-12 animate-pulse-border max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                About Project
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  An initiative by <span className="text-primary font-semibold">Team ANANTA</span> focused on building trustworthy AI systems for digital security.
                </p>
                <p>
                  Our platform combines advanced deepfake detection and phishing URL analysis to protect users from misinformation and cyber threats.
                </p>
                <p>
                  Our goal is to create scalable, explainable, and user-friendly AI tools that enhance online safety and digital trust.
                </p>
              </div>
            </section>

          </div>
        )}

        {/* Deepfake Detection Tool */}
        {selectedTool === "deepfake" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Deepfake Detection
              </h2>
              <p className="text-muted-foreground">
                Upload an image to analyze its authenticity
              </p>
            </div>

            <ImageUpload
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
              isAnalyzing={isAnalyzing}
            />

            {selectedImage && !analysisResult && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-5 w-5" />
                      Run Deepfake Analysis
                    </>
                  )}
                </Button>
              </div>
            )}

            {analysisResult !== null && (
              <>
                <ResultPanel confidence={analysisResult} />
                <div className="flex justify-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <RotateCw className="mr-2 h-5 w-5" />
                    Analyze New Image
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTool(null)}
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                </div>
              </>
            )}

            {!analysisResult && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTool(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Home
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            © 2025 Team ANANTA | Multi-Modal AI Agent
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
