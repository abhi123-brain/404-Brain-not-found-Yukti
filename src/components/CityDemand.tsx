import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CityData {
  city_hindi: string;
  city_english: string;
  state_hindi: string;
  crops: {
    name_hindi: string;
    emoji: string;
    demand: "बहुत ज़्यादा" | "ज़्यादा" | "मध्यम";
    price_range: string;
    reason: string;
  }[];
}

const cityDemandData: CityData[] = [
  {
    city_hindi: "दिल्ली / NCR",
    city_english: "Delhi / NCR",
    state_hindi: "दिल्ली",
    crops: [
      { name_hindi: "गेहूं", emoji: "🌾", demand: "बहुत ज़्यादा", price_range: "₹2,200-2,800/क्विंटल", reason: "बड़ी आबादी, रोटी/ब्रेड की भारी माँग" },
      { name_hindi: "सब्ज़ियाँ", emoji: "🥬", demand: "बहुत ज़्यादा", price_range: "₹20-80/किलो", reason: "रोज़ाना हज़ारों टन सब्ज़ी की खपत" },
      { name_hindi: "सरसों", emoji: "🌻", demand: "ज़्यादा", price_range: "₹5,500-7,000/क्विंटल", reason: "सरसों का तेल उत्तर भारत में सबसे ज़्यादा इस्तेमाल" },
    ],
  },
  {
    city_hindi: "मुंबई",
    city_english: "Mumbai",
    state_hindi: "महाराष्ट्र",
    crops: [
      { name_hindi: "चावल", emoji: "🍚", demand: "बहुत ज़्यादा", price_range: "₹2,500-4,000/क्विंटल", reason: "मुंबई में चावल मुख्य भोजन" },
      { name_hindi: "गन्ना", emoji: "🎋", demand: "ज़्यादा", price_range: "₹350-400/क्विंटल", reason: "चीनी मिलों की माँग, जूस की दुकानें" },
      { name_hindi: "कपास", emoji: "🏵️", demand: "बहुत ज़्यादा", price_range: "₹6,500-8,000/क्विंटल", reason: "टेक्सटाइल उद्योग का केंद्र" },
    ],
  },
  {
    city_hindi: "लखनऊ",
    city_english: "Lucknow",
    state_hindi: "उत्तर प्रदेश",
    crops: [
      { name_hindi: "गेहूं", emoji: "🌾", demand: "बहुत ज़्यादा", price_range: "₹2,100-2,600/क्विंटल", reason: "UP सबसे बड़ा गेहूं उत्पादक राज्य" },
      { name_hindi: "धान", emoji: "🍚", demand: "ज़्यादा", price_range: "₹2,000-3,000/क्विंटल", reason: "पूर्वी UP में चावल मुख्य भोजन" },
      { name_hindi: "आलू", emoji: "🥔", demand: "बहुत ज़्यादा", price_range: "₹800-1,500/क्विंटल", reason: "UP सबसे बड़ा आलू उत्पादक" },
    ],
  },
  {
    city_hindi: "जयपुर",
    city_english: "Jaipur",
    state_hindi: "राजस्थान",
    crops: [
      { name_hindi: "सरसों", emoji: "🌻", demand: "बहुत ज़्यादा", price_range: "₹5,000-7,500/क्विंटल", reason: "राजस्थान #1 सरसों उत्पादक" },
      { name_hindi: "बाजरा", emoji: "🌿", demand: "ज़्यादा", price_range: "₹2,200-2,800/क्विंटल", reason: "मिलेट मिशन से माँग बढ़ी" },
      { name_hindi: "मूंगफली", emoji: "🥜", demand: "मध्यम", price_range: "₹5,500-6,500/क्विंटल", reason: "तेल और नमकीन उद्योग" },
    ],
  },
  {
    city_hindi: "इंदौर",
    city_english: "Indore",
    state_hindi: "मध्य प्रदेश",
    crops: [
      { name_hindi: "सोयाबीन", emoji: "🫘", demand: "बहुत ज़्यादा", price_range: "₹4,500-6,000/क्विंटल", reason: "इंदौर = सोयाबीन की राजधानी" },
      { name_hindi: "गेहूं", emoji: "🌾", demand: "ज़्यादा", price_range: "₹2,200-2,700/क्विंटल", reason: "MP दूसरा बड़ा गेहूं उत्पादक" },
      { name_hindi: "चना", emoji: "🟤", demand: "ज़्यादा", price_range: "₹4,800-5,500/क्विंटल", reason: "MP सबसे बड़ा चना उत्पादक" },
    ],
  },
  {
    city_hindi: "नागपुर",
    city_english: "Nagpur",
    state_hindi: "महाराष्ट्र",
    crops: [
      { name_hindi: "संतरा", emoji: "🍊", demand: "बहुत ज़्यादा", price_range: "₹30-80/किलो", reason: "नागपुर = संतरों का शहर" },
      { name_hindi: "कपास", emoji: "🏵️", demand: "ज़्यादा", price_range: "₹6,000-7,500/क्विंटल", reason: "विदर्भ कपास बेल्ट" },
      { name_hindi: "सोयाबीन", emoji: "🫘", demand: "मध्यम", price_range: "₹4,000-5,500/क्विंटल", reason: "तेल मिलों की माँग" },
    ],
  },
  {
    city_hindi: "पटना",
    city_english: "Patna",
    state_hindi: "बिहार",
    crops: [
      { name_hindi: "धान", emoji: "🍚", demand: "बहुत ज़्यादा", price_range: "₹2,000-2,800/क्विंटल", reason: "बिहार में चावल मुख्य भोजन" },
      { name_hindi: "मक्का", emoji: "🌽", demand: "ज़्यादा", price_range: "₹1,800-2,200/क्विंटल", reason: "पशु आहार और स्टार्च उद्योग" },
      { name_hindi: "लीची", emoji: "🍒", demand: "बहुत ज़्यादा", price_range: "₹50-150/किलो", reason: "मुजफ्फरपुर लीची विश्व प्रसिद्ध" },
    ],
  },
  {
    city_hindi: "अमृतसर",
    city_english: "Amritsar",
    state_hindi: "पंजाब",
    crops: [
      { name_hindi: "गेहूं", emoji: "🌾", demand: "बहुत ज़्यादा", price_range: "₹2,275/क्विंटल (MSP)", reason: "पंजाब = भारत का अन्न भंडार" },
      { name_hindi: "धान", emoji: "🍚", demand: "बहुत ज़्यादा", price_range: "₹2,203/क्विंटल (MSP)", reason: "बासमती की भारी निर्यात माँग" },
      { name_hindi: "आलू", emoji: "🥔", demand: "ज़्यादा", price_range: "₹1,000-1,800/क्विंटल", reason: "कोल्ड स्टोरेज और निर्यात" },
    ],
  },
];

