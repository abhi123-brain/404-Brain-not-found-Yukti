import { useState } from "react";
import heroFarm from "@/assets/hero-farm.jpg";
import { crops, getRecommendations, type WeatherData, type PestResult } from "@/data/crops";
import CropSelector from "@/components/CropSelector";
import CropDetails from "@/components/CropDetails";
import WeatherPanel from "@/components/WeatherPanel";
import PestDetector from "@/components/PestDetector";
import RecommendationPanel from "@/components/RecommendationPanel";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import CollateralFreeLoans from "@/components/CollateralFreeLoans";
import CityDemand from "@/components/CityDemand";
import { Button } from "@/components/ui/button";
import { Sprout, Brain, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Crop } from "@/data/crops";

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [pestResult, setPestResult] = useState<PestResult | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const { signOut } = useAuth();

  const recommendations = getRecommendations(weather, pestResult);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[340px] w-full overflow-hidden md:h-[420px]">
        <img src={heroFarm} alt="Indian farm" className="h-full w-full object-cover" />
        <div className="absolute right-4 top-4 z-10">
          <Button variant="secondary" size="sm" onClick={signOut}>
            <LogOut className="mr-1 h-4 w-4" /> लॉगआउट
          </Button>
        </div>
        <div className="absolute inset-0 gradient-hero opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 flex items-center gap-2">
            <Sprout className="h-10 w-10 text-primary-foreground" />
            <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">
              🌾 स्मार्ट कृषि AI
            </h1>
          </div>
          <p className="mb-1 text-xl font-medium text-primary-foreground/90 md:text-2xl">
            Smart Agriculture AI System
          </p>
          <p className="max-w-xl text-lg text-primary-foreground/80">
            किसानों के लिए AI-आधारित फसल सलाह, कीट पहचान, और मौसम विश्लेषण
          </p>
          <div className="mt-5">
            <Button
              size="lg"
              onClick={() => document.getElementById("main-content")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg"
            >
              🚜 शुरू करें
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="mx-auto max-w-6xl space-y-6 p-4 md:p-8">
        {/* Crop Selector */}
        <CropSelector crops={crops} selected={selectedCrop} onSelect={setSelectedCrop} />

        {/* Crop Details */}
        {selectedCrop && <CropDetails crop={selectedCrop} />}

        {/* Two columns: Weather + Pest Detection */}
        <div className="grid gap-6 md:grid-cols-2">
          <WeatherPanel onWeatherUpdate={setWeather} />
          <PestDetector onResult={setPestResult} />
        </div>

        {/* Get AI Recommendation */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => setShowRecommendations(true)}
            className="animate-pulse-glow bg-primary px-8 py-6 text-lg text-primary-foreground hover:bg-primary/90"
          >
            <Brain className="mr-2 h-6 w-6" />
            🤖 AI सलाह लें — सबसे अच्छी फसल जानें
          </Button>
        </div>

        {/* Recommendations */}
        {showRecommendations && (
          <RecommendationPanel
            recommendations={recommendations}
            weather={weather}
            pestResult={pestResult}
            selectedCrop={selectedCrop}
          />
        )}

        {/* Government Schemes */}
        <GovernmentSchemes />

        {/* Collateral-Free Loans */}
        <CollateralFreeLoans />

        {/* City-wise Crop Demand */}
        <CityDemand />
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-border bg-muted p-6 text-center">
        <p className="text-muted-foreground">
          🌾 स्मार्ट कृषि AI — किसानों की सेवा में | Smart Agriculture AI System
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Built with ❤️ for Indian Farmers | Hackathon Project
        </p>
      </footer>
    </div>
  );
};

export default Index;
