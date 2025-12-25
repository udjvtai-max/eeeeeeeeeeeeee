import { Check, Globe, Database, Shield, Zap, Mail, Headphones, Server, HardDrive } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingFAQ from "@/components/PricingFAQ";
import Testimonials from "@/components/Testimonials";
import ScrollFadeCard from "@/components/ScrollFadeCard";

const BILLING_URL = "https://billing.senxcloud.top/index.php";
const DISCORD_URL = "https://discord.gg/Wphjzp73CH";

const webHostingFaqs = [
  {
    question: "What is web hosting?",
    answer: "Web hosting is a service that stores your website files on a server, making them accessible on the internet 24/7.",
  },
  {
    question: "Can I host WordPress websites?",
    answer: "Absolutely! All our plans support WordPress with 1-click installation through cPanel. We also optimize our servers for WordPress performance.",
  },
  {
    question: "Do you provide email hosting?",
    answer: "Yes, all plans include professional email hosting. You can create unlimited email accounts like yourname@yourdomain.com.",
  },
  {
    question: "What is the uptime guarantee?",
    answer: "We offer a 99.9% uptime guarantee. Our servers are monitored 24/7 and we use redundant infrastructure to ensure maximum reliability.",
  },
];

const webHostingTestimonials = [
  {
    name: "Maliha Rahman",
    role: "Blogger",
    content: "My blog loads super fast and the cPanel is so easy to use. Great value for the price!",
    rating: 5,
  },
  {
    name: "Tanvir Hasan",
    role: "Small Business Owner",
    content: "Moved my business website here and couldn't be happier. The free SSL and daily backups give me peace of mind.",
    rating: 5,
  },
  {
    name: "Sadia Islam",
    role: "Freelancer",
    content: "I host multiple client websites here. Reliable service and the support team is always helpful.",
    rating: 5,
  },
];

const plans = [
  {
    name: "Basic Plan",
    price: "99",
    specs: {
      websites: "Host 2 Website",
      storage: "5GB NVME SSD",
      location: "Canada",
    },
    features: [
      "Unlimited Bandwidth",
      "Unlimited Subdomains",
      "Unlimited MySQL Database",
      "Unlimited Email",
      "Unlimited SSL",
      "Ruby, Python, NodeJS",
      "Softaculous App Installer",
      "Daily Backup",
      "LiteSpeed Server",
      "99.9% Uptime",
    ],
    popular: false,
  },
  {
    name: "Medium Plan",
    price: "199",
    specs: {
      websites: "Host 10 Website",
      storage: "10GB NVME SSD",
      location: "Canada",
    },
    features: [
      "Unlimited Bandwidth",
      "Unlimited Subdomains",
      "Unlimited MySQL Database",
      "Unlimited Email",
      "Unlimited SSL",
      "Ruby, Python, NodeJS",
      "Softaculous App Installer",
      "Daily Backup",
      "LiteSpeed Server",
      "99.9% Uptime",
    ],
    popular: true,
  },
  {
    name: "Advance Plan",
    price: "249",
    specs: {
      websites: "Host 20 Website",
      storage: "20GB NVME SSD",
      location: "Canada",
    },
    features: [
      "Unlimited Bandwidth",
      "Unlimited Subdomains",
      "Unlimited MySQL Database",
      "Unlimited Email",
      "Unlimited SSL",
      "Ruby, Python, NodeJS",
      "Softaculous App Installer",
      "Daily Backup",
      "LiteSpeed Server",
      "99.9% Uptime",
    ],
    popular: false,
  },
];

const features = [
  {
    icon: Globe,
    title: "LiteSpeed Server",
    description: "20x faster than Apache",
  },
  {
    icon: Shield,
    title: "Free SSL",
    description: "Secure your site with HTTPS",
  },
  {
    icon: Database,
    title: "Unlimited MySQL",
    description: "Unlimited databases included",
  },
  {
    icon: Zap,
    title: "NVME SSD",
    description: "Ultra-fast storage",
  },
  {
    icon: Mail,
    title: "Unlimited Email",
    description: "Professional email accounts",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert help anytime",
  },
];

const WebHostingPricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
            Web Hosting
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gradient">Fast & Reliable Hosting</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Blazing-fast web hosting with LiteSpeed servers, free SSL, and 24/7 support.
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
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
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
                      Best Value
                    </span>
                  )}
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-black text-gradient">৳{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-background/50">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>{plan.specs.websites}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <HardDrive className="w-4 h-4 text-primary" />
                      <span>{plan.specs.storage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Server className="w-4 h-4 text-primary" />
                      <span>Location: {plan.specs.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 max-h-48 overflow-y-auto">
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
                    Get Started
                  </a>
                </div>
              </ScrollFadeCard>
            ))}
          </div>
        </div>
      </section>

      <Testimonials testimonials={webHostingTestimonials} gameName="Web Hosting" />
      <PricingFAQ faqs={webHostingFaqs} gameName="Web Hosting" />
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to <span className="text-gradient">Get Started?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Launch your website today with our reliable hosting.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebHostingPricing;
