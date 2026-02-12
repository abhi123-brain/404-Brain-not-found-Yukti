import { useState, useCallback } from "react";
import { Upload, Leaf, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulatePestDetection, type PestResult } from "@/data/crops";

interface PestDetectorProps {
  onResult: (result: PestResult) => void;
}

export default function PestDetector({ onResult }: PestDetectorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PestResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }, [handleFile]);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const r = simulatePestDetection(!!preview);
      setResult(r);
      onResult(r);
      setAnalyzing(false);
    }, 1500);
  };

  const riskColors = {
    Low: "text-success",
    Medium: "text-warning",
    High: "text-danger",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
        <Leaf className="h-6 w-6 text-primary" />
        🔬 पत्ते की जाँच (Pest Detection)
      </h3>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mb-4 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/30 bg-muted/50 p-6 transition-colors hover:border-primary/60"
        onClick={() => document.getElementById("leaf-upload")?.click()}
      >
        {preview ? (
          <img src={preview} alt="Leaf" className="max-h-[180px] rounded-lg object-contain" />
        ) : (
          <>
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-center text-lg font-medium text-muted-foreground">
              पत्ते की फोटो यहाँ डालें
            </p>
            <p className="text-sm text-muted-foreground">या क्लिक करके चुनें</p>
          </>
        )}
        <input
          id="leaf-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      <Button
        onClick={analyze}
        disabled={!preview || analyzing}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        {analyzing ? "🔍 जाँच हो रही है..." : "🔍 जाँच करें"}
      </Button>

      {result && (
        <div className={`mt-4 rounded-lg border p-4 animate-fade-in ${
          result.risk_level === "High" ? "border-danger/30 bg-danger/5" :
          result.risk_level === "Medium" ? "border-warning/30 bg-warning/5" :
          "border-success/30 bg-success/5"
        }`}>
          <div className="mb-2 flex items-center gap-2">
            {result.detected ? (
              <AlertTriangle className="h-5 w-5 text-danger" />
            ) : (
              <CheckCircle className="h-5 w-5 text-success" />
            )}
            <span className={`text-lg font-bold ${riskColors[result.risk_level]}`}>
              कीट जोखिम: {result.risk_hindi}
            </span>
          </div>
          <p className="text-foreground">{result.message_hindi}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            AI विश्वसनीयता: {result.confidence.toFixed(0)}%
          </p>
        </div>
      )}
    </div>
  );
}
