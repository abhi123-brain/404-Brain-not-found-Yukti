import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, ExternalLink, IndianRupee, Sprout, Droplets, Shield, Tractor } from "lucide-react";

interface Scheme {
  name_hindi: string;
  name_english: string;
  description: string;
  benefits: string;
  eligibility: string;
  icon: React.ReactNode;
  category: string;
  link: string;
}

const schemes: Scheme[] = [
  {
    name_hindi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    name_english: "PM Kisan Samman Nidhi",
    description: "हर साल ₹6,000 सीधे किसान के बैंक खाते में — 3 किस्तों में।",
    benefits: "₹6,000 प्रति वर्ष (₹2,000 × 3 किस्तें)",
    eligibility: "सभी छोटे और सीमांत किसान",
    icon: <IndianRupee className="h-6 w-6" />,
    category: "आर्थिक सहायता",
    link: "https://pmkisan.gov.in",
  },
  {
    name_hindi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    name_english: "PM Fasal Bima Yojana",
    description: "प्राकृतिक आपदा, कीट या बीमारी से फसल नुकसान पर बीमा कवर।",
    benefits: "खरीफ: 2% प्रीमियम, रबी: 1.5% प्रीमियम पर पूरा बीमा",
    eligibility: "सभी किसान (ऋणी और गैर-ऋणी दोनों)",
    icon: <Shield className="h-6 w-6" />,
    category: "फसल बीमा",
    link: "https://pmfby.gov.in",
  },
  {
    name_hindi: "किसान क्रेडिट कार्ड (KCC)",
    name_english: "Kisan Credit Card",
    description: "कम ब्याज दर पर खेती के लिए आसान लोन — ₹3 लाख तक 4% ब्याज।",
    benefits: "₹3 लाख तक लोन @ 4% ब्याज (समय पर भुगतान पर)",
    eligibility: "सभी किसान, मछुआरे, पशुपालक",
    icon: <Landmark className="h-6 w-6" />,
    category: "ऋण सुविधा",
    link: "https://www.pmjdy.gov.in",
  },
  {
    name_hindi: "प्रधानमंत्री कृषि सिंचाई योजना (PMKSY)",
    name_english: "PM Krishi Sinchayee Yojana",
    description: "\"हर खेत को पानी\" — ड्रिप और स्प्रिंकलर सिंचाई पर 55-75% सब्सिडी।",
    benefits: "सिंचाई उपकरणों पर 55% (सामान्य) से 75% (SC/ST) सब्सिडी",
    eligibility: "सभी किसान जिनके पास सिंचाई योग्य भूमि है",
    icon: <Droplets className="h-6 w-6" />,
    category: "सिंचाई",
    link: "https://pmksy.gov.in",
  },
  {
    name_hindi: "सॉइल हेल्थ कार्ड योजना",
    name_english: "Soil Health Card Scheme",
    description: "मिट्टी की जाँच करके फसल के अनुसार खाद की सही मात्रा बताई जाती है।",
    benefits: "मुफ्त मिट्टी जाँच और फसल अनुसार खाद सलाह",
    eligibility: "सभी किसान",
    icon: <Sprout className="h-6 w-6" />,
    category: "मिट्टी स्वास्थ्य",
    link: "https://soilhealth.dac.gov.in",
  },
  {
    name_hindi: "PM किसान मानधन योजना",
    name_english: "PM Kisan Maandhan Yojana",
    description: "60 साल की उम्र के बाद हर महीने ₹3,000 पेंशन — किसानों के लिए।",
    benefits: "₹3,000/महीना पेंशन (60 वर्ष के बाद)",
    eligibility: "18-40 वर्ष के छोटे और सीमांत किसान",
    icon: <Landmark className="h-6 w-6" />,
    category: "पेंशन",
    link: "https://maandhan.in",
  },
  {
    name_hindi: "ई-नाम (e-NAM)",
    name_english: "National Agriculture Market",
    description: "ऑनलाइन मंडी — किसान अपनी फसल देशभर में कहीं भी बेच सकते हैं।",
    benefits: "बेहतर कीमत, पारदर्शी नीलामी, सीधा भुगतान",
    eligibility: "सभी किसान",
    icon: <Tractor className="h-6 w-6" />,
    category: "बाज़ार",
    link: "https://enam.gov.in",
  },
];

export default function GovernmentSchemes() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Landmark className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          🏛️ सरकारी योजनाएँ — किसानों के लिए
        </h2>
      </div>
      <p className="text-muted-foreground">
        भारत सरकार की प्रमुख कृषि योजनाएँ जो हर किसान को जाननी चाहिए:
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, i) => (
          <Card
            key={i}
            className="group animate-fade-in border-border transition-shadow hover:shadow-lg"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {scheme.icon}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {scheme.category}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-snug text-foreground">
                {scheme.name_hindi}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{scheme.name_english}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-foreground">{scheme.description}</p>
              <div className="rounded-md bg-muted p-2">
                <p className="font-medium text-primary">💰 लाभ:</p>
                <p className="text-foreground">{scheme.benefits}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">👤 पात्रता:</p>
                <p className="text-foreground">{scheme.eligibility}</p>
              </div>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                अधिक जानकारी →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
