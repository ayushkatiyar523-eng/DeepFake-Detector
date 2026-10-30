import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageSelect, selectedImage, isAnalyzing }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    onImageSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`glass-panel rounded-2xl p-8 transition-all duration-300 ${
          isDragging ? "neon-glow scale-105" : ""
        } ${isAnalyzing ? "opacity-50 pointer-events-none" : ""}`}
      >
        {!preview ? (
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-glow-pulse">
              <Upload className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Drop your image here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse from your device
              </p>
            </div>
            <label htmlFor="file-upload">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"
                asChild
              >
                <span>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Browse File
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
                disabled={isAnalyzing}
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, WEBP formats
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-primary/20">
              <img
                src={preview}
                alt="Upload preview"
                className="w-full h-auto max-h-96 object-contain bg-muted/20"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                    <p className="text-sm font-medium text-foreground">
                      Analyzing authenticity
                      <span className="animate-pulse">...</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            {!isAnalyzing && (
              <label htmlFor="file-change">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-muted-foreground/30 hover:border-primary hover:text-primary transition-all"
                  asChild
                >
                  <span>Change Image</span>
                </Button>
                <input
                  id="file-change"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
