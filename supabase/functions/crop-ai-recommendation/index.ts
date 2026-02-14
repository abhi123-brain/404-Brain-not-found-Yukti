import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { weather, pestResult, selectedCrop, recommendations } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const contextParts: string[] = [];

    if (weather) {
      contextParts.push(`मौसम: ${weather.city} में तापमान ${weather.temperature}°C, नमी ${weather.humidity}%, स्थिति: ${weather.description}`);
    }

    if (pestResult) {
      contextParts.push(`कीट जांच: ${pestResult.detected ? "कीट पाया गया" : "कोई कीट नहीं"}, जोखिम: ${pestResult.risk_hindi}, विश्वास: ${Math.round(pestResult.confidence)}%`);
    }

    if (selectedCrop) {
      contextParts.push(`चयनित फसल: ${selectedCrop.crop_name_hindi} (${selectedCrop.crop_name}), मौसम: ${selectedCrop.season_hindi}, लाभ: ₹${selectedCrop.profit_per_acre}/एकड़`);
    }

    if (recommendations && recommendations.length > 0) {
      const top3 = recommendations.slice(0, 3).map((r: any) =>
        `${r.crop.crop_name_hindi} (स्कोर: ${r.score}, लाभ: ₹${r.crop.profit_per_acre}/एकड़)`
      ).join(", ");
      contextParts.push(`शीर्ष 3 फसलें: ${top3}`);
    }

    const userPrompt = contextParts.length > 0
      ? `किसान का डेटा:\n${contextParts.join("\n")}\n\nइस डेटा के आधार पर किसान को विस्तृत AI सलाह दें।`
      : "एक भारतीय किसान को सामान्य कृषि सलाह दें। कौन सी फसल अभी बोना अच्छा रहेगा?";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `तुम एक अनुभवी कृषि विशेषज्ञ AI हो। तुम्हारा नाम "कृषि मित्र AI" है। तुम भारतीय किसानों को हिंदी में सलाह देते हो।

नियम:
- हमेशा हिंदी में जवाब दो
- व्यावहारिक और कार्रवाई योग्य सलाह दो
- मौसम, कीट, और बाजार की माँग के अनुसार सलाह दो
- फसल बोने का सही समय, खाद, सिंचाई की जानकारी दो
- जवाब 300 शब्दों से कम रखो
- इमोजी का उपयोग करो ताकि पढ़ने में आसानी हो
- अगर कीट का खतरा है तो उसका समाधान भी बताओ`
          },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "बहुत ज्यादा अनुरोध। कृपया कुछ देर बाद प्रयास करें।" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI क्रेडिट समाप्त। कृपया क्रेडिट जोड़ें।" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(JSON.stringify({ error: "AI सेवा में त्रुटि हुई।" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "कोई सलाह उपलब्ध नहीं है।";

    return new Response(JSON.stringify({ recommendation: aiMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("crop-ai-recommendation error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
