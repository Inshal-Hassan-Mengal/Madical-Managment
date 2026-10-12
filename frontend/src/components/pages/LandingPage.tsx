import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  HeartPulse,
  MessageCircle,
  Pill,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: HeartPulse,
    title: 'Health trends',
    description: 'Review clear patient health summaries and track important readings over time.',
    accent: 'from-blue-500 to-blue-700',
  },
  {
    icon: MessageCircle,
    title: 'Care team updates',
    description: 'Keep conversations and care updates connected to the people who need them.',
    accent: 'from-sky-500 to-cyan-600',
  },
  {
    icon: CalendarDays,
    title: 'Appointments',
    description: 'Coordinate follow-ups and daily schedules in one shared clinic workspace.',
    accent: 'from-indigo-500 to-blue-700',
  },
];

const trendBars = [
  'h-[42%]', 'h-[57%]', 'h-[50%]', 'h-[73%]', 'h-[64%]', 'h-[88%]',
  'h-[76%]', 'h-full', 'h-[82%]', 'h-[94%]', 'h-[74%]', 'h-full',
];
const miniChartBars = ['h-[42%]', 'h-[62%]', 'h-[48%]', 'h-[75%]', 'h-[58%]', 'h-[86%]', 'h-[69%]', 'h-full'];
const alertBarWidths = [
  'w-[34%]', 'w-[52%]', 'w-[41%]', 'w-[66%]', 'w-[59%]', 'w-[78%]', 'w-[63%]', 'w-[88%]',
];
const menuItems = ['Solutions', 'Features', 'Product', 'Pricing'];

export const MedicalLogoMark: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M39 4h22v9c0 13-7 22-16 31l-8 8-15-15 8-8c6-6 9-13 9-22V4Z" fill="#2563EB" />
    <path d="M96 39v22h-9c-13 0-22-7-31-16l-8-8 15-15 8 8c6 6 13 9 22 9h3Z" fill="#2563EB" />
    <path d="M61 96H39v-9c0-13 7-22 16-31l8-8 15 15-8 8c-6 6-9 13-9 22v3Z" fill="#2563EB" />
    <path d="M4 61V39h9c13 0 22 7 31 16l8 8-15 15-8-8c-6-6-13-9-22-9H4Z" fill="#2563EB" />
  </svg>
);

