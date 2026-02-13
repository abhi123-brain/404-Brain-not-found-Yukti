import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Landmark, IndianRupee, Phone, Globe, CheckCircle2 } from "lucide-react";

interface LoanSource {
  bank_hindi: string;
  bank_english: string;
  loan_limit: string;
  interest_rate: string;
  repayment: string;
  features: string[];
  helpline: string;
  website: string;
  type: string;
}

const loanSources: LoanSource[] = [
  {
    bank_hindi: "किसान क्रेडिट कार्ड (KCC)",
    bank_english: "Kisan Credit Card — All Banks",
    loan_limit: "₹1.6 लाख तक बिना गारंटी",
    interest_rate: "4% (सब्सिडी के बाद)",
    repayment: "फसल कटने के बाद — 12 महीने तक",
    features: [
      "कोई गारंटी नहीं चाहिए (₹1.6 लाख तक)",
      "ATM कार्ड से कभी भी पैसे निकालें",
      "फसल बीमा भी साथ में मिलता है",
      "सभी सरकारी और प्राइवेट बैंकों में उपलब्ध",
    ],
    helpline: "1800-180-1551",
    website: "https://www.nabard.org",
    type: "सरकारी योजना",
  },
  {
    bank_hindi: "SBI किसान लोन",
    bank_english: "State Bank of India — Kisan Loan",
    loan_limit: "₹3 लाख तक बिना गारंटी",
    interest_rate: "7% (सब्सिडी से 4% हो सकता है)",
    repayment: "5 साल तक",
    features: [
      "₹3 लाख तक बिना कोलैटरल",
      "खेती उपकरण खरीदने के लिए भी लोन",
      "ब्याज में 3% सब्सिडी (समय पर भुगतान पर)",
      "नजदीकी SBI शाखा में आवेदन करें",
    ],
    helpline: "1800-11-2211",
    website: "https://sbi.co.in",
    type: "सरकारी बैंक",
  },
  {
    bank_hindi: "NABARD — माइक्रो फाइनेंस",
    bank_english: "NABARD Micro Finance for Farmers",
    loan_limit: "₹50,000 — ₹5 लाख",
    interest_rate: "6-9%",
    repayment: "3-5 साल",
    features: [
      "स्वयं सहायता समूह (SHG) के माध्यम से लोन",
      "महिला किसानों को प्राथमिकता",
      "बिना किसी ज़मीन गिरवी के",
      "ग्रामीण बैंक और सहकारी बैंक से मिलता है",
    ],
    helpline: "1800-425-1556",
    website: "https://www.nabard.org",
    type: "विकास बैंक",
  },
  {
    bank_hindi: "PM-SYM / MUDRA लोन",
    bank_english: "Pradhan Mantri MUDRA Yojana",
    loan_limit: "₹10 लाख तक (शिशु: ₹50K, किशोर: ₹5L, तरुण: ₹10L)",
    interest_rate: "7-12% (बैंक पर निर्भर)",
    repayment: "5-7 साल",
    features: [
      "कोई गारंटी नहीं, कोई प्रोसेसिंग फीस नहीं",
      "कृषि व्यवसाय शुरू करने के लिए",
      "डेयरी, मछली पालन, मुर्गी पालन के लिए भी",
      "सभी बैंकों और NBFCs में उपलब्ध",
    ],
    helpline: "1800-180-1111",
    website: "https://www.mudra.org.in",
    type: "सरकारी योजना",
  },
  {
    bank_hindi: "पंजाब नेशनल बैंक — किसान तत्काल",
    bank_english: "PNB Kisan Tatkal Scheme",
    loan_limit: "₹1 लाख तक तुरंत",
    interest_rate: "7% (सब्सिडी उपलब्ध)",
    repayment: "12 महीने",
    features: [
      "सिर्फ आधार और किसान कार्ड से लोन",
      "24 घंटे में मंज़ूरी",
      "कोई ज़मीन गिरवी नहीं",
      "नजदीकी PNB शाखा में जाएं",
    ],
    helpline: "1800-180-2222",
    website: "https://www.pnbindia.in",
    type: "सरकारी बैंक",
  },
];

export default function CollateralFreeLoans() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Landmark className="h-8 w-8 text-primary" />
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          🏦 बिना गारंटी लोन — किसानों के लिए
        </h2>
      </div>
      <p className="text-muted-foreground">
        ये बैंक और योजनाएँ किसानों को बिना कोलैटरल (गारंटी) के लोन देती हैं:
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loanSources.map((source, i) => (
          <Card
            key={i}
            className="group animate-fade-in border-border transition-shadow hover:shadow-lg"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-center justify-between">
                <IndianRupee className="h-6 w-6 text-primary" />
                <Badge variant="outline" className="text-xs">
                  {source.type}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-snug text-foreground">
                {source.bank_hindi}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{source.bank_english}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="rounded-md bg-primary/5 p-2.5 space-y-1">
                <p><span className="font-semibold text-primary">💰 लोन राशि:</span> <span className="text-foreground">{source.loan_limit}</span></p>
                <p><span className="font-semibold text-primary">📊 ब्याज दर:</span> <span className="text-foreground">{source.interest_rate}</span></p>
                <p><span className="font-semibold text-primary">📅 भुगतान:</span> <span className="text-foreground">{source.repayment}</span></p>
              </div>

              <div className="space-y-1.5">
                <p className="font-medium text-muted-foreground">✅ विशेषताएँ:</p>
                {source.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1 text-xs">
                <a href={`tel:${source.helpline}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                  <Phone className="h-3 w-3" /> {source.helpline}
                </a>
                <a href={source.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
                  <Globe className="h-3 w-3" /> वेबसाइट →
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
