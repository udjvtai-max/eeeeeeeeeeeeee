import { Check, Server, Cpu, HardDrive, Gauge, Shield, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import Testimonials from "@/components/Testimonials";
import ScrollFadeCard from "@/components/ScrollFadeCard";

const BILLING_URL = "https://billing.senxcloud.top/index.php";
const DISCORD_URL = "https://discord.gg/Wphjzp73CH";

const vpsFaqs = [
  {
    question: "What is a VPS?",
    answer: "A Virtual Private Server (VPS) is a virtualized server that acts like a dedicated server within a larger physical server. You get full root access and dedicated resources.",
  },
  {
    question: "Can I upgrade my VPS plan later?",
    answer: "Yes! You can upgrade your VPS plan at any time without data loss. The upgrade process takes only a few minutes.",
  },
  {
    question: "What operating systems are available?",
    answer: "We support Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux, and Windows Server. Custom OS installations are available on request.",
  },
  {
    question: "Do you provide managed VPS?",
    answer: "Our VPS plans are unmanaged by default, giving you full control. However, we offer managed services as an add-on for an additional fee.",
  },
];

const vpsTestimonials = [
  {
    name: "Rahim Ahmed",
    role: "Web Developer",
    content: "The VPS performance is incredible. My websites load instantly for Bangladesh visitors thanks to the BDIX connectivity.",
    rating: 5,
  },
  {
    name: "Faisal Khan",
    role: "SysAdmin",
    content: "Best VPS provider in Bangladesh. The support team is very responsive and the uptime is excellent.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "E-commerce Owner",
    content: "Running my online store on their VPS has been a game-changer. Fast, reliable, and affordable.",
    rating: 5,
  },
];

const plans = [
  {
    name: "INTEL VPS - 1",
    price: "700",
    specs: {
      cpu: "2 Core",
      ram: "6GB RAM",
      storage: "40GB SSD",
    },
    features: [
      "Full Root Access",
      "99.9% Uptime SLA",
      "DDoS Protection",
      "24/7 Support",
    ],
    popular: false,
  },
  {
    name: "INTEL VPS - 2",
    price: "900",
    specs: {
      cpu: "4 Core",
      ram: "8GB RAM",
      storage: "50GB SSD",
    },
    features: [
      "Full Root Access",
      "99.9% Uptime SLA",
      "DDoS Protection",
      "24/7 Priority Support",
      "Free Backups",
    ],
    popular: true,
  },
  {
    name: "INTEL VPS - 3",
    price: "1300",
    specs: {
      cpu: "6 Core",
      ram: "12GB RAM",
      storage: "80GB SSD",
    },
    features: [
      "Full Root Access",
      "99.99% Uptime SLA",
      "Advanced DDoS Protection",
      "24/7 Priority Support",
      "Daily Backups",
      "Free Migration",
    ],
    popular: false,
  },
  {
    name: "INTEL VPS - 4",
    price: "1700",
    specs: {
      cpu: "6 Core",
      ram: "16GB RAM",
      storage: "100GB SSD",
    },
    features: [
      "Full Root Access",
      "99.99% Uptime SLA",
      "Enterprise DDoS Protection",
      "24/7 Priority Support",
      "Daily Backups",
      "Free Migration",
    ],
    popular: false,
  },
  {
    name: "INTEL VPS - 5",
    price: "3500",
    specs: {
      cpu: "8 Core",
      ram: "32GB RAM",
      storage: "150GB SSD",
    },
    features: [
      "Full Root Access",
      "99.99% Uptime SLA",
      "Enterprise DDoS Protection",
      "Dedicated Support Manager",
      "Hourly Backups",
      "Free Migration",
      "Custom Configurations",
    ],
    popular: false,
  },
  {
    name: "INTEL VPS - 6",
    price: "6300",
    specs: {
      cpu: "12 Core",
      ram: "64GB RAM",
      storage: "250GB SSD",
    },
    features: [
      "Full Root Access",
      "99.99% Uptime SLA",
      "Enterprise DDoS Protection",
      "Dedicated Support Manager",
      "Hourly Backups",
      "Free Migration",
      "Custom Configurations",
      "Priority Hardware",
    ],
    popular: false,
  },
];

const features = [
  {
    icon: Server,
    title: "BDIX Connectivity",
    description: "Ultra-low latency for Bangladesh users",
  },
  {
    icon: Cpu,
    title: "Intel Processors",
    description: "Latest Intel Xeon CPUs",
  },
  {
    icon: HardDrive,
    title: "SSD Storage",
    description: "Lightning-fast SSD drives",
  },
  {
    icon: Gauge,
    title: "High Performance",
    description: "Dedicated resources, no overselling",
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Enterprise-grade security included",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert technical assistance",
  },
];

const VPSPricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
            Intel VPS Hosting
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">Virtual Private Servers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            High-performance Intel VPS with BDIX connectivity, full root access, and enterprise-grade security.
          </p>
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

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <ScrollFadeCard key={plan.name} delay={index * 100}>
                <div
                  className={`relative rounded-2xl p-6 transition-all hover:scale-105 h-full ${
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
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-black text-gradient">৳{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 text-sm">
                      <Cpu className="w-4 h-4 text-primary" />
                      <span>{plan.specs.cpu}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Server className="w-4 h-4 text-primary" />
                      <span>{plan.specs.ram}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <HardDrive className="w-4 h-4 text-primary" />
                      <span>{plan.specs.storage}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={BILLING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-xl font-bold text-center bg-primary text-primary-foreground hover:opacity-90 transition-all"
                  >
                    Order Now
                  </a>
                </div>
              </ScrollFadeCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose <span className="text-gradient">senX Cloud VPS?</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Ultra-fast BDIX Network",
              "24/7 Support",
              "Free Panel Installation",
              "Reliable & Secure",
            ].map((item, index) => (
              <ScrollFadeCard key={item} delay={index * 100}>
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

      <Testimonials testimonials={vpsTestimonials} gameName="VPS" />
      <PricingFAQ faqs={vpsFaqs} gameName="VPS" />
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Need a <span className="text-gradient">Custom Solution?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact us for custom VPS configurations tailored to your needs.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Contact Sales
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VPSPricing;
