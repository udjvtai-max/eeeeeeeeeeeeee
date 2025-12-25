import ScrollFadeCard from "./ScrollFadeCard";

const features = [
  {
    icon: "⚡",
    title: "FAST SETUP",
    description: "Get your server up and running in under 60 seconds with our automated deployment system.",
  },
  {
    icon: "🖥️",
    title: "BDIX NETWORK",
    description: "Powered by BDIX with ultra-low latency (1-20ms) for the best gaming experience in Bangladesh.",
  },
  {
    icon: "🛡️",
    title: "SECURE",
    description: "DDoS protection, automated backups, and 24/7 monitoring to keep your server safe.",
  },
  {
    icon: "💬",
    title: "24/7 SUPPORT",
    description: "Our dedicated team is available around the clock to help with any issues you encounter.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-heading tracking-wider uppercase mb-4 block">
            &gt;&gt; WHY CHOOSE US &lt;&lt;
          </span>
          <h2 className="text-2xl md:text-3xl font-heading mb-6 leading-relaxed">
            PREMIUM <span className="text-primary">GAME SERVER</span> HOSTING
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-pixel">
            Experience unparalleled performance with our BDIX-optimized infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <ScrollFadeCard key={feature.title} delay={index * 80}>
              <div
                className="group p-6 bg-card border-2 border-border hover:border-primary transition-colors h-full"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-sm font-heading mb-3 group-hover:text-primary transition-colors leading-relaxed">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base font-pixel leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollFadeCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
