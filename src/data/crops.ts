export interface Crop {
  id: number;
  crop_name: string;
  crop_name_hindi: string;
  pest_risk: "Low" | "Medium" | "High";
  pest_risk_hindi: string;
  demand: "Low" | "Medium" | "High";
  demand_hindi: string;
  profit_per_acre: number;
  ideal_temp_min: number;
  ideal_temp_max: number;
  ideal_humidity_min: number;
  ideal_humidity_max: number;
  season: string;
  season_hindi: string;
  description_hindi: string;
  emoji: string;
}

export const crops: Crop[] = [
  {
    id: 1,
    crop_name: "Wheat",
    crop_name_hindi: "गेहूं",
    pest_risk: "Low",
    pest_risk_hindi: "कम",
    demand: "High",
    demand_hindi: "अधिक",
    profit_per_acre: 45000,
    ideal_temp_min: 10,
    ideal_temp_max: 25,
    ideal_humidity_min: 40,
    ideal_humidity_max: 60,
    season: "Rabi",
    season_hindi: "रबी",
    description_hindi: "गेहूं भारत की प्रमुख खाद्य फसल है। यह ठंडे मौसम में अच्छी होती है।",
    emoji: "🌾",
  },
  {
    id: 2,
    crop_name: "Rice",
    crop_name_hindi: "चावल",
    pest_risk: "Medium",
    pest_risk_hindi: "मध्यम",
    demand: "High",
    demand_hindi: "अधिक",
    profit_per_acre: 40000,
    ideal_temp_min: 20,
    ideal_temp_max: 35,
    ideal_humidity_min: 60,
    ideal_humidity_max: 90,
    season: "Kharif",
    season_hindi: "खरीफ",
    description_hindi: "चावल गर्म और नम मौसम में उगाया जाता है। यह भारत का मुख्य भोजन है।",
    emoji: "🍚",
  },
  {
    id: 3,
    crop_name: "Maize",
    crop_name_hindi: "मक्का",
    pest_risk: "Medium",
    pest_risk_hindi: "मध्यम",
    demand: "Medium",
    demand_hindi: "मध्यम",
    profit_per_acre: 35000,
    ideal_temp_min: 18,
    ideal_temp_max: 32,
    ideal_humidity_min: 50,
    ideal_humidity_max: 75,
    season: "Kharif",
    season_hindi: "खरीफ",
    description_hindi: "मक्का पशु चारे और खाद्य दोनों के लिए उगाई जाती है।",
    emoji: "🌽",
  },
  {
    id: 4,
    crop_name: "Cotton",
    crop_name_hindi: "कपास",
    pest_risk: "High",
    pest_risk_hindi: "अधिक",
    demand: "High",
    demand_hindi: "अधिक",
    profit_per_acre: 55000,
    ideal_temp_min: 25,
    ideal_temp_max: 40,
    ideal_humidity_min: 40,
    ideal_humidity_max: 65,
    season: "Kharif",
    season_hindi: "खरीफ",
    description_hindi: "कपास एक नकदी फसल है जो कपड़ा उद्योग के लिए महत्वपूर्ण है।",
    emoji: "🧶",
  },
  {
    id: 5,
    crop_name: "Soybean",
    crop_name_hindi: "सोयाबीन",
    pest_risk: "Low",
    pest_risk_hindi: "कम",
    demand: "Medium",
    demand_hindi: "मध्यम",
    profit_per_acre: 38000,
    ideal_temp_min: 20,
    ideal_temp_max: 30,
    ideal_humidity_min: 50,
    ideal_humidity_max: 70,
    season: "Kharif",
    season_hindi: "खरीफ",
    description_hindi: "सोयाबीन प्रोटीन से भरपूर तिलहनी फसल है।",
    emoji: "🫘",
  },
  {
    id: 6,
    crop_name: "Sugarcane",
    crop_name_hindi: "गन्ना",
    pest_risk: "Medium",
    pest_risk_hindi: "मध्यम",
    demand: "High",
    demand_hindi: "अधिक",
    profit_per_acre: 60000,
    ideal_temp_min: 20,
    ideal_temp_max: 38,
    ideal_humidity_min: 55,
    ideal_humidity_max: 85,
    season: "Annual",
    season_hindi: "वार्षिक",
    description_hindi: "गन्ना चीनी और गुड़ बनाने के लिए उगाया जाता है।",
    emoji: "🎋",
  },
  {
    id: 7,
    crop_name: "Mustard",
    crop_name_hindi: "सरसों",
    pest_risk: "Low",
    pest_risk_hindi: "कम",
    demand: "Medium",
    demand_hindi: "मध्यम",
    profit_per_acre: 42000,
    ideal_temp_min: 10,
    ideal_temp_max: 25,
    ideal_humidity_min: 30,
    ideal_humidity_max: 55,
    season: "Rabi",
    season_hindi: "रबी",
    description_hindi: "सरसों तेल निकालने के लिए प्रमुख फसल है।",
    emoji: "🌻",
  },
];

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  city: string;
  icon: string;
}

