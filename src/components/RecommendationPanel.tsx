import { type CropRecommendation } from "@/data/crops";
import { Trophy, Star } from "lucide-react";

interface RecommendationPanelProps {
  recommendations: CropRecommendation[];
}

export default function RecommendationPanel({ recommendations }: RecommendationPanelProps) {
  if (recommendations.length === 0) return null;

  return (
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
  );
}
