import { useState } from "react";
import { Cloud, Droplets, Thermometer, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type WeatherData, getWeatherPestWarning } from "@/data/crops";

interface WeatherPanelProps {
  onWeatherUpdate: (data: WeatherData) => void;
}

// Simulated weather data for demo (no API key needed)
const DEMO_WEATHER: Record<string, WeatherData> = {
  "delhi": { temperature: 32, humidity: 65, description: "Haze", city: "Delhi", icon: "50d" },
  "mumbai": { temperature: 30, humidity: 82, description: "Cloudy", city: "Mumbai", icon: "04d" },
  "jaipur": { temperature: 35, humidity: 40, description: "Clear", city: "Jaipur", icon: "01d" },
  "lucknow": { temperature: 33, humidity: 70, description: "Partly Cloudy", city: "Lucknow", icon: "02d" },
  "bhopal": { temperature: 31, humidity: 58, description: "Clear", city: "Bhopal", icon: "01d" },
  "pune": { temperature: 28, humidity: 72, description: "Cloudy", city: "Pune", icon: "04d" },
  "nagpur": { temperature: 36, humidity: 45, description: "Clear", city: "Nagpur", icon: "01d" },
  "indore": { temperature: 30, humidity: 55, description: "Partly Cloudy", city: "Indore", icon: "02d" },
  "patna": { temperature: 34, humidity: 75, description: "Humid", city: "Patna", icon: "50d" },
  "chandigarh": { temperature: 29, humidity: 50, description: "Clear", city: "Chandigarh", icon: "01d" },
};

export default function WeatherPanel({ onWeatherUpdate }: WeatherPanelProps) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");

    setTimeout(() => {
      const key = city.trim().toLowerCase();
      const data = DEMO_WEATHER[key];
      if (data) {
        setWeather(data);
        onWeatherUpdate(data);
        setError("");
      } else {
        // Generate random realistic weather for any city
        const generated: WeatherData = {
          temperature: 25 + Math.round(Math.random() * 15),
          humidity: 40 + Math.round(Math.random() * 50),
          description: "Clear",
          city: city.trim(),
          icon: "01d",
        };
        setWeather(generated);
        onWeatherUpdate(generated);
      }
      setLoading(false);
    }, 800);
  };

  const pestWarning = weather ? getWeatherPestWarning(weather.temperature, weather.humidity) : null;

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
        <Cloud className="h-6 w-6 text-secondary" />
        🌤️ मौसम की जानकारी
      </h3>

      <div className="mb-4 flex gap-2">
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="शहर का नाम लिखें (जैसे: Delhi)"
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <Button onClick={fetchWeather} disabled={loading} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
          <Search className="mr-1 h-4 w-4" />
          {loading ? "..." : "खोजें"}
        </Button>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {["Delhi", "Mumbai", "Jaipur", "Lucknow", "Bhopal"].map((c) => (
          <button
            key={c}
            onClick={() => { setCity(c); }}
            className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {c}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      {weather && (
        <div className="animate-fade-in space-y-3">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <MapPin className="h-5 w-5 text-accent" />
            {weather.city}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <Thermometer className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">तापमान</p>
                <p className="text-xl font-bold text-foreground">{weather.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <Droplets className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">नमी</p>
                <p className="text-xl font-bold text-foreground">{weather.humidity}%</p>
              </div>
            </div>
          </div>

          {pestWarning && (
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm font-medium text-foreground">{pestWarning.warning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
