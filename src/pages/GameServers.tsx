import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollFadeCard from "@/components/ScrollFadeCard";
import minecraftHero from "@/assets/minecraft-hero.jpg";
import vpsHero from "@/assets/vps-hero.jpg";

import webHostingHero from "@/assets/web-hosting-hero.jpg";

const games = [
  {
    name: "Minecraft BDIX Budget",
    description: "Affordable BDIX hosting with unlimited CPU for small to large communities.",
    price: "300",
    label: "BDIX",
    labelColor: "bg-primary",
    image: minecraftHero,
    href: "/pricing/minecraft-bdix-budget",
    features: ["Unlimited CPU", "BDIX Network", "Free Panel Installation", "DDoS Protection", "24/7 Support"],
  },
  {
    name: "Minecraft India Budget",
    description: "Budget-friendly India server hosting with great performance.",
    price: "180",
    label: "India",
    labelColor: "bg-orange-500",
    image: minecraftHero,
    href: "/pricing/minecraft-india",
    features: ["Up to 800% CPU", "India Location", "Mod Support", "Daily Backups", "Great Value"],
  },
  {
    name: "Minecraft BDIX Premium",
    description: "Premium BDIX hosting with high CPU power and priority support.",
    price: "390",
    label: "Premium",
    labelColor: "bg-amber-500",
    image: minecraftHero,
    href: "/pricing/minecraft",
    features: ["Up to 700% CPU", "BDIX Network", "Priority Support", "Daily Backups", "1-20ms Latency"],
  },
  {
    name: "Intel VPS",
    description: "High-performance Intel VPS with full root access and SSD storage.",
    price: "700",
    label: "Intel",
    labelColor: "bg-blue-500",
    image: vpsHero,
    href: "/vps-pricing",
    features: ["Full Root Access", "SSD Storage", "99.9% Uptime", "DDoS Protection", "Custom OS"],
  },
  {
    name: "Web Hosting",
    description: "Fast and reliable web hosting with LiteSpeed and unlimited features.",
    price: "99",
    label: "Popular",
    labelColor: "bg-purple-500",
    image: webHostingHero,
    href: "/web-hosting-pricing",
    features: ["Free SSL", "LiteSpeed Server", "Unlimited Bandwidth", "Daily Backup", "99.9% Uptime"],
  },
];

const comparisonData = [
  { game: "Minecraft BDIX Budget", players: "Up to 50+", price: "৳300", latency: "1-20ms", support: "24/7" },
  { game: "Minecraft India", players: "Up to 50+", price: "৳180", latency: "20-50ms", support: "24/7" },
  { game: "Minecraft BDIX Premium", players: "Up to 50+", price: "৳390", latency: "1-20ms", support: "24/7" },
  { game: "Intel VPS", players: "N/A", price: "৳700", latency: "Low", support: "24/7" },
  { game: "Web Hosting", players: "N/A", price: "৳99", latency: "N/A", support: "24/7" },
];

const GameServers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/20 text-primary border border-primary/30 mb-6">
              All Games
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-gradient">Game Server</span> Hostings
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your favorite game and start hosting with ultra-low latency BDIX servers.
            </p>
          </div>
        </section>

        {/* Game Cards Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <ScrollFadeCard key={game.name} delay={index * 100}>
                  <div
                    className="group relative rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:border-primary/50 h-full"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      
                      {/* Label */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${game.labelColor} text-primary-foreground`}>
                        {game.label}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{game.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {game.features.slice(0, 3).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-black text-gradient">৳{game.price}</span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </div>
                        <Link
                          to={game.href}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all"
                        >
                          View Plans
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollFadeCard>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Quick <span className="text-gradient">Comparison</span>
            </h2>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left py-4 px-6 font-semibold w-1/5">Game</th>
                    <th className="text-center py-4 px-6 font-semibold w-1/5">Max Players</th>
                    <th className="text-center py-4 px-6 font-semibold w-1/5">Starting Price</th>
                    <th className="text-center py-4 px-6 font-semibold w-1/5">Latency</th>
                    <th className="text-center py-4 px-6 font-semibold w-1/5">Support</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr 
                      key={row.game} 
                      className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium">{row.game}</td>
                      <td className="text-center py-4 px-6">{row.players}</td>
                      <td className="text-center py-4 px-6 text-primary font-semibold">{row.price}</td>
                      <td className="text-center py-4 px-6">{row.latency}</td>
                      <td className="text-center py-4 px-6">{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 bg-gradient-to-br from-card to-secondary rounded-3xl border border-border">
              <h2 className="text-3xl font-bold mb-4">
                Can't Find Your <span className="text-gradient">Game</span>?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Contact us on Discord and we'll help you set up a custom server for your game.
              </p>
              <a
                href="https://discord.gg/senxcloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-primary"
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

export default GameServers;
