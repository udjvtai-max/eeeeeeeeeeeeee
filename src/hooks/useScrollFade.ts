import { useEffect, useRef, useState } from "react";

interface ScrollFadeOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollFade = (options: ScrollFadeOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
