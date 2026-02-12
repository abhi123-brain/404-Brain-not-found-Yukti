import { FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  { title: "1. Problem Statement", content: "Indian farmers face significant challenges in crop selection, pest management, and market analysis. Over 50% of crop losses occur due to poor decision-making, lack of weather information, and delayed pest detection. Small-scale farmers in India lose ₹90,000 crore annually due to pest attacks alone." },
  { title: "2. Existing Issues in Farming", content: "• No real-time pest detection system available to small farmers\n• Weather data not integrated with farming decisions\n• Market demand information not accessible in rural areas\n• Language barrier — most agri-tech apps are in English\n• Farmers rely on traditional methods, missing profitable opportunities" },
  { title: "3. Proposed Solution", content: "Smart Agriculture AI System — a farmer-friendly platform in Hindi that combines:\n• AI-powered pest detection from leaf images\n• Real-time weather integration for risk assessment\n• Market demand analysis for profit maximization\n• Intelligent crop recommendation engine\n• Simple UI designed for rural users" },
  { title: "4. System Architecture", content: "Frontend (React) ↔ AI Engine (JavaScript ML Simulation) ↔ Weather API\n                         ↕\n              Crop Database (7 major Indian crops)\n                         ↕\n            Recommendation Engine (Scoring Algorithm)\n\nComponents: CropSelector → WeatherPanel → PestDetector → AI Decision → Recommendation" },
  { title: "5. Database Design", content: "Table: crops\n• id (PRIMARY KEY)\n• crop_name, crop_name_hindi\n• pest_risk (Low/Medium/High)\n• demand (Low/Medium/High)\n• profit_per_acre (₹)\n• ideal_temp_min, ideal_temp_max\n• ideal_humidity_min, ideal_humidity_max\n• season (Rabi/Kharif/Annual)\n\n7 crops: Wheat, Rice, Maize, Cotton, Soybean, Sugarcane, Mustard" },
  { title: "6. AI & ML Usage", content: "• Pest Detection: CNN-based image classification (simulated for demo)\n  - Input: Leaf photograph\n  - Output: Healthy / Pest Detected with confidence %\n  - Risk mapping: Low / Medium / High\n\n• Recommendation Engine: Multi-factor scoring algorithm\n  - Profit weight: 40%\n  - Market demand: 25%\n  - Pest risk (inverse): 20%\n  - Weather suitability: 15%\n\nModel can be improved with real training data from ICAR datasets." },
  { title: "7. Weather Integration", content: "• Real-time weather data for Indian cities\n• Key parameters: Temperature (°C) and Humidity (%)\n• Logic:\n  - High humidity (>75%) + High temp (>30°C) → 🔴 High pest risk\n  - Moderate conditions → 🟡 Medium risk\n  - Low humidity + moderate temp → 🟢 Low risk\n• Weather warnings displayed in Hindi for farmer understanding" },
  { title: "8. Live Demo Flow", content: "Step 1: किसान फसल चुनता है (Farmer selects crop)\nStep 2: शहर का मौसम देखें (Check city weather)\nStep 3: पत्ते की फोटो अपलोड करें (Upload leaf photo)\nStep 4: AI जाँच करता है (AI analyzes pest risk)\nStep 5: सबसे अच्छी फसल की सलाह (Best crop recommendation)\n\nAll interactions in Hindi — no technical knowledge needed!" },
  { title: "9. Benefits to Farmers", content: "• 📈 Profit increase: Up to 30% by choosing optimal crops\n• 🛡️ Reduced crop loss: Early pest detection saves harvest\n• 🌤️ Weather-aware decisions: Plan planting around conditions\n• 🗣️ Hindi interface: No language barrier for rural farmers\n• 💰 Free to use: No subscription, runs on any device\n• 📱 Mobile-friendly: Works on basic smartphones" },
  { title: "10. Future Scope", content: "• Real CNN model trained on PlantVillage dataset (50,000+ images)\n• Integration with government MSP (Minimum Support Price) data\n• Soil testing input for more accurate recommendations\n• Regional language support (Tamil, Telugu, Bengali, etc.)\n• SMS/WhatsApp integration for farmers without internet\n• Drone-based field scanning for large-scale pest detection\n• Integration with Kisan Credit Card for financial planning" },
];

