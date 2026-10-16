import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Activity,
  CalendarDays,
  CheckCircle2,
  Cpu,
  FileText,
  HeartPulse,
  Layers,
  Menu,
  Pill,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const MedicalLogoMark: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M39 4h22v9c0 13-7 22-16 31l-8 8-15-15 8-8c6-6 9-13 9-22V4Z" fill="#2563EB" />
    <path d="M96 39v22h-9c-13 0-22-7-31-16l-8-8 15-15 8 8c6 6 13 9 22 9h3Z" fill="#2563EB" />
    <path d="M61 96H39v-9c0-13 7-22 16-31l8-8 15 15-8 8c-6 6-9 13-9 22v3Z" fill="#2563EB" />
    <path d="M4 61V39h9c13 0 22 7 31 16l8 8-15 15-8-8c-6-6-13-9-22-9H4Z" fill="#2563EB" />
  </svg>
);

// Approved Aivora Logo SVG (Preserved exactly as approved)
export const AivoraLogo: React.FC<{ className?: string }> = ({ className = 'h-8 w-8' }) => (
  <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden="true">
    <rect width="34" height="34" rx="9" fill="#171B1A" />
    <path
      d="M17 7.5C11.753 7.5 7.5 11.753 7.5 17C7.5 22.247 11.753 26.5 17 26.5C22.247 26.5 26.5 22.247 26.5 17"
      stroke="#C7FFBE"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="21" cy="12.5" r="3" fill="#C7FFBE" />
    <path
      d="M12.5 17L15.5 20L21.5 13.5"
      stroke="#C7FFBE"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const navItems = [
  { label: 'Home', href: '#top' },
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
];

export const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'vitals' | 'records' | 'appointments'>('vitals');

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const navActionsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);


  const closeMenu = () => setIsMenuOpen(false);

  // Restrained elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entrance & ScrollTrigger Animations
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Navbar floating pill entrance
      const navTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (headerRef.current) {
        navTl.fromTo(headerRef.current, { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 });
      }
      if (logoRef.current) {
        navTl.fromTo(logoRef.current, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, '-=0.35');
      }
      if (navLinksRef.current) {
        navTl.fromTo(
          navLinksRef.current.children,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.06 },
          '-=0.25'
        );
      }
      if (navActionsRef.current) {
        navTl.fromTo(
          navActionsRef.current.children,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.08 },
          '-=0.2'
        );
      }

      // 2. Section 2: Hero Entrance & Parallax
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(
          '.gsap-hero-badge',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.1 }
        )
        .fromTo(
          '.gsap-hero-title',
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          '-=0.35'
        )
        .fromTo(
          '.gsap-hero-desc',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          '-=0.4'
        )
        .fromTo(
          '.gsap-hero-actions > *',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 },
          '-=0.35'
        )
        .fromTo(
          '.gsap-hero-pills > *',
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          '-=0.3'
        );

      // Hero Visual Card Lift
      gsap.fromTo(
        '.gsap-hero-visual',
        { y: 35, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out', delay: 0.2 }
      );

      // Subtle Hero Visual Parallax on scroll
      gsap.to('.hero-image-parallax', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // 3. Section 3: Trust & Value Foundation
      gsap.fromTo(
        '#about .section-header',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about .section-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.value-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.13,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#value-cards-container',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 4. Section 4: Main Features / Platform Capabilities
      gsap.fromTo(
        '#solutions .section-header',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#solutions .section-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.gsap-feature-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#features-container',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 5. Section 5: How It Works
      gsap.fromTo(
        '#how-it-works-section .section-header',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#how-it-works-section .section-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.gsap-step-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#steps-container',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 6. Section 6: Clinical Cockpit Showcase
      gsap.fromTo(
        '#platform .section-header',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#platform .section-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.cockpit-mockup',
        { y: 38, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cockpit-mockup',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.to('.cockpit-ambient-glow', {
        scale: 1.25,
        opacity: 0.14,
        scrollTrigger: {
          trigger: '#platform',
          start: 'top 75%',
          end: 'bottom 25%',
          scrub: 1.2,
        },
      });

      // 7. Section 7: Benefits
      gsap.fromTo(
        '#benefits-section .section-header',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#benefits-section .section-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        '.benefit-card',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#benefits-container',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 8. Section 8: Final CTA
      gsap.fromTo(
        '#final-cta-content',
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#final-cta-content',
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 9. Section 9: Footer
      gsap.fromTo(
        'footer .footer-col',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: 'footer',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, mainContainerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Mobile menu open/close transition, Escape listener & scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.24, ease: 'power2.out' }
        );
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll('.aivora-mobile-item'),
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, stagger: 0.05, delay: 0.05, ease: 'power2.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // ── 3D Hero Tilt + Card Hover-Tilt ──────────────────────────────────────
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const heroSection = heroSectionRef.current;
    const heroCard = heroVisualRef.current;

    // ── 1. Hero card: 3D tilt on mouse (desktop) ──────────────────────────
    if (heroSection && heroCard) {
      const MAX_TILT = 8; // degrees
      const quickX = gsap.quickTo(heroCard, 'rotateY', { duration: 0.55, ease: 'power2.out' });
      const quickY = gsap.quickTo(heroCard, 'rotateX', { duration: 0.55, ease: 'power2.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = heroSection.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2); // -1 … 1
        const dy = (e.clientY - cy) / (rect.height / 2); // -1 … 1
        quickX(dx * MAX_TILT);
        quickY(-dy * MAX_TILT);
      };

      const handleMouseLeave = () => {
        gsap.to(heroCard, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });
      };

      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);

      // Mobile: gentle looping oscillation instead of mouse tracking
      const isMobile = window.matchMedia('(hover: none)').matches;
      let mobileAnim: gsap.core.Tween | null = null;
      if (isMobile) {
        mobileAnim = gsap.to(heroCard, {
          rotateY: 3,
          rotateX: -2,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      return () => {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
        mobileAnim?.kill();
        gsap.killTweensOf(heroCard);
      };
    }

    // ── 2. Card hover-tilt (feature + value + step cards) ─────────────────
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const CARD_TILT = 6;
    const cardSelectors = [
      '.gsap-feature-card',
      '.value-card',
      '.gsap-step-item',
      '.benefit-card',
    ];

    type CleanupFn = () => void;
    const cleanupFns: CleanupFn[] = [];

    cardSelectors.forEach((sel) => {
      const cards = document.querySelectorAll<HTMLElement>(sel);
      cards.forEach((card) => {
        const qx = gsap.quickTo(card, 'rotateY', { duration: 0.35, ease: 'power2.out' });
        const qy = gsap.quickTo(card, 'rotateX', { duration: 0.35, ease: 'power2.out' });

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
          const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
          card.style.willChange = 'transform';
          qx(dx * CARD_TILT);
          qy(-dy * CARD_TILT);
          // Lift the icon inside the card
          const icon = card.querySelector<HTMLElement>('.card-icon-inner');
          if (icon) gsap.to(icon, { z: 8, duration: 0.3, ease: 'power2.out' });
        };

        const onLeave = () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
          card.style.willChange = '';
          const icon = card.querySelector<HTMLElement>('.card-icon-inner');
          if (icon) gsap.to(icon, { z: 0, duration: 0.4, ease: 'power2.out' });
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
          gsap.killTweensOf(card);
        });
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  return (
    <div ref={mainContainerRef} id="top" className="min-h-screen bg-white text-[#171B1A] antialiased selection:bg-[#C7FFBE] selection:text-[#171B1A]">

      {/* ── SECTION 1: NAVBAR — Floating pill at top → full-width on scroll ── */}
      <div
        className={`sticky z-50 w-full pointer-events-none transition-[top,padding] duration-300 ease-in-out ${isScrolled
            ? 'top-0 pt-0 px-0'
            : 'top-4 sm:top-5 px-4 sm:px-6 lg:px-8'
          }`}
      >
        <header
          ref={headerRef}
          className={`pointer-events-auto mx-auto w-full transition-all duration-300 ease-in-out ${isScrolled
              ? 'max-w-none rounded-none border-b border-white/10 bg-[#171B1A] shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-md h-[66px] sm:h-[70px]'
              : 'max-w-[1240px] rounded-2xl border border-white/[0.12] bg-[#171B1A] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm h-[76px] sm:h-[82px]'
            }`}
        >
          <div
            className={`flex h-full items-center justify-between transition-all duration-300 ease-in-out ${isScrolled
                ? 'mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-12'
                : 'px-5 sm:px-8'
              }`}
          >

            {/* Left: Aivora Logo & Wordmark */}
            <a
              ref={logoRef}
              href="#top"
              aria-label="Aivora Home"
              className="group inline-flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#C7FFBE]/40">
                <AivoraLogo className="h-7 w-7" />
              </div>
              <span className="text-[21px] font-bold tracking-[-0.03em] text-white">Aivora</span>
            </a>

            {/* Center: Navigation Links */}
            <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex lg:gap-10">
              <div ref={navLinksRef} className="flex items-center gap-8 lg:gap-10">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative py-2 text-[14.5px] font-medium tracking-[-0.015em] text-white/75 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#C7FFBE] transition-transform duration-200 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Right: Actions */}
            <div ref={navActionsRef} className="hidden items-center gap-5 md:flex">
              <Link
                to="/login"
                className="rounded-md px-2 py-1.5 text-[14px] font-medium text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="inline-flex h-[42px] items-center justify-center gap-2 rounded-full bg-[#C7FFBE] px-5 text-[13.5px] font-semibold text-[#171B1A] transition-all duration-200 hover:bg-[#b8f5ae] hover:shadow-[0_4px_16px_rgba(199,255,190,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
              >
                Request a demo
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
      </div>

      {/* ── FULL-SCREEN RESPONSIVE MOBILE NAVIGATION OVERLAY ── */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[100] flex flex-col h-[100dvh] w-screen bg-[#171B1A] text-white overflow-y-auto px-6 py-6 md:hidden"
        >
          {/* Top Bar: Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <a
              href="#top"
              aria-label="Aivora Home"
              onClick={closeMenu}
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                <AivoraLogo className="h-7 w-7" />
              </div>
              <span className="text-xl font-bold tracking-[-0.03em] text-white">Aivora</span>
            </a>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Vertical Navigation Links */}
          <div className="flex-1 py-8 flex flex-col justify-center space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="aivora-mobile-item flex items-center justify-between rounded-xl px-4 py-3.5 text-xl font-medium text-white/90 transition-colors hover:bg-white/[0.06] hover:text-[#C7FFBE]"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-white/30" />
              </a>
            ))}
          </div>

          {/* Bottom: Action Buttons */}
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="aivora-mobile-item inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="aivora-mobile-item inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C7FFBE] text-sm font-semibold text-[#171B1A] transition-colors hover:bg-[#b8f5ae]"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ── SECTION 2: HERO (White Background) ── */}
      <section ref={heroSectionRef} id="hero-section" className="relative overflow-hidden bg-white pb-20 pt-16 text-[#171B1A] sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-24">
        {/* Subtle Ambient Glow */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[420px] w-[700px] rounded-full bg-[#C7FFBE]/20 blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

            {/* Left Column: Headline & CTAs */}
            <div className="gsap-hero-content max-w-[640px]">
              <div className="gsap-hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-[#52B441]/25 bg-[#C7FFBE]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#171B1A]">
                <span className="h-2 w-2 rounded-full bg-[#52B441]" />
                Intelligent Healthcare Technology
              </div>

              <h1 className="gsap-hero-title text-[clamp(2.4rem,5.2vw,4.1rem)] font-medium leading-[1.1] tracking-[-0.045em] text-[#171B1A]">
                Smarter health insights. <br className="hidden sm:inline" />
                <span className="text-[#3A9630]">Powered by AI.</span>
              </h1>

              <p className="gsap-hero-desc mt-6 text-base leading-relaxed text-[#606967] sm:text-[18px] sm:leading-[1.65]">
                Discover a more intelligent approach to health technology with Aivora. Turn innovative digital experiences into clearer, more accessible health insights.
              </p>

              <div className="gsap-hero-actions mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
                <Link
                  to="/register"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C7FFBE] px-7 text-sm font-semibold text-[#171B1A] transition-all duration-200 hover:bg-[#b8f5ae] hover:shadow-[0_4px_20px_rgba(199,255,190,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171B1A]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#DDE3E1] bg-white px-7 text-sm font-semibold text-[#171B1A] transition-all duration-200 hover:border-[#AEB8B4] hover:bg-[#F8FAF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171B1A]"
                >
                  Talk to Our Team
                </Link>
              </div>

              {/* Verified Product Core Capabilities */}
              <div className="gsap-hero-pills mt-12 grid grid-cols-3 gap-4 border-t border-[#E8ECEB] pt-8 text-xs text-[#4B5563] sm:text-[13px]">
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-[#52B441]" />
                  <span>Vitals Tracking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 text-[#52B441]" />
                  <span>Appointments</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-[#52B441]" />
                  <span>Electronic Records</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Mockup — 3D tilt wrapper */}
            <div className="gsap-hero-visual relative mx-auto w-full max-w-[560px] lg:ml-auto"
              style={{ perspective: '900px', perspectiveOrigin: 'center center' }}
            >
              {/* heroVisualRef sits on this inner div so rotateX/Y apply in 3D space */}
              <div
                ref={heroVisualRef}
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <div className="relative overflow-hidden rounded-[24px] border border-[#E2E8E6] bg-[#F1F5F4] p-2 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.18)] sm:rounded-[32px]">
                  <div className="relative aspect-[1.12/1] overflow-hidden rounded-[20px] sm:rounded-[26px]">
                    <img
                      src="/doctor-hero.jpg"
                      alt="Clinical care professional utilizing the Aivora digital health interface"
                      className="hero-image-parallax h-full w-full object-cover object-[center_35%]"
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171B1A]/80 via-transparent to-transparent" />

                    {/* Floating Telemetry Badge — counter-translates for layered parallax */}
                    <div
                      className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold text-[#171B1A] shadow-sm backdrop-blur-md"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#52B441]" />
                      Real-time clinical stream
                    </div>

                    {/* Layered Card: Bottom Preview — slightly raised in Z */}
                    <div
                      className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#171B1A]/95 p-4 shadow-xl backdrop-blur-md sm:p-5"
                      style={{ transform: 'translateZ(12px)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C7FFBE]/15 text-[#C7FFBE]">
                            <HeartPulse className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">Active Patient Triage</p>
                            <p className="text-xs text-white/60">Automated vitals monitoring</p>
                          </div>
                        </div>
                        <span className="rounded-md border border-[#C7FFBE]/30 bg-[#C7FFBE]/10 px-2.5 py-1 text-[11px] font-semibold text-[#C7FFBE]">
                          Stable
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                        <div>
                          <p className="text-[10px] text-white/50">Heart Rate</p>
                          <p className="text-xs font-semibold text-white">72 bpm</p>
                        </div>
                        <div className="border-l border-white/10">
                          <p className="text-[10px] text-white/50">Blood Pressure</p>
                          <p className="text-xs font-semibold text-white">120/80</p>
                        </div>
                        <div className="border-l border-white/10">
                          <p className="text-[10px] text-white/50">SpO2</p>
                          <p className="text-xs font-semibold text-white">99%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: TRUST & VALUE INTRODUCTION ── */}
      <section id="about" className="border-t border-[#E8ECEB] bg-white py-20 text-[#171B1A] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mx-auto max-w-[760px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52B441]">
              Value Foundation
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.035em] text-[#171B1A]">
              Technology designed around better health experiences.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#606967] sm:text-lg">
              Aivora delivers a structured clinical ecosystem where healthcare providers and patients experience unified care coordination, accurate records, and clear visibility.
            </p>
          </div>

          <div id="value-cards-container" className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {/* Value Point 1 */}
            <div className="value-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-lg" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-[#171B1A] text-[#C7FFBE]">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Intelligent technology
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Smart workflow routing that unifies appointment calendars, electronic medical records, and digital prescription dispensing in one reliable infrastructure.
              </p>
            </div>

            {/* Value Point 2 */}
            <div className="value-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-lg" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-[#171B1A] text-[#C7FFBE]">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Human-centered experiences
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Crafted for intuitive interaction between practitioners, nurses, and patients, reducing administrative fatigue and putting focus back on clinical care.
              </p>
            </div>

            {/* Value Point 3 */}
            <div className="value-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-lg sm:col-span-2 lg:col-span-1" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-[#171B1A] text-[#C7FFBE]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Clear, accessible insights
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Actionable summaries of patient vitals histories, lab analyses, and treatment plans without information silos or convoluted data structures.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: MAIN FEATURES ── */}
      <section id="solutions" className="border-t border-white/[0.08] bg-[#171B1A] py-20 text-white sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mx-auto max-w-[720px] text-center">
            <span className="inline-block rounded-full border border-[#C7FFBE]/30 bg-[#C7FFBE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#C7FFBE]">
              Platform Capabilities
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.16] tracking-[-0.04em] text-white">
              Engineered for seamless clinical operations.
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Explore the four core pillars powering healthcare facilities and patient engagement on Aivora.
            </p>
          </div>

          <div id="features-container" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Feature 1 */}
            <div className="gsap-feature-card group rounded-2xl border border-white/10 bg-[#1E2322] p-7 transition-colors duration-200 hover:border-[#C7FFBE]/50 hover:bg-[#232928] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-[#C7FFBE] transition-transform duration-200 group-hover:scale-110">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-white">
                AI-Powered Experiences
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                Automated triage recording and longitudinal health marker tracking that flags abnormal vitals indicators proactively for clinical review.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="gsap-feature-card group rounded-2xl border border-white/10 bg-[#1E2322] p-7 transition-colors duration-200 hover:border-[#C7FFBE]/50 hover:bg-[#232928] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-[#C7FFBE] transition-transform duration-200 group-hover:scale-110">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-white">
                Clear & Actionable Information
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                Centralized Electronic Medical Records (EMR) and diagnostic lab reporting organized chronologically with zero visual clutter.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="gsap-feature-card group rounded-2xl border border-white/10 bg-[#1E2322] p-7 transition-colors duration-200 hover:border-[#C7FFBE]/50 hover:bg-[#232928] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-[#C7FFBE] transition-transform duration-200 group-hover:scale-110">
                <CalendarDays className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-white">
                Seamless Digital Interactions
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                Effortless online appointment booking and real-time schedule alignment between specialized doctors and active patients.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="gsap-feature-card group rounded-2xl border border-white/10 bg-[#1E2322] p-7 transition-colors duration-200 hover:border-[#C7FFBE]/50 hover:bg-[#232928] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              <div className="card-icon-inner flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05] text-[#C7FFBE] transition-transform duration-200 group-hover:scale-110">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-white">
                Scalable Technology
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                Multi-tenant role-based security protecting sensitive patient records, billing transactions, and e-prescription authorization.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ── */}
      <section id="how-it-works-section" className="border-t border-[#E8ECEB] bg-[#F8FAFA] py-20 text-[#171B1A] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mx-auto max-w-[700px] text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52B441]">
              Simple Three-Step Progression
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.035em] text-[#171B1A]">
              How Aivora transforms the care journey.
            </h2>
            <p className="mt-4 text-base text-[#606967] sm:text-lg">
              A clear, predictable progression from initial intake to ongoing care.
            </p>
          </div>

          <div id="steps-container" className="mt-16 grid gap-8 md:grid-cols-3">

            {/* Step 1 */}
            <div className="gsap-step-item relative rounded-2xl border border-[#E8ECEB] bg-white p-8 shadow-sm">
              <span className="text-3xl font-extrabold tracking-tight text-[#C7FFBE] drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                01
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Connect
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Onboard doctors, clinical teams, and patients into a secure workspace. Synchronize department schedules and patient profiles instantly.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#171B1A]">
                <CheckCircle2 className="h-4 w-4 text-[#52B441]" />
                Profile & Schedule Sync
              </div>
            </div>

            {/* Step 2 */}
            <div className="gsap-step-item relative rounded-2xl border border-[#E8ECEB] bg-white p-8 shadow-sm">
              <span className="text-3xl font-extrabold tracking-tight text-[#C7FFBE] drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                02
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Understand
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Capture and visualize vital signs, historical records, and lab findings in real-time dashboards that highlight critical trends.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#171B1A]">
                <CheckCircle2 className="h-4 w-4 text-[#52B441]" />
                Unified Health History
              </div>
            </div>

            {/* Step 3 */}
            <div className="gsap-step-item relative rounded-2xl border border-[#E8ECEB] bg-white p-8 shadow-sm">
              <span className="text-3xl font-extrabold tracking-tight text-[#C7FFBE] drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                03
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Take the Next Step
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Issue validated digital prescriptions, schedule follow-ups, and provide patients with transparent access through their dedicated portal.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#171B1A]">
                <CheckCircle2 className="h-4 w-4 text-[#52B441]" />
                Actionable Follow-up Care
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 6: FEATURED PLATFORM / PRODUCT SHOWCASE ── */}
      <section id="platform" className="relative overflow-hidden border-t border-white/[0.08] bg-[#171B1A] py-20 text-white sm:py-24 lg:py-28">
        {/* Subtle Ambient Parallax Glow */}
        <div aria-hidden="true" className="cockpit-ambient-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-[#C7FFBE]/[0.08] blur-[140px]" />

        <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mx-auto max-w-[760px] text-center">
            <span className="inline-block rounded-full border border-[#C7FFBE]/30 bg-[#C7FFBE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#C7FFBE]">
              Interactive Showcase
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.16] tracking-[-0.04em] text-white">
              The Aivora clinical cockpit.
            </h2>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Experience the unified dashboard bringing vitals telemetry, medical histories, and appointments into one high-efficiency view.
            </p>
          </div>

          {/* Interactive Mockup Container */}
          <div className="cockpit-mockup mt-16 overflow-hidden rounded-[24px] border border-white/15 bg-[#1B201F] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)]">

            {/* Top Mockup Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#141817] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-[#FF5F56]" />
                <span className="flex h-3 w-3 rounded-full bg-[#FFBD2E]" />
                <span className="flex h-3 w-3 rounded-full bg-[#27C93F]" />
                <span className="ml-3 text-xs font-medium text-white/50">aivora.app/workspace/clinical</span>
              </div>

              {/* Tab Toggles */}
              <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('vitals')}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${activeTab === 'vitals'
                      ? 'bg-[#C7FFBE] text-[#171B1A]'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  Vitals Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('records')}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${activeTab === 'records'
                      ? 'bg-[#C7FFBE] text-[#171B1A]'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  Medical Records
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all ${activeTab === 'appointments'
                      ? 'bg-[#C7FFBE] text-[#171B1A]'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  Schedule
                </button>
              </div>
            </div>

            {/* Mockup Body Content */}
            <div className="p-6 sm:p-8">
              {activeTab === 'vitals' && (
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-[#161B1A] p-5">
                    <p className="text-xs font-medium text-white/50">Resting Heart Rate</p>
                    <p className="mt-2 text-3xl font-semibold text-white">68 <span className="text-sm font-normal text-white/50">bpm</span></p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-[#52B441]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Optimal resting cadence
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#161B1A] p-5">
                    <p className="text-xs font-medium text-white/50">Blood Pressure</p>
                    <p className="mt-2 text-3xl font-semibold text-white">118/78 <span className="text-sm font-normal text-white/50">mmHg</span></p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-[#52B441]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Normotensive range
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#161B1A] p-5">
                    <p className="text-xs font-medium text-white/50">Oxygen Saturation</p>
                    <p className="mt-2 text-3xl font-semibold text-white">99% <span className="text-sm font-normal text-white/50">SpO2</span></p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-[#52B441]">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Target saturation confirmed
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'records' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#161B1A] p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#C7FFBE]" />
                      <div>
                        <p className="font-semibold text-white">Comprehensive Metabolic Panel (CMP)</p>
                        <p className="text-xs text-white/50">Validated by Pathology Lab &bull; ID #LAB-9042</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-[#52B441]/10 px-2.5 py-1 text-xs font-semibold text-[#52B441]">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#161B1A] p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Pill className="h-5 w-5 text-[#C7FFBE]" />
                      <div>
                        <p className="font-semibold text-white">Digital Prescription: Amoxicillin 500mg</p>
                        <p className="text-xs text-white/50">Routed to Hospital In-House Pharmacy</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-[#52B441]/10 px-2.5 py-1 text-xs font-semibold text-[#52B441]">
                      Dispensed
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#161B1A] p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-[#C7FFBE]" />
                      <div>
                        <p className="font-semibold text-white">Cardiology Consultation &bull; Dr. Sarah Jenkins</p>
                        <p className="text-xs text-white/50">Tomorrow at 10:30 AM &bull; Room 302</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-[#C7FFBE]/15 px-2.5 py-1 text-xs font-semibold text-[#C7FFBE]">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#161B1A] p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarDays className="h-5 w-5 text-[#C7FFBE]" />
                      <div>
                        <p className="font-semibold text-white">Routine Vitals Check-in &bull; Telehealth Room</p>
                        <p className="text-xs text-white/50">Friday at 2:00 PM &bull; Patient Portal</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/70">
                      Scheduled
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between border-t border-white/10 pt-5 text-xs text-white/60">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C7FFBE]" />
                  Protected Health Information (PHI) &bull; End-to-End Encryption
                </span>
                <Link to="/register" className="font-semibold text-[#C7FFBE] hover:underline">
                  Explore Full Workspace &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: BENEFITS ── */}
      <section id="benefits-section" className="border-t border-[#E8ECEB] bg-white py-20 text-[#171B1A] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="section-header mx-auto max-w-[720px] text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52B441]">
              Measurable Advantages
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,3.8vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.035em] text-[#171B1A]">
              Why clinical teams choose Aivora.
            </h2>
          </div>

          <div id="benefits-container" className="mt-16 grid gap-8 md:grid-cols-2">

            {/* Benefit 1 */}
            <div className="benefit-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#171B1A] text-[#C7FFBE]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Simplicity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                A single unified workspace replaces fragmented portals for appointments, patient histories, and pharmacy stock, eliminating cognitive burden for staff.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="benefit-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#171B1A] text-[#C7FFBE]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Clarity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Clinical records presented in modern, legible typography with structured data views designed specifically for fast-paced healthcare environments.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="benefit-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#171B1A] text-[#C7FFBE]">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                Thoughtful Technology
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Real-world clinical workflows built with precision: role-aware dashboards for physicians, triage personnel, administrative staff, and patients.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="benefit-card rounded-2xl border border-[#E8ECEB] bg-[#F8FAFA] p-8 transition-shadow duration-200 hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#171B1A] text-[#C7FFBE]">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#171B1A]">
                A More Connected Digital Experience
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#606967]">
                Continuous connection between in-clinic medical consultations and ongoing patient monitoring through secure portal access.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 8: FINAL CTA ── */}
      <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#171B1A] py-20 text-white sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[360px] w-[600px] rounded-full bg-[#C7FFBE]/[0.08] blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1360px] px-4 text-center sm:px-6 lg:px-8">
          <div id="final-cta-content" className="mx-auto max-w-[740px]">
            <h2 className="text-[clamp(2.2rem,4.8vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.04em] text-white">
              Let's shape a smarter <br />
              <span className="text-[#C7FFBE]">health experience.</span>
            </h2>
            <p className="mt-6 text-base text-white/70 sm:text-lg">
              Explore how Aivora can support your next step in healthcare technology.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C7FFBE] px-8 text-sm font-semibold text-[#171B1A] transition-all duration-200 hover:bg-[#b8f5ae] hover:shadow-[0_4px_20px_rgba(199,255,190,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
              >
                Talk to Our Team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-8 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FFBE]"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FOOTER ── */}
      <footer className="border-t border-white/10 bg-[#111413] py-14 text-white sm:py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 md:grid-cols-4 lg:gap-12">

            {/* Brand column */}
            <div className="footer-col md:col-span-2">
              <a href="#top" className="inline-flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <AivoraLogo className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold tracking-[-0.03em] text-white">Aivora</span>
              </a>
              <p className="mt-4 max-w-[380px] text-sm leading-relaxed text-white/60">
                Intelligent digital healthcare platform streamlining clinical workflows, patient appointments, electronic medical records, and vitals monitoring.
              </p>
              <p className="mt-6 text-xs text-white/40">
                &copy; 2026 Aivora Health Technologies. All rights reserved.
              </p>
            </div>

            {/* Navigation links */}
            <div className="footer-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                Navigation
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                <li><a href="#top" className="transition-colors hover:text-[#C7FFBE]">Home</a></li>
                <li><a href="#platform" className="transition-colors hover:text-[#C7FFBE]">Platform</a></li>
                <li><a href="#solutions" className="transition-colors hover:text-[#C7FFBE]">Solutions</a></li>
                <li><a href="#about" className="transition-colors hover:text-[#C7FFBE]">About</a></li>
              </ul>
            </div>

            {/* Verified Clinical Modules */}
            <div className="footer-col">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90">
                Clinical Portals
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                <li><Link to="/login" className="transition-colors hover:text-[#C7FFBE]">Doctor Workspace</Link></li>
                <li><Link to="/login" className="transition-colors hover:text-[#C7FFBE]">Patient Portal</Link></li>
                <li><Link to="/register" className="transition-colors hover:text-[#C7FFBE]">Request Access</Link></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6 text-xs text-white/50">
            <p>Role-based access control &bull; HIPAA & GDPR compliance architectural standards</p>
            <p>Designed with care for healthcare professionals.</p>
          </div>

        </div>
      </footer>

    </div>
  );
};
