import { type Crop } from "@/data/crops";

interface CropSelectorProps {
  crops: Crop[];
  selected: Crop | null;
  onSelect: (crop: Crop) => void;
}

export default function CropSelector({ crops, selected, onSelect }: CropSelectorProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 text-xl font-bold text-foreground">
        🌾 फसल चुनें (Select Crop)
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {crops.map((crop) => (
          <button
            key={crop.id}
            onClick={() => onSelect(crop)}
            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all hover:scale-105 ${
              selected?.id === crop.id
                ? "border-primary bg-primary/10 shadow-farm"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <span className="text-3xl">{crop.emoji}</span>
            <span className="text-lg font-bold text-foreground">{crop.crop_name_hindi}</span>
            <span className="text-sm text-muted-foreground">{crop.crop_name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
