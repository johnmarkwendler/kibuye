import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useSmoothScroll, useLenisScrollTo } from "@/components/smooth-scroll";
import { getProjectBySlug, getOtherProjects } from "@/lib/projects";
import { ArrowLeft } from "lucide-react";

function Navbar() {
  const scrollTo = useLenisScrollTo();

  return (
    <nav
      data-testid="nav-main"
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          href="/"
          className="font-heading text-white text-sm tracking-[0.2em] uppercase"
          data-testid="link-home"
        >
          AME
        </Link>
        <div className="flex items-center gap-8 md:gap-12">
          <Link
            href="/"
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-projects"
          >
            Places
          </Link>
          <Link
            href="/"
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-about"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-white/70 text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-white"
            data-testid="link-contact"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function ProjectPage() {
  useSmoothScroll();

  const [, params] = useRoute("/projects/:slug");
  const slug = params?.slug || "";
  const project = getProjectBySlug(slug);
  const otherProjects = getOtherProjects(slug);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.backgroundColor = "#0A0A0A";
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="font-heading text-white text-4xl uppercase mb-4" data-testid="text-not-found">
            Project Not Found
          </h1>
          <Link
            href="/"
            className="text-white/50 text-sm tracking-[0.15em] uppercase hover:text-white transition-colors"
            data-testid="link-back-home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />

      <section className="relative h-screen w-full overflow-hidden" data-testid="section-project-hero">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} project video`}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-[#0A0A0A]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-10 pb-8">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-white/40 text-xs tracking-[0.15em] uppercase mb-6 hover:text-white transition-colors"
                data-testid="link-back"
              >
                <ArrowLeft className="w-3 h-3" />
                Back
              </Link>
            </div>
            <div className="flex items-end gap-8 text-white/50 text-xs tracking-[0.1em] uppercase">
              <span data-testid="text-project-title-label">
                Title <span className="text-white font-medium ml-2">{project.title}</span>
              </span>
              <span data-testid="text-project-category-label">
                Category <span className="text-white font-medium ml-2">{project.category}</span>
              </span>
              <span data-testid="text-project-client-label" className="hidden md:inline">
                Client <span className="text-white font-medium ml-2">{project.client}</span>
              </span>
              <span data-testid="text-project-year-label" className="hidden md:inline">
                Year <span className="text-white font-medium ml-2">{project.year}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0A0A] py-20 md:py-32 px-6 md:px-10" data-testid="section-project-overview">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16 md:mb-24" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-white/40 text-xs tracking-[0.2em] uppercase mb-6" data-testid="text-overview-label">
                  Overview
                </h3>
                <p className="text-white/70 text-sm leading-relaxed" data-testid="text-overview">
                  {project.overview}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-8">
              <motion.p
                className="text-white/80 text-base md:text-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                data-testid="text-description"
              >
                {project.description}
              </motion.p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 md:mt-24" />
        </div>
      </section>

      <section className="relative bg-[#0A0A0A] py-16 md:py-24 px-6 md:px-10" data-testid="section-project-credits">
        <div className="max-w-[1400px] mx-auto">
          <motion.h3
            className="text-white/40 text-xs tracking-[0.2em] uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="text-credits-label"
          >
            Credits
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
            {project.credits.map((credit, i) => (
              <motion.div
                key={credit.role}
                className="py-4 border-b border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="text-white/40 text-xs tracking-[0.15em] uppercase block mb-1">
                  {credit.role}
                </span>
                <span
                  className="text-white text-sm"
                  data-testid={`text-credit-${credit.role.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {credit.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0A0A0A] py-20 md:py-32 px-6 md:px-10" data-testid="section-more-projects">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
          <motion.h3
            className="text-white/40 text-xs tracking-[0.2em] uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-testid="text-more-projects-label"
          >
            More Projects
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherProjects.slice(0, 3).map((p, i) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                <motion.div
                  className="group relative overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  data-testid={`card-more-project-${p.slug}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/20 transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h4 className="font-heading text-white text-xl md:text-2xl uppercase tracking-[-0.01em]">
                        {p.title}
                      </h4>
                      <span className="text-white/50 text-xs tracking-[0.1em] uppercase mt-1">
                        {p.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer
        className="relative bg-[#0A0A0A] py-8 px-6 md:px-10"
        data-testid="footer"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs tracking-[0.1em] uppercase">
          <span>Field journal from Burundi</span>
          <span>San Diego, California</span>
          <span>AME Fund</span>
        </div>
      </footer>
    </div>
  );
}
