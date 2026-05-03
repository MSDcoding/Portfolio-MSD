import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Mail, Phone, MapPin, Gamepad2, Code2, Monitor,
  Braces, Terminal, Layers, Film, Download, Play,
  CheckCircle2, X, ChevronLeft, ChevronRight
} from "lucide-react";
import { SiUnity, SiDotnet, SiBlender, SiHtml5, SiCss, SiGo, SiC, SiGit } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";

type Project = {
  id: string;
  title: string;
  role: string;
  genre: string;
  logo: string;
  images: string[];
  features: string[];
  playLabel?: string;
  playUrl?: string;
  playNote?: string;
  githubUrl: string;
};

const PROJECTS: Project[] = [
  {
    id: "geeks-hub",
    title: "Geeks Hub",
    role: "Gameplay Programmer",
    genre: "Psychological Horror Loop",
    logo: "/image/Geeks -hUB/logo.png",
    images: [
      "/image/Geeks -hUB/logo.png",
      "/image/Geeks -hUB/1.png",
      "/image/Geeks -hUB/2.png",
      "/image/Geeks -hUB/3.png",
      "/image/Geeks -hUB/4.png",
      "/image/Geeks -hUB/5.png"
    ],
    features: [
      "Engineered a centralized GameManager using PlayerPrefs to track loops",
      "Decoupled environments for dynamic loading based on story phases",
      "Developed a scalable, Interface-based interaction system (IInteractable)",
      "Programmed invisible trigger zones for chained cinematic Coroutines",
    ],
    playLabel: "Play Geeks Hub",
    playUrl: "https://drive.google.com/drive/folders/1u7rCd1YzvHnPme2FKUvvPo51qawqr52F?usp=drive_link",
    githubUrl: "https://github.com/MSDcoding/Geeks-Hub",
  },
  {
    id: "recording-217",
    title: "Recording 2:17",
    role: "Game Developer & Game Designer",
    genre: "Looping Nightmare",
    logo: "/image/recording 217/s2.png",
    images: [
      "/image/recording 217/s1.png",
      "/image/recording 217/s2.png",
      "/image/recording 217/s3.png",
      "/image/recording 217/s4.png",
      "/image/recording 217/s5.png"
    ],
    features: [
      "Debut game developed in a 4-person team (2-month cycle at Geeks Institute)",
      "Co-engineered core loops and foundational C# logic while contributing to ideation",
      "Migrated to Unity's New Input System with seamless Xbox Gamepad support",
      "Engineered a specialized UI interaction system for an in-game PC interface",
    ],
    playLabel: "Download PC Build",
    playUrl: "https://drive.google.com/drive/folders/1o0AGDQ1G5nWlg2zqpdX3fnDYKAg3PekJ?usp=sharing",
    playNote: "Includes two builds tailored for different input methods.",
    githubUrl: "https://github.com/MSDcoding/Project_Game_recording-2-17",
  },
  {
    id: "magic-steps",
    title: "Magic Steps",
    role: "Solo Developer",
    genre: "Co-op Puzzle-Platformer",
    logo: "/image/magic steps/logo game.png",
    images: ["/image/magic steps/logo game.png"],
    features: [
      "Developed from scratch in 4 days",
      "Built with decoupled character controllers and a custom radius-based color restoration system",
      "Modular interaction framework with scalable event-driven UI",
      "Special thanks to Meliodas for character art",
    ],
    playLabel: "Download & Play",
    playUrl: "https://drive.google.com/drive/folders/1A5G0KrdOtuln.JZgUjW9zANgPJIK-tMPZ?usp=drive_link",
    githubUrl: "https://github.com/MSDcoding/Magic-Steps",
  },
  {
    id: "prisma",
    title: "Prisma",
    role: "Unity Developer",
    genre: "3D Narrative Exploration",
    logo: "/image/Prisma/logo.png",
    images: ["/image/Prisma/logo.png"],
    features: [
      "Engineered dynamic saturation via custom Shader Graph and C# scripts",
      "Smoothly masks a grayscale environment with colors upon enemy defeat",
      "3D narrative rhythm and exploration game with unique visual progression",
    ],
    githubUrl: "https://github.com/MSDcoding/Prisma",
  },
  {
    id: "snake-gab",
    title: "Snake Gab",
    role: "Solo Developer & Artist",
    genre: "Mechanics-Driven 2D",
    logo: "/image/Snake Gab/Snake_Gab image1 (1).jpg",
    images: [
      "/image/Snake Gab/Snake_Gab image1 (1).jpg",
      "/image/Snake Gab/Snake_Gab image3.jpg",
      "/image/Snake Gab/Snake_Gab image4.jpg",
      "/image/Snake Gab/Snake_Gab image5.jpg"
    ],
    features: [
      "Fast-paced vertical obstacle game engineered from the ground up",
      "Custom 2D gravity system for tight, responsive controls",
      "Procedural Pipe Manager for infinite replayability",
      "All custom 2D sprites hand-designed; UI/score via Singletons",
    ],
    playLabel: "Download Android APK",
    playUrl: "https://drive.google.com/drive/folders/1MycjAbdW0ewjbPnn5DjJAxqepUPx5p20?usp=sharing",
    githubUrl: "https://github.com/MSDcoding/Snake_Gab",
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = useCallback(() =>
    setImgIndex(i => (i - 1 + project.images.length) % project.images.length), [project.images.length]);
  const next = useCallback(() =>
    setImgIndex(i => (i + 1) % project.images.length), [project.images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop"
      style={{ background: "rgba(7, 7, 14, 0.85)" }}
      onClick={onClose}
      data-testid="modal-backdrop"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-primary/30 rounded-xl shadow-[0_0_60px_hsl(186_100%_50%/0.15),_0_0_120px_hsl(340_100%_50%/0.08)]"
        onClick={e => e.stopPropagation()}
        data-testid={`modal-${project.id}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 border border-border text-muted-foreground hover:text-white hover:border-primary/50 transition-colors"
          data-testid="button-modal-close"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-background/60 min-h-[280px] md:min-h-[500px] flex items-center justify-center overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={project.images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover absolute inset-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-background/70 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                  data-testid="button-gallery-prev"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-background/70 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                  data-testid="button-gallery-next"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? "bg-primary w-4" : "bg-white/30"}`}
                      data-testid={`button-gallery-dot-${i}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-7 flex flex-col gap-5">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                <span className="px-2 py-1 bg-primary/15 text-primary border border-primary/30 rounded">
                  {project.role}
                </span>
                <span className="px-2 py-1 bg-border/40 text-muted-foreground border border-border/60 rounded">
                  {project.genre}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 flex-1">
              {project.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 size={14} className="text-primary/70 mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {project.playUrl && (
                  <a
                    href={project.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-play-pulse flex-1 flex items-center justify-center gap-2 px-4 py-3 font-mono text-sm font-bold tracking-wider rounded border border-[hsl(340_100%_50%/0.5)] text-[hsl(340_100%_50%)] bg-[hsl(340_100%_50%/0.08)] hover:bg-[hsl(340_100%_50%/0.2)] hover:border-[hsl(340_100%_50%/0.9)]"
                    data-testid={`button-play-${project.id}`}
                  >
                    {project.playLabel?.toLowerCase().includes("download") ? <Download size={15} /> : <Play size={15} />}
                    {project.playLabel}
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyan flex-1 flex items-center justify-center gap-2 px-4 py-3 font-mono text-sm font-bold tracking-wider rounded border border-primary/40 text-primary bg-primary/8 hover:bg-primary/20 hover:border-primary/80"
                  data-testid={`button-github-${project.id}`}
                >
                  <FaGithub size={15} />
                  GitHub Repo
                </a>
              </div>
              {project.playNote && (
                <p className="text-xs text-muted-foreground font-mono text-center">{project.playNote}</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden dark">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="absolute inset-0 grid-bg" />
        <div className="scanlines opacity-20" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="font-display font-bold text-xl text-primary tracking-wider cursor-pointer hover:glow-text transition-all"
            onClick={() => scrollTo("hero")}
            data-testid="link-home"
          >
            DRISS MOUSSAOUI
          </div>
          <div className="hidden md:flex gap-8 text-sm font-mono text-muted-foreground">
            {["Profile", "Skills", "Projects", "Contact"].map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-primary transition-colors uppercase tracking-widest relative group"
                data-testid={`link-${item.toLowerCase()}`}
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-16">
        <section id="hero" className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SYSTEM.READY
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display text-white tracking-tight glow-text leading-tight">
              DRISS MOUSSAOUI
            </h1>
            <h2 className="text-2xl md:text-3xl font-mono text-primary/80">
              &gt; Unity Developer
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed border-l-2 border-primary/50 pl-6 text-left">
              "I engineer scalable systems and immersive mechanics. I don't just write code; I architect modular foundations that empower design and elevate player experiences. By bridging the gap between deep technical architecture and the creative pipeline, I turn complex visions into polished, high-performance realities."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 font-mono">
              <button
                onClick={() => scrollTo("projects")}
                className="btn-crimson px-8 py-4 font-bold tracking-wider w-full sm:w-auto flex items-center justify-center gap-2 rounded border border-[hsl(340_100%_50%/0.6)] text-[hsl(340_100%_50%)] bg-[hsl(340_100%_50%/0.1)] hover:bg-[hsl(340_100%_50%/0.2)]"
                data-testid="button-view-projects"
              >
                <Gamepad2 size={20} />
                VIEW PROJECTS
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="btn-cyan px-8 py-4 border border-primary text-primary hover:bg-primary/10 tracking-wider w-full sm:w-auto flex items-center justify-center gap-2 rounded"
                data-testid="button-contact"
              >
                <Terminal size={20} />
                INITIALIZE CONNECTION
              </button>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-primary/50 cursor-pointer"
            onClick={() => scrollTo("profile")}
          >
            <ChevronDown size={32} />
          </motion.div>
        </section>

        <section id="profile" className="py-24 px-6 border-t border-border/50 bg-background/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Player Profile</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-muted-foreground leading-relaxed font-sans text-lg"
              >
                <p>I am a Unity Developer dedicated to programming solid gameplay mechanics and scalable C# systems.</p>
                <p>Beyond core coding, a practical background in 3D modeling and simple animation allows me to provide a unique edge, ensuring assets integrate perfectly and prototyping happens faster.</p>
                <p className="text-white border-l-2 border-primary pl-4 font-mono text-base">
                  My ultimate goal is to deliver polished, immersive games that run smoothly and feel great to play.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-6 border border-border/50 bg-card/50 rounded-lg relative overflow-hidden hover:border-primary/40 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <h3 className="font-display text-xl text-white mb-4 flex items-center gap-2">
                    <Monitor className="text-primary" size={24} />
                    Education Log
                  </h3>
                  <div className="space-y-6 font-mono text-sm">
                    <div>
                      <div className="text-primary font-bold">Bootcamp in Game Development</div>
                      <div className="text-white">Geeks Institute, LaStartupStation</div>
                      <div className="text-muted-foreground">11/2025 – 04/2026</div>
                    </div>
                    <div>
                      <div className="text-primary font-bold">Programming Bootcamp</div>
                      <div className="text-white">Zone01 Oujda</div>
                      <div className="text-muted-foreground">09/2025 – 11/2026</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 px-6 border-t border-border/50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Tech Tree</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Game Development",
                  icon: <Gamepad2 className="text-primary mb-4" size={32} />,
                  skills: [{ name: "Unity", icon: <SiUnity /> }, { name: "C#", icon: <SiDotnet /> }],
                },
                {
                  title: "3D Tools",
                  icon: <Braces className="text-primary mb-4" size={32} />,
                  skills: [{ name: "Blender (Modeling & Anim)", icon: <SiBlender /> }],
                },
                {
                  title: "Programming & Web",
                  icon: <Code2 className="text-primary mb-4" size={32} />,
                  skills: [
                    { name: "C#", icon: <SiDotnet /> },
                    { name: "Golang", icon: <SiGo /> },
                    { name: "C", icon: <SiC /> },
                    { name: "HTML", icon: <SiHtml5 /> },
                    { name: "CSS", icon: <SiCss /> },
                  ],
                },
                {
                  title: "Tools & Workflow",
                  icon: <Terminal className="text-primary mb-4" size={32} />,
                  skills: [
                    { name: "Git", icon: <SiGit /> },
                    { name: "GitHub", icon: <FaGithub /> },
                    { name: "VS Code", icon: <Monitor size={16} /> },
                    { name: "Git LFS", icon: <Layers size={16} /> },
                    { name: "Photoshop", icon: <Layers size={16} /> },
                    { name: "Premiere Pro", icon: <Film size={16} /> },
                  ],
                },
              ].map((cat, idx) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl border border-border/50 bg-card hover:border-primary/40 transition-colors hover:shadow-[0_0_20px_hsl(186_100%_50%/0.12)]"
                >
                  {cat.icon}
                  <h3 className="font-display text-xl text-white mb-6">{cat.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {cat.skills.map(skill => (
                      <div key={skill.name} className="flex items-center gap-2 px-3 py-2 rounded-md bg-background border border-border text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                        {skill.icon}
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 px-6 border-t border-border/50 bg-background/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Mission Logs</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-sm text-muted-foreground mb-12"
            >
              &gt; Click any mission to access full intel
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {PROJECTS.map((project, idx) => (
                <motion.button
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  onClick={() => setActiveProject(project)}
                  className="card-tactile group relative flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-primary/70 hover:shadow-[0_0_25px_hsl(186_100%_50%/0.25),_0_0_55px_hsl(340_100%_50%/0.1)] text-left"
                  data-testid={`card-project-${project.id}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-background/80">
                    <img
                      src={project.logo}
                      alt={`${project.title} logo`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/8 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="px-3 py-1.5 bg-background/80 border border-primary/60 rounded font-mono text-xs text-primary backdrop-blur-sm">
                        VIEW INTEL
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground mt-1 truncate">{project.genre}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Initialize Connection</h2>
              <p className="text-primary font-mono">Status: Awaiting Input...</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 bg-card border border-border/50 p-8 md:p-12 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="space-y-8 relative z-10">
                <h3 className="font-display text-2xl text-white mb-6">Comm_Link Details</h3>
                <ul className="space-y-6 font-mono text-sm text-muted-foreground">
                  {[
                    { icon: <MapPin size={20} />, content: <><div className="text-white">Casablanca, Morocco</div><div className="text-xs">(ouvert à la mobilité)</div></> },
                    { icon: <Phone size={20} />, content: <a href="tel:+212632012288" className="hover:text-primary transition-colors text-white">+212 6 32 01 22 88</a> },
                    { icon: <Mail size={20} />, content: <a href="mailto:drissmoussaoui58@gmail.com" className="hover:text-primary transition-colors text-white break-all">drissmoussaoui58@gmail.com</a> },
                    { icon: <FaLinkedin size={20} />, content: <a href="https://linkedin.com/in/moussaoui-driss" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-white">Moussaoui Driss</a> },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center text-primary shrink-0">
                        {item.icon}
                      </div>
                      <div>{item.content}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <form className="space-y-4 relative z-10" onSubmit={e => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary uppercase">Identity</label>
                  <input type="text" placeholder="Enter Name" className="w-full bg-background border border-border rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" data-testid="input-name" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary uppercase">Signal Path (Email)</label>
                  <input type="email" placeholder="Enter Email" className="w-full bg-background border border-border rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans" data-testid="input-email" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-primary uppercase">Payload</label>
                  <textarea rows={4} placeholder="Enter Message" className="w-full bg-background border border-border rounded px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none" data-testid="input-message" />
                </div>
                <button
                  type="submit"
                  className="btn-crimson w-full font-bold font-mono tracking-wider py-4 mt-4 flex items-center justify-center gap-2 rounded border border-[hsl(340_100%_50%/0.6)] text-[hsl(340_100%_50%)] bg-[hsl(340_100%_50%/0.1)] hover:bg-[hsl(340_100%_50%/0.25)]"
                  data-testid="button-submit-contact"
                >
                  <Terminal size={18} />
                  TRANSMIT
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-border bg-background text-center font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DRISS MOUSSAOUI. System offline.</p>
        </footer>
      </main>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}