import { Check, Globe, Shield, Zap, RefreshCw, Lock, Headphones, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import ScrollFadeCard from "@/components/ScrollFadeCard";

const BILLING_URL = "https://billing.senxcloud.top/index.php";
const DISCORD_URL = "https://discord.gg/Wphjzp73CH";

const domainFaqs = [
  {
    question: "How long does domain registration take?",
    answer: "Most domains are registered instantly. Some country-code domains like .bd may take 24-48 hours for verification.",
  },
  {
    question: "Can I transfer my existing domain?",
    answer: "Yes! You can transfer your domain from any registrar. We provide free transfer assistance and the process usually takes 5-7 days.",
  },
  {
    question: "What is WHOIS privacy?",
    answer: "WHOIS privacy hides your personal information (name, address, email) from the public WHOIS database, protecting you from spam and identity theft.",
  },
  {
    question: "Do you offer domain parking?",
    answer: "Yes, all domains include free domain parking. You can display a coming soon page or redirect to another website.",
  },
];

const features = [
  {
    icon: Globe,
    title: "Free DNS Management",
    description: "Full control over your DNS records",
  },
  {
    icon: Shield,
    title: "WHOIS Privacy",
    description: "Protect your personal information",
  },
  {
    icon: Lock,
    title: "Domain Lock",
    description: "Prevent unauthorized transfers",
  },
  {
    icon: RefreshCw,
    title: "Auto Renewal",
    description: "Never lose your domain",
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Domain ready in minutes",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert help anytime",
  },
];

const DomainPricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
            Domain Registration
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">Register Your Domain</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Secure your perfect domain name with competitive pricing and free features.
          </p>
          
          {/* CTA to Billing */}
          <a
            href={BILLING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-primary"
          >
            <span>Visit Our Billing Portal to Buy</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <ScrollFadeCard key={feature.title} delay={index * 50}>
                <div
                  className="p-4 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-all h-full"
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollFadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* Main CTA Card */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-primary/20 to-card border-2 border-primary p-8 text-center glow-primary">
            <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Your <span className="text-gradient">Domain?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Visit our billing portal to search for available domains, check prices, and complete your purchase securely.
            </p>
            <a
              href={BILLING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-xl font-bold text-xl hover:opacity-90 transition-all"
            >
              <span>Go to Billing Portal</span>
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-8">
            Every Domain Includes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Free DNS Management",
              "WHOIS Privacy Protection",
              "Domain Forwarding",
              "Email Forwarding",
              "Domain Lock",
              "Auto Renewal Option",
              "24/7 Customer Support",
              "Easy Domain Transfer",
            ].map((item, index) => (
              <ScrollFadeCard key={item} delay={index * 50}>
                <div
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              </ScrollFadeCard>
            ))}
          </div>
        </div>
      </section>

      <PricingFAQ faqs={domainFaqs} gameName="Domain" />
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Need Help <span className="text-gradient">Choosing?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team can help you find the perfect domain for your business.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Contact Us on Discord
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DomainPricing;
