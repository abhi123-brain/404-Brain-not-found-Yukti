import { type Crop } from "@/data/crops";
import { IndianRupee, Bug, TrendingUp, Calendar } from "lucide-react";

interface CropDetailsProps {
  crop: Crop;
}

export default function CropDetails({ crop }: CropDetailsProps) {
  const riskColor = crop.pest_risk === "Low" ? "text-success" : crop.pest_risk === "Medium" ? "text-warning" : "text-danger";

  return (
    <div className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl">{crop.emoji}</span>
        <div>
          <h3 className="text-2xl font-bold text-foreground">{crop.crop_name_hindi}</h3>
          <p className="text-muted-foreground">{crop.crop_name}</p>
        </div>
      </div>

      <p className="mb-4 text-foreground">{crop.description_hindi}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IndianRupee className="h-4 w-4" /> अनुमानित लाभ
          </div>
          <p className="text-xl font-bold text-foreground">₹{crop.profit_per_acre.toLocaleString()}/एकड़</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bug className="h-4 w-4" /> कीट जोखिम
          </div>
          <p className={`text-xl font-bold ${riskColor}`}>{crop.pest_risk_hindi}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" /> बाज़ार माँग
          </div>
          <p className="text-xl font-bold text-foreground">{crop.demand_hindi}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" /> मौसम
          </div>
          <p className="text-xl font-bold text-foreground">{crop.season_hindi}</p>
        </div>
      </div>
    </div>
  );
}
