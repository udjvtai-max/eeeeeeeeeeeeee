import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import { Check, Server } from "lucide-react";

const plans = [
  {
    name: "BDIX - 1 BUDGET",
    price: "300",
    ram: "3GB",
    cpu: "Unlimited",
    disk: "5GB",
    backup: "3",
    database: "3",
    port: "3",
  },
  {
    name: "BDIX - 2 BUDGET",
    price: "400",
    ram: "4GB",
    cpu: "Unlimited",
    disk: "10GB",
    backup: "3",
    database: "3",
    port: "3",
  },
  {
    name: "BDIX - 3 BUDGET",
    price: "600",
    ram: "6GB",
    cpu: "Unlimited",
    disk: "15GB",
    backup: "3",
    database: "3",
    port: "3",
    popular: true,
  },
  {
    name: "BDIX - 4 BUDGET",
    price: "800",
    ram: "8GB",
    cpu: "Unlimited",
    disk: "20GB",
    backup: "3",
    database: "3",
    port: "3",
  },
  {
    name: "BDIX - 5 BUDGET",
    price: "1600",
    ram: "16GB",
    cpu: "Unlimited",
    disk: "30GB",
    backup: "4",
    database: "4",
    port: "4",
  },
  {
    name: "BDIX - 6 BUDGET",
    price: "3200",
    ram: "32GB",
    cpu: "Unlimited",
    disk: "40GB",
    backup: "5",
    database: "5",
    port: "5",
  },
];

const MinecraftBDIXBudget = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center px-4 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-4">
            BDIX Budget
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Minecraft <span className="text-gradient">BDIX Budget</span> Hosting
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Affordable BDIX hosting with unlimited CPU for small to large communities.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Ultra-fast BDIX Network", "24/7 Support", "Free Panel Installation", "Reliable & Secure"].map((feature) => (
              <div key={feature} className="flex items-center gap-2 p-4 rounded-lg bg-card border border-border">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 bg-card transition-all duration-300 hover:border-primary/50 ${
                  plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    POPULAR
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Server className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-gradient">৳{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">RAM</span>
                    <span className="font-semibold">{plan.ram}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">CPU</span>
                    <span className="font-semibold">{plan.cpu}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Disk</span>
                    <span className="font-semibold">{plan.disk}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Backups</span>
                    <span className="font-semibold">{plan.backup}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Databases</span>
                    <span className="font-semibold">{plan.database}</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ports</span>
                    <span className="font-semibold">{plan.port}</span>
                  </li>
                </ul>

                <a
                  href="https://discord.gg/senxcloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 rounded-lg font-semibold text-center transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </section>

        <PricingFAQ 
          gameName="Minecraft BDIX Budget"
          faqs={[
            { question: "What is BDIX?", answer: "BDIX (Bangladesh Internet Exchange) provides ultra-fast connectivity within Bangladesh, offering 1-20ms latency for local players." },
            { question: "What games can I run?", answer: "Our servers support Minecraft Java Edition, Bedrock Edition, and various modpacks including Paper, Spigot, Forge, and Fabric." },
            { question: "How do I get support?", answer: "We offer 24/7 support through our Discord server. Our team is always ready to help with any issues." },
            { question: "Can I upgrade my plan?", answer: "Yes, you can upgrade or downgrade your plan at any time. Contact our support team through Discord." },
          ]}
        />
      </main>
      <Footer />
    </div>
  );
};

export default MinecraftBDIXBudget;
