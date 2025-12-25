import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollFadeCard from "./ScrollFadeCard";

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  faqs: FAQItem[];
  gameName: string;
}

const PricingFAQ = ({ faqs, gameName }: PricingFAQProps) => {
  return (
    <section className="py-16 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">{gameName}</span> Hosting FAQ
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollFadeCard key={index} delay={index * 50}>
              <AccordionItem
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card/50 backdrop-blur-sm data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 text-base font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </ScrollFadeCard>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PricingFAQ;