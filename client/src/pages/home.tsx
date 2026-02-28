import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import { useSmoothScroll, useLenisScrollTo } from "@/components/smooth-scroll";
import { projects } from "@/lib/projects";

const services = [
  "Brand Films",
  "Commercials & Ad Spots",
  "Event Cinematography",
  "Editorial & Fashion Films",
  "Wedding Films",
  "Product Films",
  "Music Videos",
  "Documentary Shorts",
  "Social Media Visuals",
  "Creative Direction",
];

const clientLogos = [
  "VOGUE",
  "NIKE",
  "APPLE",
  "SONY",
  "CHANEL",
  "DIOR",
  "GUCCI",
];

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "America/Los_Angeles",
  });

  return <span data-testid="text-live-clock">{formatted}</span>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useLenisScrollTo();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      data-testid="nav-main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <button
          onClick={() => scrollTo("body")}
          className="font-heading text-white text-sm tracking-[0.2em] uppercase"
          data-testid="link-home"
        >
          AME
        </button>
        <div className="flex items-center gap-8 md:gap-12">
          <button
            onClick={() => scrollTo("#projects")}
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-projects"
          >
            Places
          </button>
          <button
            onClick={() => scrollTo("#about")}
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-about"
          >
            About
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-contact"
          >
            Get Involved
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      data-testid="section-hero"
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <video
          src="/images/hero-video.mp4"
          poster="/images/hero-poster.png"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Amber Studio hero background video"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-[#3a6a8a]/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/60" />
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full"
        style={{ opacity }}
      >
        <h1
          className="font-heading text-white text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.9] tracking-[-0.02em] uppercase text-center"
          data-testid="text-hero-title"
        >
          Destination: Kibuye
        </h1>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-6">
        <div className="flex items-end justify-between gap-4 text-white/60 text-xs tracking-[0.1em] uppercase">
          <span data-testid="text-tagline">Field journal from Burundi</span>
          <span data-testid="text-location" className="hidden md:block">
            Los Angeles, California
          </span>
          <span className="hidden md:block">
            <LiveClock />
          </span>
          <span data-testid="text-copyright">AME Fund</span>
        </div>
      </div>
    </section>
  );
}

function DividerLine() {
  return (
    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  );
}

function LogoMarquee() {
  return (
    <section className="relative bg-[#0A0A0A] py-10 overflow-hidden" style={{ zIndex: projects.length + 10 }} data-testid="section-clients">
      <DividerLine />
      <div className="py-10 relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map(
            (logo, i) => (
              <span
                key={i}
                className="mx-10 md:mx-16 text-white/20 font-heading text-lg md:text-xl tracking-[0.3em] uppercase inline-block"
                data-testid={`text-client-logo-${i}`}
              >
                {logo}
              </span>
            )
          )}
        </div>
      </div>
      <DividerLine />
    </section>
  );
}