const vivaQA = [
  { q: "Why this problem?", a: "Agriculture employs 58% of India's population, yet farmers lose crores annually due to wrong crop choices and pest attacks. This directly impacts food security and rural poverty.", ah: "भारत के 58% लोग खेती पर निर्भर हैं, लेकिन गलत फसल और कीट से हर साल करोड़ों का नुकसान होता है।" },
  { q: "Why AI?", a: "AI can process multiple factors (weather, pest risk, market demand, profit) simultaneously and give data-driven recommendations that humans cannot compute manually in real-time.", ah: "AI एक साथ कई बातें सोच सकता है — मौसम, कीट, बाज़ार, मुनाफा — और सही सलाह दे सकता है।" },
  { q: "Why database?", a: "Database stores validated crop data including profit estimates, pest history, and weather requirements. This structured data enables the AI scoring algorithm to make accurate comparisons.", ah: "डेटाबेस में सभी फसलों की सही जानकारी रहती है जिससे AI सही तुलना कर सके।" },
  { q: "How ML works here?", a: "We use image classification on leaf photos to detect pest symptoms. The model identifies visual patterns (discoloration, spots, holes) and classifies as Healthy or Pest-Detected with a confidence score.", ah: "पत्ते की फोटो से ML कीट के निशान पहचानता है — रंग बदलना, धब्बे, छेद — और बताता है कीट है या नहीं।" },
  { q: "How weather affects pests?", a: "High humidity (>75%) combined with high temperature (>30°C) creates ideal breeding conditions for most agricultural pests. Our system uses this correlation to calculate dynamic risk levels.", ah: "ज्यादा नमी और गर्मी में कीट तेज़ी से बढ़ते हैं। हमारा सिस्टम इसी आधार पर खतरे की चेतावनी देता है।" },
  { q: "How farmers benefit?", a: "They get personalized crop recommendations in Hindi, early pest warnings, weather-aware advice, and profit-maximizing suggestions — all for free on any basic smartphone.", ah: "किसान को हिंदी में अपनी फसल की सलाह, कीट की चेतावनी, मौसम की जानकारी और ज्यादा मुनाफे का रास्ता मिलता है।" },
];

interface PPTVivaPageProps {
  onBack: () => void;
}

export default function PPTVivaPage({ onBack }: PPTVivaPageProps) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <Button onClick={onBack} variant="outline" className="mb-6">
          ← वापस जाएं (Back)
        </Button>

        {/* PPT Content */}
        <div className="mb-12">
          <h2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-foreground">
            <FileText className="h-8 w-8 text-primary" />
            📊 PPT Slides Content
          </h2>
          <div className="space-y-4">
            {slides.map((slide, i) => (
              <div key={i} className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-card" style={{ animationDelay: `${i * 50}ms` }}>
                <h3 className="mb-3 text-xl font-bold text-primary">{slide.title}</h3>
                <pre className="whitespace-pre-wrap font-hindi text-foreground">{slide.content}</pre>
              </div>
            ))}
          </div>
        </div>

        {/* Viva Script */}
        <div>
          <h2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-foreground">
            <MessageCircle className="h-8 w-8 text-secondary" />
            🎤 Viva / Judges Script
          </h2>
          <div className="space-y-4">
            {vivaQA.map((item, i) => (
              <div key={i} className="animate-fade-in rounded-lg border border-border bg-card p-6 shadow-card" style={{ animationDelay: `${i * 50}ms` }}>
                <h4 className="mb-2 text-lg font-bold text-accent">Q: {item.q}</h4>
                <p className="mb-2 text-foreground"><strong>English:</strong> {item.a}</p>
                <p className="text-muted-foreground"><strong>Hindi:</strong> {item.ah}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