export interface PestResult {
  detected: boolean;
  confidence: number;
  risk_level: "Low" | "Medium" | "High";
  risk_hindi: string;
  message_hindi: string;
}

export function simulatePestDetection(hasImage: boolean): PestResult {
  if (!hasImage) {
    return {
      detected: false,
      confidence: 0,
      risk_level: "Low",
      risk_hindi: "कम",
      message_hindi: "कोई फोटो नहीं दी गई। कृपया पत्ते की फोटो अपलोड करें।",
    };
  }

  const random = Math.random();
  if (random < 0.35) {
    return {
      detected: true,
      confidence: 75 + Math.random() * 20,
      risk_level: "High",
      risk_hindi: "अधिक",
      message_hindi: "⚠️ कीट पाया गया! पत्तों पर कीट के निशान दिख रहे हैं। तुरंत कीटनाशक का छिड़काव करें।",
    };
  } else if (random < 0.65) {
    return {
      detected: true,
      confidence: 50 + Math.random() * 25,
      risk_level: "Medium",
      risk_hindi: "मध्यम",
      message_hindi: "⚡ हल्के कीट के लक्षण दिखे हैं। निगरानी बढ़ाएं और जरूरत पड़ने पर जैविक कीटनाशक का उपयोग करें।",
    };
  } else {
    return {
      detected: false,
      confidence: 85 + Math.random() * 15,
      risk_level: "Low",
      risk_hindi: "कम",
      message_hindi: "✅ पत्ता स्वस्थ है! कोई कीट नहीं पाया गया। फसल अच्छी स्थिति में है।",
    };
  }
}

export function getWeatherPestWarning(temp: number, humidity: number): { warning: string; riskMultiplier: number } {
  if (humidity > 75 && temp > 30) {
    return {
      warning: "🔴 अधिक तापमान और नमी! कीटों का खतरा बहुत ज्यादा है। फसल की निगरानी बढ़ाएं।",
      riskMultiplier: 1.5,
    };
  } else if (humidity > 60 && temp > 25) {
    return {
      warning: "🟡 मध्यम तापमान और नमी। कीट लगने की संभावना है। सतर्क रहें।",
      riskMultiplier: 1.2,
    };
  } else {
    return {
      warning: "🟢 मौसम अनुकूल है। कीट का खतरा कम है।",
      riskMultiplier: 1.0,
    };
  }
}

export interface CropRecommendation {
  crop: Crop;
  score: number;
  reasons: string[];
  weather_suitable: boolean;
}

export function getRecommendations(
  weather: WeatherData | null,
  pestResult: PestResult | null
): CropRecommendation[] {
  return crops
    .map((crop) => {
      let score = 0;
      const reasons: string[] = [];

      // Profit score (max 40)
      const profitScore = (crop.profit_per_acre / 60000) * 40;
      score += profitScore;
      if (crop.profit_per_acre >= 50000) reasons.push("💰 अधिक मुनाफा");

      // Demand score (max 25)
      if (crop.demand === "High") { score += 25; reasons.push("📈 बाज़ार में माँग ज्यादा"); }
      else if (crop.demand === "Medium") { score += 15; }
      else { score += 5; }

      // Pest risk (max 20, lower pest = higher score)
      if (crop.pest_risk === "Low") { score += 20; reasons.push("🛡️ कीट का खतरा कम"); }
      else if (crop.pest_risk === "Medium") { score += 10; }
      else { score += 3; }

      // Weather suitability (max 15)
      let weather_suitable = true;
      if (weather) {
        const tempOk = weather.temperature >= crop.ideal_temp_min && weather.temperature <= crop.ideal_temp_max;
        const humOk = weather.humidity >= crop.ideal_humidity_min && weather.humidity <= crop.ideal_humidity_max;
        if (tempOk && humOk) {
          score += 15;
          reasons.push("🌤️ मौसम अनुकूल");
        } else if (tempOk || humOk) {
          score += 8;
          weather_suitable = true;
        } else {
          score += 0;
          weather_suitable = false;
          reasons.push("❌ मौसम अनुकूल नहीं");
        }
      }

      // Pest detection penalty
      if (pestResult?.detected && pestResult.risk_level === "High") {
        if (crop.pest_risk === "High") score -= 10;
      }

      return { crop, score: Math.round(score), reasons, weather_suitable };
    })
    .sort((a, b) => b.score - a.score);
}