function ProjectSlide({
  project,
  index,
  total,
  containerProgress,
  onNavigate,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  containerProgress: any;
  onNavigate: (slug: string) => void;
}) {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;
  const mid = start + segmentSize * 0.5;

  const clipPercent = useTransform(
    containerProgress,
    [start, start + segmentSize * 0.35],
    [100, 0]
  );
  const clipPath = useTransform(clipPercent, (v: number) => `inset(${v}% 0 0 0)`);

  const textOpacity = useTransform(
    containerProgress,
    [start + segmentSize * 0.2, start + segmentSize * 0.4, mid + segmentSize * 0.15, end - segmentSize * 0.05],
    [0, 1, 1, index === total - 1 ? 1 : 0]
  );
  const textY = useTransform(
    containerProgress,
    [start + segmentSize * 0.2, start + segmentSize * 0.4],
    [30, 0]
  );
  const imgScale = useTransform(
    containerProgress,
    [start, end],
    [1.1, 1.0]
  );

  return (
    <motion.div
      className="absolute inset-0 cursor-none"
      style={{
        zIndex: index + 1,
        clipPath: index === 0 ? "none" : clipPath,
      }}
      onClick={() => onNavigate(project.slug)}
      data-testid={`card-project-${project.slug}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {project.video ? (
          <motion.video
            src={project.video}
            poster={project.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${project.title} project video`}
            className="w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
        ) : (
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ scale: imgScale }}
          />
        )}
        <div className="absolute inset-0 bg-[#0A0A0A]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/20" />
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-24 pointer-events-none"
        style={{ opacity: textOpacity, y: textY, zIndex: 10 }}
      >
        <h2
          className="font-heading text-white text-4xl md:text-6xl lg:text-7xl uppercase tracking-[-0.01em] text-center leading-[0.95]"
          data-testid={`text-project-title-${project.slug}`}
        >
          {project.title}
        </h2>
        <div className="flex items-center gap-3 mt-4">
          <span className="text-white/50 text-xs tracking-[0.15em] uppercase">
            {project.year}
          </span>
          <span className="text-white/30 text-xs">&middot;</span>
          <span className="text-white/50 text-xs tracking-[0.15em] uppercase">
            {project.category}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ViewCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: visible ? 1 : 0,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      data-testid="cursor-view"
      ref={(el) => {
        if (el) {
          (el as any).__setVisible = setVisible;
        }
      }}
    >
      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm">
        <span className="text-[#0A0A0A] text-xs font-medium tracking-[0.15em] uppercase">
          View
        </span>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleNavigate = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  const handleMouseEnter = () => {
    const cursorEl = document.querySelector("[data-testid='cursor-view']");
    if (cursorEl && (cursorEl as any).__setVisible) {
      (cursorEl as any).__setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    const cursorEl = document.querySelector("[data-testid='cursor-view']");
    if (cursorEl && (cursorEl as any).__setVisible) {
      (cursorEl as any).__setVisible(false);
    }
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
      data-testid="section-projects"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {projects.map((project, i) => (
          <ProjectSlide
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            containerProgress={scrollYProgress}
            onNavigate={handleNavigate}
          />
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#0A0A0A] py-20 md:py-32 px-6 md:px-10"
      style={{ zIndex: projects.length + 10 }}
      data-testid="section-about"
    >
      <div className="max-w-[1400px] mx-auto">
        <DividerLine />
        <div className="py-16 md:py-24">
          <motion.h2
            className="font-heading text-white text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] tracking-[-0.01em] max-w-[1100px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            data-testid="text-about-description"
          >
            We're a videography studio driven by a love for cinematic
            storytelling and intentional filmmaking. From brand films and
            commercials to weddings and editorial pieces, we bring a crafted,
            artful approach to every frame.
          </motion.h2>
        </div>
        <DividerLine />
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      className="relative bg-[#0A0A0A] py-16 md:py-24 px-6 md:px-10"
      style={{ zIndex: projects.length + 10 }}
      data-testid="section-services"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-white/40 text-xs tracking-[0.2em] uppercase mb-12"
            data-testid="text-services-label"
          >
            Services
          </h3>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
          {services.map((service, i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span
                className="text-white/70 text-sm md:text-base tracking-wide block py-3 border-b border-white/5 hover:text-white hover:border-white/20 transition-all duration-300 cursor-default"
                data-testid={`text-service-${i}`}
              >
                {service}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#0A0A0A] py-24 md:py-40 px-6 md:px-10"
      style={{ zIndex: projects.length + 10 }}
      data-testid="section-contact"
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <DividerLine />
        <div className="py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              className="text-white/40 text-xs tracking-[0.2em] uppercase mb-8"
              data-testid="text-contact-label"
            >
              Get in touch
            </p>
            <h2
              className="font-heading text-white text-4xl md:text-6xl lg:text-8xl uppercase tracking-[-0.02em]"
              data-testid="text-contact-heading"
            >
              Get Involved
            </h2>
            <p
              className="text-white/50 text-sm md:text-base mt-6 max-w-md mx-auto leading-relaxed"
              data-testid="text-contact-description"
            >
              Have a project in mind? We'd love to hear about it. Reach out and
              let's create something beautiful together.
            </p>
            <motion.a
              href="mailto:hello@amberstudio.com"
              className="inline-block mt-10 px-8 py-4 border border-white/20 text-white text-xs tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-[#0A0A0A] transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid="link-email"
            >
              hello@amberstudio.com
            </motion.a>
          </motion.div>
        </div>
        <DividerLine />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="relative bg-[#0A0A0A] py-8 px-6 md:px-10"
      style={{ zIndex: projects.length + 10 }}
      data-testid="footer"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs tracking-[0.1em] uppercase">
        <span>Field journal from Burundi</span>
        <span>Los Angeles, California</span>
        <span>AME Fund</span>
      </div>
    </footer>
  );
}

export default function Home() {
  useSmoothScroll();

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#0A0A0A";
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <ViewCursor />
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