const demandColor = (d: string) => {
  if (d === "बहुत ज़्यादा") return "bg-primary/15 text-primary border-primary/30";
  if (d === "ज़्यादा") return "bg-secondary/15 text-secondary-foreground border-secondary/30";
  return "bg-muted text-muted-foreground border-border";
};

export default function CityDemand() {
  const [search, setSearch] = useState("");

  const filtered = cityDemandData.filter(
    (c) =>
      c.city_hindi.includes(search) ||
      c.city_english.toLowerCase().includes(search.toLowerCase()) ||
      c.crops.some((cr) => cr.name_hindi.includes(search))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          📊 शहर-वार फसल माँग
        </h2>
      </div>
      <p className="text-muted-foreground">
        जानिए किस शहर में कौन-सी फसल की सबसे ज़्यादा माँग है और बेहतर दाम मिलेगा:
      </p>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="🔍 शहर या फसल खोजें..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((city, i) => (
          <Card
            key={i}
            className="animate-fade-in border-border transition-shadow hover:shadow-lg"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-foreground">
                  {city.city_hindi}
                </CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">
                {city.city_english} • {city.state_hindi}
              </p>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {city.crops.map((crop, j) => (
                <div
                  key={j}
                  className="rounded-md border border-border bg-muted/30 p-2.5 text-sm"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      {crop.emoji} {crop.name_hindi}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${demandColor(crop.demand)}`}
                    >
                      <ArrowUpRight className="mr-0.5 h-3 w-3" />
                      {crop.demand}
                    </Badge>
                  </div>
                  <p className="font-medium text-primary">{crop.price_range}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {crop.reason}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-border bg-muted p-8 text-center">
          <p className="text-lg text-muted-foreground">
            🔍 "{search}" से कोई शहर या फसल नहीं मिली
          </p>
        </div>
      )}
    </div>
  );
}
