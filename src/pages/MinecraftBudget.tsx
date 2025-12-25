import { Check, Cpu, HardDrive, Database, Shield, Zap, Server, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import Testimonials from "@/components/Testimonials";
import ScrollFadeCard from "@/components/ScrollFadeCard";
import minecraftHero from "@/assets/minecraft-hero.jpg";

const bdixPlans = [
  {
    name: "BDIX - 1 BUDGET",
    price: "300",
    ram: "3GB",
    cpu: "Unlimited",
    disk: "5GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 2 BUDGET",
    price: "400",
    ram: "4GB",
    cpu: "Unlimited",
    disk: "10GB",
    backups: "3",
    databases: "3",
    ports: "3",
    popular: true,
  },
  {
    name: "BDIX - 3 BUDGET",
    price: "600",
    ram: "6GB",
    cpu: "Unlimited",
    disk: "15GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 4 BUDGET",
    price: "800",
    ram: "8GB",
    cpu: "Unlimited",
    disk: "20GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "BDIX - 5 BUDGET",
    price: "1600",
    ram: "16GB",
    cpu: "Unlimited",
    disk: "30GB",
    backups: "4",
    databases: "4",
    ports: "4",
  },
  {
    name: "BDIX - 6 BUDGET",
    price: "3200",
    ram: "32GB",
    cpu: "Unlimited",
    disk: "40GB",
    backups: "5",
    databases: "5",
    ports: "5",
  },
];

const indiaPlans = [
  {
    name: "IN - 1 BUDGET",
    price: "180",
    ram: "3GB",
    cpu: "150%",
    disk: "5GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "IN - 2 BUDGET",
    price: "240",
    ram: "4GB",
    cpu: "200%",
    disk: "10GB",
    backups: "3",
    databases: "3",
    ports: "3",
    popular: true,
  },
  {
    name: "IN - 3 BUDGET",
    price: "360",
    ram: "6GB",
    cpu: "300%",
    disk: "15GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "IN - 4 BUDGET",
    price: "480",
    ram: "8GB",
    cpu: "400%",
    disk: "20GB",
    backups: "3",
    databases: "3",
    ports: "3",
  },
  {
    name: "IN - 5 BUDGET",
    price: "960",
    ram: "16GB",
    cpu: "600%",
    disk: "30GB",
    backups: "4",
    databases: "4",
    ports: "4",
  },
  {
    name: "IN - 6 BUDGET",
    price: "1920",
    ram: "32GB",
    cpu: "800%",
    disk: "40GB",
    backups: "5",
    databases: "5",
    ports: "5",
  },
];

const highlights = [
  { icon: Zap, title: "Instant Setup", description: "Server ready in under 5 minutes" },
  { icon: Shield, title: "DDoS Protection", description: "Enterprise-grade security" },
  { icon: Database, title: "Free Backups", description: "Automatic daily backups" },
  { icon: Server, title: "24/7 Uptime", description: "Reliable server hosting" },
];

const faqs = [
  {
    question: "What's the difference between BDIX and India servers?",
    answer: "BDIX servers are located in Bangladesh and offer ultra-low latency (1-20ms) for Bangladeshi players. India servers are more affordable but have slightly higher latency (30-50ms).",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes! You can upgrade your plan anytime from the control panel. The price difference will be calculated pro-rata.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, and major credit/debit cards through our secure billing portal.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our service.",
  },
];

const testimonials = [
  {
    name: "Rian Ahmed",
    role: "Server Owner",
    content: "Amazing budget hosting! The BDIX connection gives us incredible ping for our Bangladeshi players.",
    rating: 5,
  },
  {
    name: "Sakib Hassan",
    role: "Community Leader",
    content: "Best value for money. Switched from expensive hosting and couldn't be happier!",
    rating: 5,
  },
  {
    name: "Fahim Khan",
    role: "Gamer",
    content: "The India servers are perfect for our mixed community. Great performance at an affordable price.",
    rating: 5,
  },
];

const BILLING_URL = "https://billing.senxcloud.top/index.php";

const PlanCard = ({ plan }: { plan: typeof bdixPlans[0] }) => (
  <div
    className={`relative rounded-2xl p-6 transition-all hover:scale-105 ${
      plan.popular
        ? "bg-gradient-to-b from-primary/20 to-card border-2 border-primary glow-primary"
        : "bg-card border border-border hover:border-primary/50"
    }`}
  >
    {plan.popular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
        Popular
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

const MinecraftBudget = () => {
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
              💰 Budget Friendly Hosting
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-gradient">Minecraft Budget</span>
              <br />
              <span className="text-foreground">Hosting</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Affordable Minecraft server hosting with BDIX and India locations. Perfect for small communities and budget-conscious gamers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#bdix-pricing" className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-primary">
                View BDIX Plans
              </a>
              <a href="#india-pricing" className="px-8 py-4 bg-card text-foreground rounded-xl font-bold text-lg border border-border hover:border-primary/50 transition-all">
                View India Plans
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

        {/* BDIX Pricing */}
        <section id="bdix-pricing" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                  BDIX Location
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bangladesh <span className="text-gradient">BDIX Plans</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Ultra-low latency (1-20ms) servers located in Bangladesh. Best for local players.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bdixPlans.map((plan, index) => (
                <ScrollFadeCard key={plan.name} delay={index * 100}>
                  <PlanCard plan={plan} />
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* India Pricing */}
        <section id="india-pricing" className="py-20 px-4 bg-card/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                  India Location
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                India <span className="text-gradient">Budget Plans</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Affordable servers with good latency (30-50ms). Perfect for budget-conscious players.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indiaPlans.map((plan, index) => (
                <ScrollFadeCard key={plan.name} delay={index * 100}>
                  <PlanCard plan={plan} />
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Why Choose <span className="text-gradient">senX Cloud?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Ultra-fast BDIX Network",
                "24/7 Support",
                "Free Panel Installation",
                "Reliable & Secure",
                "Instant Setup",
                "Money-back Guarantee",
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

        {/* Testimonials */}
        <Testimonials testimonials={testimonials} gameName="Minecraft Budget" />

        {/* FAQ */}
        <PricingFAQ faqs={faqs} gameName="Minecraft Budget" />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-t from-primary/10 to-transparent">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Ready to Start Your <span className="text-gradient">Server?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of satisfied customers. Get your Minecraft server running in minutes!
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
                href="https://discord.gg/Wphjzp73CH"
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

export default MinecraftBudget;
