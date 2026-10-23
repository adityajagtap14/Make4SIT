import { useEffect, useRef, useCallback } from 'react';

/**
 * Scroll-triggered animations using IntersectionObserver.
 * Add data-animate="fade-up" to elements you want to animate.
 * Optional: data-delay="1" through "6" for stagger.
 */
export function useScrollAnimation() {
  const observerRef = useRef(null);

  useEffect(() => {
    const revealAll = () => {
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 100) {
          el.classList.add('is-visible');
        }
      });
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.01 }
    );

    const observe = () => {
      const elements = document.querySelectorAll('[data-animate]:not(.is-visible)');
      elements.forEach((el) => observerRef.current?.observe(el));
      revealAll();
    };

    observe();
    const timer = setTimeout(observe, 100);
    const timer2 = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('is-visible'));
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      observerRef.current?.disconnect();
    };
  }, []);

  const rescan = useCallback(() => {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => el.classList.add('is-visible'));
  }, []);

  return rescan;
}

/**
 * Navbar scroll detection.
 */
export function useNavbarScroll() {
  const navRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (navRef.current) {
          navRef.current.classList.toggle('nav-scrolled', window.scrollY > 20);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return navRef;
}
