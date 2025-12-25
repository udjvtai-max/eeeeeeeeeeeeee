import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollFadeCard from "./ScrollFadeCard";

const faqs = [
  {
    question: "What is BDIX and why does it matter for gaming?",
    answer: "BDIX (Bangladesh Internet Exchange) is a local internet exchange point that allows direct peering between ISPs in Bangladesh. This means your game data doesn't have to travel internationally, resulting in ultra-low latency of just 1-20ms compared to 150-300ms for international servers. This makes a huge difference in competitive gaming.",
  },
  {
    question: "How fast can I get my server up and running?",
    answer: "Our automated system provisions your server instantly. Once payment is confirmed, your server credentials are delivered within 60 seconds. We provide a user-friendly control panel where you can manage mods, plugins, backups, and server settings with just a few clicks.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept bKash, Nagad, and Mastercard/Visa for your convenience. All payments are processed securely, and we offer monthly, quarterly, and yearly billing cycles. Yearly plans come with additional discounts!",
  },
  {
    question: "Do you provide DDoS protection?",
    answer: "Yes! All our servers come with enterprise-grade DDoS protection at no extra cost. Our network is designed to absorb and mitigate attacks automatically, ensuring your gaming sessions remain uninterrupted.",
  },
  {
    question: "Can I upgrade my server plan later?",
    answer: "Absolutely! You can upgrade your plan at any time through our control panel. The upgrade is instant, and you'll only pay the prorated difference for the remaining billing period.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 support through Discord and our ticket system. Our team of gaming experts typically responds within 15 minutes. We also have extensive documentation and video tutorials to help you get started.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 7-day money-back guarantee for first-time customers. If you're not satisfied with our service, contact support within 7 days of purchase for a full refund.",
  },
  {
    question: "Can I install custom mods and plugins?",
    answer: "Yes! You have full FTP/SFTP access to your server files. Our control panel also includes one-click installers for popular modpacks and plugins. For Minecraft, we support Vanilla, Paper, Spigot, Forge, and Fabric.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our BDIX game server hosting.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollFadeCard key={index} delay={index * 50}>
              <AccordionItem
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 data-[state=open]:glow-primary transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </ScrollFadeCard>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="https://discord.gg/senxcloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all glow-primary"
          >
            Join our Discord
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
