import { Check, X, Zap, Shield, HardDrive, Cpu, Gamepad2, Server, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import Testimonials from "@/components/Testimonials";
import ScrollFadeCard from "@/components/ScrollFadeCard";
import minecraftHero from "@/assets/minecraft-hero.jpg";

const BILLING_URL = "https://billing.senxcloud.top/index.php";
const DISCORD_URL = "https://discord.gg/Wphjzp73CH";

const premiumPlans = [
  {
    name: "BDIX - 1 PREMIUM",
    price: "390",
    ram: "3GB",
    cpu: "150%",
    disk: "5GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 2 PREMIUM",
    price: "520",
    ram: "4GB",
    cpu: "200%",
    disk: "10GB",
    backups: "3",
    databases: "3",
    ports: "3",
    popular: true,
  },
  {
    name: "BDIX - 3 PREMIUM",
    price: "780",
    ram: "6GB",
    cpu: "250%",
    disk: "15GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 4 PREMIUM",
    price: "1040",
    ram: "8GB",
    cpu: "300%",
    disk: "20GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 5 PREMIUM",
    price: "2080",
    ram: "16GB",
    cpu: "500%",
    disk: "30GB",
    backups: "4",
    databases: "4",
    ports: "4",
  },
  {
    name: "BDIX - 6 PREMIUM",
    price: "4160",
    ram: "32GB",
    cpu: "700%",
    disk: "40GB",
    backups: "5",
    databases: "5",
    ports: "5",
  },
];

const specs = [
  { icon: Cpu, label: "CPU", description: "Intel Xeon / AMD EPYC processors" },
  { icon: HardDrive, label: "Storage", description: "NVMe SSD for maximum speed" },
  { icon: Zap, label: "Network", description: "1Gbps BDIX connection" },
  { icon: Shield, label: "Protection", description: "Enterprise DDoS mitigation" },
];

const highlights = [
  { icon: Gamepad2, title: "Plugin Support", description: "Bukkit, Spigot, Paper, Purpur compatible" },
  { icon: Server, title: "Modpack Support", description: "CurseForge, Technic, FTB integration" },
  { icon: HardDrive, title: "World Backup", description: "Daily automatic backups included" },
  { icon: Zap, title: "Instant Setup", description: "Server ready in under 5 minutes" },
];

const faqs = [
  {
    question: "How quickly can I start my server?",
    answer: "Your server will be ready instantly! After payment confirmation, you'll receive your server credentials within 5 minutes. Our automated system ensures zero wait time.",
  },
  {
    question: "Can I upgrade my server tier later?",
    answer: "Yes, absolutely! You can upgrade or downgrade your plan anytime from your control panel. The price difference will be calculated pro-rata based on your remaining billing period.",
  },
  {
    question: "Do you support mods and plugins?",
    answer: "Yes! We support all major mod loaders including Forge, Fabric, and Quilt. For plugins, we support Bukkit, Spigot, Paper, and Purpur. You can install them via our one-click installer or upload your own.",
  },
  {
    question: "What's your uptime guarantee?",
    answer: "We guarantee 99.99% uptime SLA. Our BDIX-optimized servers are hosted in Tier-3 data centers with redundant power and network connections. Any downtime is automatically compensated.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with our service within the first 7 days, contact our support team for a full refund, no questions asked.",
  },
];

const testimonials = [
  {
    name: "Rian Ahmed",
    role: "Server Owner, 150+ Players",
    content: "Best Minecraft hosting in Bangladesh! The BDIX connection gives us amazing 5ms ping. Our players love it!",
    rating: 5,
  },
  {
    name: "Sakib Hassan",
    role: "Community Leader",
    content: "Switched from international hosting to senX Cloud. The difference in latency is incredible. Support team is super responsive too.",
    rating: 5,
  },
  {
    name: "Fahim Khan",
    role: "Modded Server Admin",
    content: "Running a heavily modded server with 50+ mods. No lag, no crashes. The NVMe storage makes chunk loading super fast!",
    rating: 5,
  },
];

const PlanCard = ({ plan }: { plan: typeof premiumPlans[0] }) => (
  <div
    className={`relative rounded-2xl p-6 transition-all hover:scale-105 ${
      plan.popular
        ? "bg-gradient-to-b from-primary/20 to-card border-2 border-primary glow-primary"
        : "bg-card border border-border hover:border-primary/50"
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
        Most Popular
      </span>
    )}

    <h3 className="text-lg font-bold mb-2">{plan.name}</h3>

    <div className="mb-4">
      <span className="text-4xl font-black text-gradient">৳{plan.price}</span>
      <span className="text-muted-foreground">/month</span>
    </div>

    <div className="space-y-2 mb-4 p-3 rounded-lg bg-background/50">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">RAM</span>
        <span className="font-semibold">{plan.ram}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">CPU</span>
        <span className="font-semibold">{plan.cpu}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Disk</span>
        <span className="font-semibold">{plan.disk}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Backups</span>
        <span className="font-semibold">{plan.backups}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Databases</span>
        <span className="font-semibold">{plan.databases}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Ports</span>
        <span className="font-semibold">{plan.ports}</span>
      </div>
    </div>

    <a
      href={BILLING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full py-3 rounded-xl font-bold text-center bg-primary text-primary-foreground hover:opacity-90 transition-all"
    >
      Order Now
    </a>
  </div>
);

const MinecraftPricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={minecraftHero} alt="Minecraft" className="w-full h-full object-cover object-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6 animate-pulse">
              🎮 BDIX Premium • 1-20ms Latency
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-gradient">Minecraft Premium</span>
              <br />
              <span className="text-foreground">Hosting</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Ultra-low latency servers powered by BDIX. Experience lag-free gameplay with enterprise-grade hardware and 24/7 support.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#pricing" className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-primary">
                View Pricing
              </a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-card text-foreground rounded-xl font-bold text-lg border border-border hover:border-primary/50 transition-all">
                Join Discord
              </a>
            </div>
          </div>
        </section>

        {/* Features Highlights */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <ScrollFadeCard key={item.title} delay={index * 100}>
                  <div className="p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all group text-center h-full">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                  BDIX Premium Plans
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your <span className="text-gradient">Premium Plan</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                High-performance BDIX servers with dedicated CPU resources for the best gaming experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumPlans.map((plan, index) => (
                <ScrollFadeCard key={plan.name} delay={index * 100}>
                  <PlanCard plan={plan} />
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* Server Specs */}
        <section className="py-16 px-4 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Enterprise-Grade <span className="text-gradient">Hardware</span>
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {specs.map((spec, index) => (
                <ScrollFadeCard key={spec.label} delay={index * 100}>
                  <div className="p-6 bg-card rounded-xl border border-border text-center hover:border-primary/30 transition-all h-full">
                    <spec.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">{spec.label}</h3>
                    <p className="text-sm text-muted-foreground">{spec.description}</p>
                  </div>
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials testimonials={testimonials} gameName="Minecraft Premium" />

        {/* FAQ */}
        <PricingFAQ faqs={faqs} gameName="Minecraft Premium" />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-t from-primary/10 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Start Your <span className="text-gradient">Premium Server?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers. Experience the best Minecraft hosting in Bangladesh!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={BILLING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-primary text-primary-foreground rounded-xl font-bold text-xl hover:opacity-90 transition-all glow-primary"
              >
                Order Now
              </a>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-card text-foreground rounded-xl font-bold text-xl border border-border hover:border-primary/50 transition-all"
              >
                Join Discord
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MinecraftPricing;
