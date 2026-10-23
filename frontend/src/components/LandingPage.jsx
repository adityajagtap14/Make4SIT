import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import Hyperspeed from './Hyperspeed';
import { useTheme } from '../context/ThemeContext';
import { FileText, Shield, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';


const features = [
  { icon: FileText, title: "Zero-Error PDFs", desc: "20+ page VTU-format reports generated automatically. No more formatting headaches.", color: "from-teal-500 to-teal-700" },
  { icon: Shield, title: "Faculty Approval", desc: "Reports go directly to your guide. One click to approve with an official stamp.", color: "from-slate-600 to-slate-800" },
  { icon: Users, title: "Department-Wise", desc: "CSE, AIML, Civil, EEE, ECE — faculty filtered by your department automatically.", color: "from-amber-500 to-amber-600" },
  { icon: Zap, title: "Instant Generation", desc: "Puppeteer renders your report in under 500ms. Download immediately.", color: "from-teal-400 to-emerald-600" },
];

const steps = [
  { num: "01", title: "Register & Login", desc: "Create your student account with your VTU details." },
  { num: "02", title: "Upload Photos", desc: "Add activity evidence photos for all three NSS activities." },
  { num: "03", title: "Submit for Review", desc: "Your report appears instantly on your faculty guide's dashboard." },
  { num: "04", title: "Download PDF", desc: "Once approved, download your perfectly formatted 20+ page report." },
];

const hyperspeedOptions = {
  colors: {
    shoulderLines: 0x0d9488, // Teal
    brokenLines: 0x0f766e, // Dark Teal
    leftCars: [0x0d9488, 0x1e293b, 0xf59e0b], // Teal, Slate, Amber
    rightCars: [0x14b8a6, 0x334155, 0xfcd34d], // Light Teal, Slate, Amber
    sticks: 0x0d9488 // Teal
  }
};

export default function LandingPage() {
  useScrollAnimation();
  const { isDark } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* ========== FULL-SCREEN HYPERSPEED BACKGROUND ========== */}
      <div className="fixed inset-0 -z-10 pointer-events-none blur-[3px] opacity-80 dark:opacity-60 transition-opacity duration-500">
        <Hyperspeed
          lightMode={!isDark}
          effectOptions={hyperspeedOptions}
        />
      </div>

      {/* Floating Orbs */}
      <div className="orb orb-brand w-[500px] h-[500px] -top-40 -right-40 animate-float" />
      <div className="orb orb-accent w-[400px] h-[400px] top-[60vh] -left-40 animate-float-delayed" />
      <div className="orb orb-cyan w-[350px] h-[350px] top-[120vh] right-0 animate-float" />

      {/* ========== HERO ========== */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden border-b border-surface-200/20 dark:border-surface-800/20">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-10">
          <div data-animate="fade-up" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-bold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse-soft" />
            MAKE4SIT HACKATHON 2026
          </div>

          <h1 data-animate="fade-up" data-delay="1" className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            <span className="text-surface-900 dark:text-surface-100">Zero-Error</span>
            <br />
            <span className="text-gradient">Report Generator</span>
          </h1>

          <p data-animate="fade-up" data-delay="2" className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate formatting errors forever. Upload your photos, select your faculty guide, and download a perfectly formatted VTU-standard NSS report in seconds.
          </p>

          <div data-animate="fade-up" data-delay="3" className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link to="/signup" className="btn-primary text-base px-8 py-4 rounded-2xl group flex items-center gap-2 shadow-lg">
              Student NSS Portal
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-4 rounded-2xl">
              Sign In to Portal
            </Link>
          </div>

          {/* Trust indicators */}
          <div data-animate="fade-up" data-delay="4" className="mt-16 flex items-center justify-center gap-6 sm:gap-8 text-surface-400 text-sm flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> VTU Standard Formats</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Instant PDF Generation</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Faculty Review & Approval</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-500" /> Zero-Error Reports</span>
          </div>
        </div>
      </section>


      {/* ========== FEATURES (SCROLL STACK) ========== */}
      <section className="relative py-24 bg-mesh">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p data-animate="fade-up" className="text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Features</p>
            <h2 data-animate="fade-up" data-delay="1" className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-surface-100">
              Everything you need,<br />nothing you don't.
            </h2>
          </div>

          <div data-animate="fade-up" data-delay="2" className="h-[80vh] w-full max-w-3xl mx-auto rounded-[3rem] overflow-hidden border border-surface-200/50 dark:border-surface-700/50 shadow-2xl bg-white/40 dark:bg-surface-900/40 backdrop-blur-3xl relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <div className="w-2 h-2 rounded-full bg-surface-300" />
              <div className="w-12 h-2 rounded-full bg-surface-300" />
              <div className="w-2 h-2 rounded-full bg-surface-300" />
            </div>
            <ScrollStack
              itemDistance={100}
              itemScale={0.04}
              baseScale={0.88}
              stackPosition="15%"
              scaleEndPosition="5%"
            >
              {features.map((f, i) => (
                <ScrollStackItem key={f.title} itemClassName={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 bg-gradient-to-br ${f.color} p-8 sm:p-10 shadow-2xl border-0 !h-auto text-white`}>
                  <div className="w-20 h-20 rounded-[1.5rem] bg-white/20 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-md border border-white/30">
                    <f.icon className="w-10 h-10 text-white drop-shadow-md" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white mb-3 drop-shadow-sm">{f.title}</h3>
                    <p className="text-lg text-white/90 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <p data-animate="fade-up" className="text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">Process</p>
            <h2 data-animate="fade-up" data-delay="1" className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-surface-100">
              Four steps to a perfect report.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} data-animate="fade-up" data-delay={i + 1} className="relative group">
                <div className="text-6xl font-black text-brand-100 dark:text-brand-900 group-hover:text-brand-200 dark:group-hover:text-brand-800 transition-colors duration-500 mb-4 select-none">{s.num}</div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-2">{s.title}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-brand-200 dark:text-brand-800">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div data-animate="scale" className="relative overflow-hidden rounded-3xl p-12 sm:p-16 text-center" style={{ background: 'linear-gradient(135deg, #0f766e, #0d9488, #115e59)' }}>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Ready to generate your report?
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
                Join your classmates and never worry about formatting errors again.
              </p>
              <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-teal-700 font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]">
                Create Free Account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
