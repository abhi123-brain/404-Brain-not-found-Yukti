import { useState } from "react";
import { type CropRecommendation } from "@/data/crops";
import { Trophy, Star, Brain, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { WeatherData, PestResult, Crop } from "@/data/crops";

interface RecommendationPanelProps {
  recommendations: CropRecommendation[];
  weather?: WeatherData | null;
  pestResult?: PestResult | null;
  selectedCrop?: Crop | null;
}

export default function RecommendationPanel({
  recommendations,
  weather,
  pestResult,
  selectedCrop,
}: RecommendationPanelProps) {
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const { toast } = useToast();

  const fetchAiAdvice = async () => {
    setAiLoading(true);
    setAiAdvice(null);
    try {
      const { data, error } = await supabase.functions.invoke("crop-ai-recommendation", {
        body: {
          weather,
          pestResult,
          selectedCrop,
          recommendations: recommendations.slice(0, 5),
        },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "❌ AI त्रुटि", description: data.error, variant: "destructive" });
        return;
      }

      setAiAdvice(data.recommendation);
    } catch (e: any) {
      console.error("AI advice error:", e);
      toast({
        title: "❌ AI सलाह लेने में त्रुटि",
        description: e.message || "कृपया बाद में प्रयास करें",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Score-based recommendations */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
          <Trophy className="h-6 w-6 text-secondary" />
          🏆 AI सलाह — सबसे अच्छी फसल
        </h3>

        <div className="space-y-3">
          {recommendations.slice(0, 5).map((rec, i) => (
            <div
              key={rec.crop.id}
              className={`animate-fade-in rounded-lg border p-4 transition-all ${
                i === 0
                  ? "border-secondary/50 bg-secondary/10 shadow-farm"
                  : "border-border bg-card"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {i === 0 && <Star className="h-5 w-5 text-secondary" />}
                  <span className="text-2xl">{rec.crop.emoji}</span>
                  <div>
                    <span className="text-lg font-bold text-foreground">{rec.crop.crop_name_hindi}</span>
                    <span className="ml-2 text-sm text-muted-foreground">({rec.crop.crop_name})</span>
                  </div>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  स्कोर: {rec.score}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>₹{rec.crop.profit_per_acre.toLocaleString()}/एकड़</span>
                <span>•</span>
                <span>कीट: {rec.crop.pest_risk_hindi}</span>
                <span>•</span>
                <span>माँग: {rec.crop.demand_hindi}</span>
              </div>

              {rec.reasons.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {rec.reasons.map((reason, j) => (
                    <span key={j} className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">
                      {reason}
                    </span>
                  ))}
                </div>
              )}

              {i === 0 && (
                <p className="mt-2 text-sm font-medium text-primary">
                  ✅ यह फसल आपके लिए सबसे उपयुक्त है!
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Detailed Advice */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-card">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
          <Sparkles className="h-6 w-6 text-secondary" />
          🤖 कृषि मित्र AI — विस्तृत सलाह
        </h3>

        {!aiAdvice && !aiLoading && (
          <div className="text-center">
            <p className="mb-3 text-muted-foreground">
              AI से अपने मौसम, कीट जांच और फसल के अनुसार विस्तृत सलाह पाएं
            </p>
            <Button onClick={fetchAiAdvice} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Brain className="mr-2 h-5 w-5" />
              🧠 AI से विस्तृत सलाह लें
            </Button>
          </div>
        )}

        {aiLoading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            <p className="text-muted-foreground">🤖 कृषि मित्र AI सोच रहा है...</p>
          </div>
        )}

        {aiAdvice && (
          <div className="animate-fade-in">
            <div className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed text-foreground">
              {aiAdvice}
            </div>
            <div className="mt-3 text-center">
              <Button variant="outline" size="sm" onClick={fetchAiAdvice}>
                🔄 फिर से सलाह लें
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
