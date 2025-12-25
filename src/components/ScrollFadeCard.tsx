import { ReactNode } from "react";
import { useScrollFade } from "@/hooks/useScrollFade";

interface ScrollFadeCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollFadeCard = ({ children, className = "", delay = 0 }: ScrollFadeCardProps) => {
  const { ref, isVisible } = useScrollFade();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollFadeCard;
