import { Link } from "react-router-dom";
import { Server, Globe, Link2 } from "lucide-react";
import minecraftHero from "@/assets/minecraft-hero.jpg";
import vpsHero from "@/assets/vps-hero.jpg";
import webHostingHero from "@/assets/web-hosting-hero.jpg";
import ScrollFadeCard from "./ScrollFadeCard";
import domainHero from "@/assets/domain-hero.jpg";

const games = [
  {
    name: "Minecraft BDIX Budget",
    price: "৳300",
    label: "BDIX",
    labelColor: "bg-primary",
    image: minecraftHero,
    features: ["Unlimited CPU", "BDIX Network", "24/7 Support"],
    href: "/pricing/minecraft-bdix-budget",
  },
  {
    name: "Minecraft India",
    price: "৳180",
    label: "India",
    labelColor: "bg-orange-500",
    image: minecraftHero,
    features: ["Up to 800% CPU", "India Location", "Great Value"],
    href: "/pricing/minecraft-india",
  },
  {
    name: "Minecraft BDIX Premium",
    price: "৳390",
    label: "Premium",
    labelColor: "bg-amber-500",
    image: minecraftHero,
    features: ["Up to 700% CPU", "BDIX Network", "Priority Support"],
    href: "/pricing/minecraft",
  },
  {
    name: "Intel VPS",
    price: "৳700",
    label: "Intel",
    labelColor: "bg-blue-500",
    image: vpsHero,
    icon: Server,
    features: ["Full Root Access", "SSD Storage", "99.9% Uptime"],
    href: "/vps-pricing",
  },
  {
    name: "Web Hosting",
    price: "৳99",
    label: "Popular",
    labelColor: "bg-purple-500",
    image: webHostingHero,
    icon: Globe,
    features: ["Free SSL", "LiteSpeed", "Unlimited Bandwidth"],
    href: "/web-hosting-pricing",
  },
  {
    name: "Domain",
    price: "৳200",
    label: "Starting",
    labelColor: "bg-green-500",
    image: domainHero,
    icon: Link2,
    features: ["Free DNS", "WHOIS Privacy", "Auto Renewal"],
    href: "/domain-pricing",
  },
];

const GameServers = () => {
  return (
    <section id="games" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="text-gradient">Game Server</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium BDIX hosting for all your favorite games. Ultra-low latency guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <ScrollFadeCard key={game.name} delay={index * 80}>
              <div
                className="group relative rounded-lg overflow-hidden border border-border bg-card transition-all duration-300 hover:border-primary/40 h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Label */}
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${game.labelColor} text-primary-foreground`}>
                    {game.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-black text-gradient">{game.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {game.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                <Link
                  to={game.href}
                  className="block w-full py-3 rounded-md font-semibold text-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                    Get Started
                  </Link>
                </div>
              </div>
            </ScrollFadeCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameServers;