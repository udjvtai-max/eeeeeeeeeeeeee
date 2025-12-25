import { Star } from "lucide-react";
import ScrollFadeCard from "./ScrollFadeCard";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  gameName: string;
}

const Testimonials = ({ testimonials, gameName }: TestimonialsProps) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Trusted by Gamers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our <span className="text-gradient">{gameName}</span> Players Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollFadeCard key={index} delay={index * 100}>
              <div
                className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all group h-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </ScrollFadeCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;