export const LandingPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeAuthAction, setActiveAuthAction] = useState<'login' | 'signup'>('login');

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const entrance = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.45 },
      });

      entrance
        .from('header > *', { autoAlpha: 0, y: -12, stagger: 0.06 })
        .from(
          '.landing-hero-item:not(.landing-dashboard-preview)',
          { autoAlpha: 0, y: 18, stagger: 0.08 },
          '<0.08',
        )
        .from(
          '.landing-dashboard-preview',
          { autoAlpha: 0, y: 20, scale: 0.99, duration: 0.55 },
          '<0.08',
        );

      const scrollRevealTargets = gsap.utils.toArray<HTMLElement>(
        '.landing-dashboard-card, .landing-section-heading, .landing-feature-card, .landing-info-card, .landing-footer-item',
      );

      scrollRevealTargets.forEach((element) => {
        const siblingIndex = element.parentElement
          ? Array.from(element.parentElement.children).indexOf(element)
          : 0;

        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 16, scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            delay: Math.min(siblingIndex, 3) * 0.045,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none play reverse',
            },
          },
        );
      });
    }, page);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white font-sans text-slate-900">
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-300 via-sky-300 to-sky-100">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_52%,rgba(255,255,255,0.42),transparent_20%),radial-gradient(ellipse_at_85%_70%,rgba(255,255,255,0.35),transparent_24%),radial-gradient(ellipse_at_48%_100%,rgba(255,255,255,0.5),transparent_38%)]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-0 -z-10 h-64 w-full bg-gradient-to-t from-white/70 to-transparent" />

        <header className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-5 sm:px-8 lg:px-12">
          <Link
            to="/"
            aria-label="MedManage home"
            className="inline-flex shrink-0 items-center gap-2.5 rounded-lg text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300"
          >
            <span className="flex h-9 w-9 items-center justify-center">
              <MedicalLogoMark className="h-8 w-8" />
            </span>
            <span className="text-base font-semibold tracking-tight sm:text-lg">MedManage</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/40 bg-white/15 p-1.5 shadow-sm backdrop-blur-md md:flex"
          >
            {menuItems.map((item) => (
              <a
                key={item}
                href="#features"
                className="rounded-full px-4 py-2 text-xs font-medium text-slate-800/85 transition hover:bg-white/50 hover:text-slate-950"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center rounded-full border border-white/60 bg-white/25 p-1 shadow-sm backdrop-blur-sm">
            <Link
              to="/login"
              onClick={() => setActiveAuthAction('login')}
              aria-current={activeAuthAction === 'login' ? 'page' : undefined}
              className={`inline-flex min-h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition-[background-color,color,border-color] duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:min-h-9 sm:px-4 sm:text-sm ${
                activeAuthAction === 'login'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-transparent text-slate-900 hover:bg-white/60'
              }`}
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setActiveAuthAction('signup')}
              aria-current={activeAuthAction === 'signup' ? 'page' : undefined}
              className={`inline-flex min-h-8 items-center justify-center rounded-full px-3 text-xs font-semibold transition-[background-color,color,border-color] duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:min-h-9 sm:px-4 sm:text-sm ${
                activeAuthAction === 'signup'
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'bg-transparent text-slate-900 hover:bg-white/60'
              }`}
            >
              Sign up
            </Link>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-[1120px] px-5 pb-0 pt-5 text-center sm:px-8 sm:pt-8 lg:pt-9">
            <p className="landing-hero-item mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/25 px-4 py-2 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm">
              <span className="flex -space-x-1.5">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&h=80&q=80"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full border border-sky-200 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=80&h=80&q=80"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full border border-sky-200 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=80&h=80&q=80"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full border border-sky-200 object-cover"
                />
              </span>
              <span>Care teams, connected</span>
            </p>
            <h1 className="landing-hero-item dashboard-title mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-5xl">
              Better way to support patients
              <br className="hidden sm:block" /> digitally and efficiently
            </h1>
            <p className="landing-hero-item mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-800/80 sm:text-base sm:leading-7">
              Medical Management brings clinic workflows into one clear workspace for care
              teams, patient records, appointments and everyday updates.
            </p>
            <div className="landing-hero-item mt-4 flex flex-wrap justify-center gap-3">
              <Link
                to="/login"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-xs font-semibold text-white shadow-md transition hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-200 sm:text-sm"
              >
                Get Started <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                to="/login"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/80 bg-white/90 px-5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-200 sm:text-sm"
              >
                View Dashboard Demo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="landing-hero-item landing-dashboard-preview mx-auto mt-7 w-full max-w-[1120px] rounded-t-[22px] border border-white/75 bg-white/35 p-2.5 shadow-[0_30px_80px_-32px_rgba(15,44,82,0.34)] backdrop-blur-sm sm:mt-9 sm:rounded-t-[28px] sm:p-3.5">
              <div className="overflow-hidden rounded-t-[15px] border border-slate-200/80 bg-white text-left shadow-sm sm:rounded-t-[20px]">
                <div className="flex h-12 items-center justify-between gap-3 border-b border-slate-100 px-4 sm:h-14 sm:px-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-slate-800">
                      <span className="flex h-6 w-6 items-center justify-center">
                        <MedicalLogoMark className="h-5 w-5" />
                      </span>
                      <span className="hidden sm:inline">MedManage</span>
                    </div>
                    <nav aria-label="Dashboard preview" className="hidden items-center gap-1 sm:flex">
                      <span className="rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white">Dashboard</span>
                      <span className="rounded-full px-2.5 py-1.5 text-[10px] text-slate-500">My Health</span>
                      <span className="rounded-full px-2.5 py-1.5 text-[10px] text-slate-500">Appointments</span>
                      <span className="rounded-full px-2.5 py-1.5 text-[10px] text-slate-500">Reports</span>
                      <span className="rounded-full px-2.5 py-1.5 text-[10px] text-slate-500">Messages</span>
                    </nav>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <Search className="hidden h-3.5 w-3.5 text-slate-400 sm:block" aria-hidden="true" />
                    <Bell className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                    <span className="hidden h-5 w-px bg-slate-200 sm:block" />
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=112&h=112&q=80"
                      alt="Marian Reed"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="hidden text-[10px] font-semibold text-slate-700 sm:block">Marian Reed</span>
                    <ChevronDown className="hidden h-3 w-3 text-slate-400 sm:block" aria-hidden="true" />
                  </div>
                </div>

                <div className="p-3 sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">Welcome back, Marian</p>
                      <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">Here’s a quick overview of your clinic and upcoming activities.</p>
                    </div>
                    <span className="inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[10px] font-semibold text-white shadow-sm">
                      <span className="text-sm leading-none">+</span> New Appointment
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                    <article className="landing-dashboard-card min-h-[130px] rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Health Alerts</span>
                        <HeartPulse className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                      </div>
                      <p className="mt-1 text-[9px] leading-4 text-slate-500">Patient readings and alerts for today.</p>
                      <div className="mt-3 flex items-end gap-1">
                        {alertBarWidths.map((widthClass, index) => (
                          <span key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-blue-100">
                            <span className={`block h-full rounded-full bg-blue-500 ${widthClass}`} />
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-slate-400"><span>Mon</span><span>Today</span></div>
                    </article>

                    <article className="landing-dashboard-card min-h-[130px] rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Health Trend</span>
                        <Activity className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-4 flex h-16 items-end gap-1.5">
                        {miniChartBars.map((heightClass, index) => (
                          <span
                            key={index}
                            className={`flex-1 rounded-t-md ${heightClass} ${index === 3 || index === 6 ? 'bg-blue-300' : 'bg-gradient-to-t from-blue-700 to-blue-500'}`}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-slate-400"><span>Week 1</span><span>Week 4</span></div>
                    </article>

                    <article className="landing-dashboard-card min-h-[130px] rounded-xl bg-blue-600 p-3 text-white shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold">Care Team Update</span>
                        <MessageCircle className="h-3.5 w-3.5 text-blue-100" aria-hidden="true" />
                      </div>
                      <p className="mt-3 text-[10px] font-semibold leading-4">Your recent checkup results are improving.</p>
                      <p className="mt-1 text-[9px] leading-4 text-blue-100">Your care team shared an update with you.</p>
                      <span className="mt-2 inline-block text-[8px] font-semibold text-white underline underline-offset-2">View update</span>
                    </article>

                    <article className="landing-dashboard-card min-h-[130px] rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Recent Activity</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <div className="mt-3 space-y-2.5">
                        {[
                          ['Vitals updated', 'Today, 9:20 AM'],
                          ['Appointment booked', 'Today, 8:45 AM'],
                        ].map(([title, time]) => (
                          <div key={title} className="flex items-start gap-2">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-blue-600">
                              <Check className="h-2.5 w-2.5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block truncate text-[9px] font-medium text-slate-700">{title}</span>
                              <span className="block text-[8px] text-slate-400">{time}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>

                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:mt-3 sm:grid-cols-[1.05fr_1.2fr_0.95fr] sm:gap-3">
                    <article className="landing-dashboard-card rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Upcoming Checkups</span>
                        <ChevronDown className="h-3 w-3 text-slate-400" aria-hidden="true" />
                      </div>
                      <div className="mt-3 space-y-2.5">
                        {[
                          ['Blood Test', 'Today · 10:30 AM'],
                          ['Doctor Consultation', 'Tomorrow · 9:00 AM'],
                        ].map(([title, time]) => (
                          <div key={title} className="flex items-center gap-2">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                              <CalendarDays className="h-3 w-3" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[9px] font-medium text-slate-700">{title}</span>
                              <span className="block text-[8px] text-slate-400">{time}</span>
                            </span>
                            <span className="rounded-full bg-emerald-50 px-1.5 py-1 text-[7px] font-semibold text-emerald-700">Scheduled</span>
                          </div>
                        ))}
                      </div>
                    </article>

                    <article className="landing-dashboard-card rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Recovery Progress</span>
                        <span className="text-[8px] font-medium text-slate-400">This month</span>
                      </div>
                      <div className="mt-3 flex h-[74px] items-end gap-1.5 border-b border-slate-100 px-1">
                        {trendBars.map((heightClass, index) => (
                          <span
                            key={index}
                            className={`flex-1 rounded-t-md ${heightClass} ${index === 5 || index === 9 ? 'bg-blue-300' : 'bg-gradient-to-t from-blue-700 to-blue-500'}`}
                          />
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between text-[8px] text-slate-400"><span>May 01</span><span>May 15</span><span>May 30</span></div>
                    </article>

                    <article className="landing-dashboard-card rounded-xl border border-slate-100 bg-white p-3 shadow-sm sm:p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-slate-800">Care Team</span>
                        <Users className="h-3 w-3 text-slate-400" aria-hidden="true" />
                      </div>
                      <div className="mt-3 space-y-2.5">
                        {[
                          ['Dr. Leslie', 'Primary doctor', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=96&h=96&q=80'],
                          ['Dr. Maria Chen', 'Cardiologist', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=96&h=96&q=80'],
                        ].map(([name, role, imageUrl]) => (
                          <div key={name} className="flex items-center gap-2">
                            <img src={imageUrl} alt={name} className="h-6 w-6 shrink-0 rounded-full object-cover" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[9px] font-medium text-slate-700">{name}</span>
                              <span className="block text-[8px] text-slate-400">{role}</span>
                            </span>
                            <MessageCircle className="h-3 w-3 text-slate-400" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section id="features" aria-labelledby="features-title" className="relative bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[1120px]">
          <div className="landing-section-heading mb-9 flex flex-col gap-5 sm:mb-11 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Medical Management / MedManage</p>
              <h2 id="features-title" className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                MedManage simplifies how patients interact with healthcare
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              A patient-centered portal designed to reduce confusion, improve engagement and help clinics deliver better care digitally.
            </p>
          </div>

          <div className="landing-feature-grid grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description, accent }) => (
              <article key={title} className="landing-feature-card flex h-full min-h-[270px] flex-col rounded-3xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm shadow-slate-900/[0.04] sm:p-5">
                <div className="flex flex-1 flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  {title === 'Health trends' ? (
                    <div aria-hidden="true" className="mt-5 flex h-24 items-end gap-2 rounded-xl bg-slate-50 px-3 pt-3">
                      {miniChartBars.slice(0, 6).map((heightClass, index) => (
                        <span key={index} className={`flex-1 rounded-t-md ${heightClass} ${index === 2 ? 'bg-sky-300' : `bg-gradient-to-t ${accent}`}`} />
                      ))}
                    </div>
                  ) : title === 'Care team updates' ? (
                    <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[9px] font-bold text-blue-800">DL</span>
                        <span className="text-[10px] font-semibold text-slate-700">Dr. Leslie <span className="font-normal text-slate-400">· 10:24 AM</span></span>
                      </div>
                      <p className="rounded-lg bg-white p-2.5 text-[10px] leading-4 text-slate-600 shadow-sm">Your latest results are looking good. Keep up your progress!</p>
                    </div>
                  ) : (
                    <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-3">
                      {[
                        ['Blood Test', '09:30 AM'],
                        ['Doctor Consultation', '11:00 AM'],
                        ['Follow Up', '02:15 PM'],
                      ].map(([appointment, time]) => (
                        <div key={appointment} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-sm">
                          <CalendarDays className="h-3 w-3 shrink-0 text-blue-600" aria-hidden="true" />
                          <span className="flex-1 truncate text-[9px] font-medium text-slate-700">{appointment}</span>
                          <span className="shrink-0 rounded-full bg-blue-50 px-1.5 py-1 text-[8px] font-semibold text-blue-700">{time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-4 flex-1 text-xs leading-5 text-slate-600">{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: 'Secure by design', text: 'Patient information stays organized with role-based access.' },
              { icon: ClipboardList, title: 'Easy to navigate', text: 'A clear, simple workspace for everyday clinic tasks.' },
              { icon: Pill, title: 'Connected workflows', text: 'Records, prescriptions and appointments work together.' },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="landing-info-card flex h-full min-h-36 items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-blue-700">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-600">{text}</p>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="landing-footer-item font-semibold text-slate-800">MedManage</Link>
          <span className="landing-footer-item">Medical Management for connected care teams.</span>
        </div>
      </footer>
    </div>
  );
};
