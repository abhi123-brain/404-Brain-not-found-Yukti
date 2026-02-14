import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, LogIn, UserPlus, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast({ title: "कृपया सभी फ़ील्ड भरें", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "✅ सफलतापूर्वक लॉगिन हुआ!" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({
          title: "✅ खाता बनाया गया!",
          description: "कृपया अपना ईमेल चेक करें और लिंक पर क्लिक करके verify करें।",
        });
      }
    } catch (error: any) {
      toast({
        title: "❌ त्रुटि",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-2 border-border">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex items-center gap-2">
            <Sprout className="h-8 w-8" />
            <span className="text-2xl font-bold">🌾 स्मार्ट कृषि AI</span>
          </div>
          <CardTitle className="text-xl">
            {isLogin ? "लॉगिन करें" : "नया खाता बनाएं"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "अपने खाते में लॉगिन करें"
              : "Smart Agriculture AI का उपयोग करने के लिए खाता बनाएं"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> ईमेल
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="aapka@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-1">
                <Lock className="h-4 w-4" /> पासवर्ड
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="कम से कम 6 अक्षर"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "कृपया प्रतीक्षा करें..."
              ) : isLogin ? (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> लॉगिन करें
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> खाता बनाएं
                </span>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {isLogin ? "खाता नहीं है?" : "पहले से खाता है?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-foreground underline hover:no-underline"
            >
              {isLogin ? "नया खाता बनाएं" : "लॉगिन करें"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
