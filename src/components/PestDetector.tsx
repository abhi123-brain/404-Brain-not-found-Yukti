import { useState, useCallback } from "react";
import { Upload, Leaf, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { simulatePestDetection, type PestResult } from "@/data/crops";

interface PestDetectorProps {
  onResult: (result: PestResult) => void;
}

function analyzeImageColors(imageSrc: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) { resolve(true); return; }
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;
      let greenish = 0;
      let brownish = 0;
      let total = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        total++;
        // Green detection (leaves, crops)
        if (g > r && g > b && g > 50) greenish++;
        // Brown/yellow detection (soil, dry crops, grains)
        if (r > b && g > b && r > 60 && Math.abs(r - g) < 80) brownish++;
      }
      const greenRatio = greenish / total;
      const brownRatio = brownish / total;
      // Accept if enough green or brown/earthy tones (natural/crop image)
      resolve(greenRatio > 0.08 || brownRatio > 0.25);
    };
    img.onerror = () => resolve(true);
    img.src = imageSrc;
  });
}

export default function PestDetector({ onResult }: PestDetectorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<PestResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [imageValid, setImageValid] = useState<boolean | null>(null);
  const [validating, setValidating] = useState(false);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target?.result as string;
      setPreview(src);
      setResult(null);
      setImageValid(null);
      setValidating(true);
      const valid = await analyzeImageColors(src);
      setImageValid(valid);
      setValidating(false);
    };
    reader.readAsDataURL(file);
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

      {validating && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 animate-fade-in">
          <Leaf className="h-5 w-5 animate-pulse text-primary" />
          <span className="text-foreground">🔍 फोटो जाँची जा रही है...</span>
        </div>
      )}

      {imageValid === false && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3 animate-fade-in">
          <XCircle className="h-5 w-5 text-danger" />
          <span className="text-danger font-semibold">
            ❌ यह फसल/पत्ते की फोटो नहीं है! कृपया फसल या पत्ते की सही फोटो डालें।
          </span>
        </div>
      )}

      <Button
        onClick={analyze}
        disabled={!preview || analyzing || imageValid === false || validating}
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
