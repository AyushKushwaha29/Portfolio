"use client";

import { CSSProperties, MouseEvent, useEffect, useMemo, useState } from "react";
import { contactLinks, navItems, projects, skillGroups, type Project } from "@/data/portfolio";
import { Arrow, Download, Menu } from "./icons";

const sectionLinks = ["home", "origin", "projects", "skills", "about", "contact"];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observers = sectionLinks.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: "-42% 0px -48% 0px", threshold: 0 },
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);
  return active;
}

function useScrollDepth() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    let frame: number | null = null;

    const setValue = (element: HTMLElement, name: string, value: string) => element.style.setProperty(name, value);

    const updateDepth = () => {
      frame = null;
      const viewportHeight = window.innerHeight;
      const depthNodes = document.querySelectorAll<HTMLElement>("[data-scroll-depth]");

      depthNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height));
        const centered = progress * 2 - 1;
        const kind = node.dataset.scrollDepth;

        if (reducedMotion.matches) {
          setValue(node, "--depth-translate-y", "0px");
          setValue(node, "--depth-translate-z", "0px");
          setValue(node, "--depth-rotate-x", "0deg");
          setValue(node, "--depth-rotate-y", "0deg");
          setValue(node, "--depth-scale", "1");
          return;
        }

        if (kind === "hero") {
          setValue(node, "--hero-copy-y", `${-progress * 76}px`);
          setValue(node, "--hero-copy-z", `${-progress * 260}px`);
          setValue(node, "--hero-copy-scale", `${1 - progress * 0.13}`);
          setValue(node, "--hero-copy-opacity", `${1 - progress * 0.38}`);
          setValue(node, "--hero-scene-y", `${progress * 72}px`);
          setValue(node, "--hero-scene-z", `${-progress * 170}px`);
          setValue(node, "--hero-scene-yaw", `${progress * 12}deg`);
          return;
        }

        if (kind === "origin") {
          setValue(node, "--depth-translate-y", `${centered * -28}px`);
          setValue(node, "--depth-translate-z", `${-Math.abs(centered) * 130}px`);
          setValue(node, "--depth-rotate-y", `${centered * 7}deg`);
          return;
        }

        if (kind === "debug") {
          setValue(node, "--depth-translate-y", `${centered * -34}px`);
          setValue(node, "--depth-translate-z", `${-Math.abs(centered) * 95}px`);
          setValue(node, "--depth-rotate-x", `${centered * -5}deg`);
          setValue(node, "--depth-rotate-y", `${centered * 9}deg`);
          return;
        }

        if (kind === "focus") {
          setValue(node, "--depth-translate-y", `${centered * -24}px`);
          setValue(node, "--depth-translate-z", `${-Math.abs(centered) * 145}px`);
          setValue(node, "--depth-rotate-x", `${centered * -12}deg`);
          setValue(node, "--depth-rotate-y", `${centered * 8}deg`);
          return;
        }

        if (kind === "project") {
          setValue(node, "--depth-translate-y", `${centered * -42}px`);
          setValue(node, "--depth-translate-z", `${-Math.abs(centered) * 155}px`);
          setValue(node, "--depth-rotate-x", `${centered * -7}deg`);
          setValue(node, "--depth-rotate-y", `${centered * 4}deg`);
          setValue(node, "--depth-scale", `${0.96 + (1 - Math.abs(centered)) * 0.04}`);
          return;
        }

        if (kind === "skills" || kind === "building") {
          setValue(node, "--depth-translate-y", `${centered * -26}px`);
          setValue(node, "--depth-translate-z", `${-Math.abs(centered) * 110}px`);
          setValue(node, "--depth-rotate-x", `${centered * -8}deg`);
          setValue(node, "--depth-rotate-y", `${centered * 7}deg`);
        }
      });
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateDepth);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function TerminalScene() {
  return (
    <div className="terminal-scene" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="wire-cube"><span /><span /><span /></div>
      <div className="terminal-window">
        <div className="terminal-top"><b /><b /><b /><small>builder@ayush:~</small></div>
        <div className="terminal-code">
          <p><i>$</i> whoami</p><strong>Ayush — a builder in progress</strong>
          <p><i>$</i> ./make_it_real.sh</p><em>building something useful<span className="cursor">_</span></em>
        </div>
      </div>
      <div className="float-tag tag-python">Python</div>
      <div className="float-tag tag-react">React</div>
      <div className="float-tag tag-git">git commit</div>
      <div className="grid-plane" />
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.type === "commerce") {
    return <div className="project-visual commerce-visual" aria-hidden="true"><div className="browser-bar"><i /><i /><i /><span>freshmart / dashboard</span></div><div className="shop-layout"><aside><b>F</b><span /><span /><span /><span /></aside><main><div className="shop-title"><span>Overview</span><button>+ Product</button></div><div className="stat-row"><i /><i /><i /></div><div className="shop-products"><b /><b /><b /></div></main></div><div className="signal-line line-one" /><div className="signal-line line-two" /></div>;
  }
  if (project.type === "health") {
    return <div className="project-visual health-visual" aria-hidden="true"><div className="report-sheet"><div className="report-lines"><i /><i /><i /><i /><i /></div><div className="report-chart"><span /><span /><span /><span /></div></div><div className="scan-beam" /><div className="insight-panel"><small>AI-GENERATED INSIGHT</small><strong>Structured<br />signals</strong><span>Review with a clinician</span></div><div className="data-orbit"><i /><i /><i /><i /></div></div>;
  }
  if (project.type === "career") {
    return <div className="project-visual career-visual" aria-hidden="true"><div className="resume-card"><small>PROFILE / SKILLS</small><i /><i /><i /><i /></div><div className="roadmap"><span className="node active">01</span><i /><span className="node">02</span><i /><span className="node">03</span></div><div className="career-signal"><small>OPPORTUNITY MAP</small><strong>BUILD<br />FORWARD</strong></div></div>;
  }
  return <div className="project-visual vision-visual" aria-hidden="true"><div className="camera-frame"><i /><i /><b>GESTURE</b><span>96%</span></div><div className="vision-grid" /><div className="pixel-field"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="vision-label">CNN / CLASSIFY</div></div>;
}

function Pipeline({ labels }: { labels: string[] }) {
  return <div className="pipeline" aria-label={`Project flow: ${labels.join(", then ")}`}>
    {labels.map((label, index) => <div className="pipeline-step" key={label}><span>{String(index + 1).padStart(2, "0")}</span><b>{label}</b>{index < labels.length - 1 && <i />}</div>)}
  </div>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--rotate-x", `${-y * 3}deg`);
    card.style.setProperty("--rotate-y", `${x * 3}deg`);
  };
  return <article data-scroll-depth="project" className={`project-card ${project.type} ${index % 2 ? "reverse" : ""}`} onMouseMove={onMove} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--rotate-x", "0deg"); event.currentTarget.style.setProperty("--rotate-y", "0deg"); }}>
    <div className="project-number">/{project.id}</div>
    <div className="project-copy">
      <Eyebrow>Featured project</Eyebrow>
      <h3>{project.title}</h3>
      <p className="project-eyebrow">{project.eyebrow}</p>
      <p className="project-description">{project.description}</p>
      <Pipeline labels={project.pipeline} />
      <p className="project-story">“{project.story}”</p>
      <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-actions"><span className="inactive-link">GitHub <Arrow /></span><span className="inactive-link">Live demo <Arrow /></span></div>
    </div>
    <ProjectVisual project={project} />
  </article>;
}

export default function Portfolio() {
  const activeSection = useActiveSection();
  useScrollDepth();
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useMemo(() => Math.max(1, sectionLinks.indexOf(activeSection) + 1), [activeSection]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  return <main>
    <a className="skip-link" href="#content">Skip to content</a>
    <div className="noise" />
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Ayush home"><span>A</span>YUSH.</a>
      <nav className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
        {navItems.map((item) => <a key={item.label} href={item.href} target={item.href.startsWith("/") ? "_blank" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      </nav>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation"><Menu open={menuOpen} /></button>
      <div className="availability"><span />Open to work</div>
    </header>
    <aside className="scroll-status" aria-label={`Section ${progress} of ${sectionLinks.length}`}><span>{String(progress).padStart(2, "0")}</span><i>{sectionLinks.map((id) => <b key={id} className={id === activeSection ? "active" : ""} />)}</i><small>SCROLL</small></aside>

    <div id="content">
      <section id="home" data-scroll-depth="hero" className="hero section-grid">
        <div className="hero-copy"><Reveal><Eyebrow>AI/ML Engineer × Full-Stack Developer</Eyebrow></Reveal><h1><span>I didn&apos;t start as</span><em>a great developer.</em><strong>I became one by <i>building.</i></strong></h1><p className="hero-text">I build intelligent products and full-stack applications that solve real problems — from AI-powered systems to production-style web platforms.</p><div className="cta-row"><a className="button button-light" href="#projects">Explore my work <Arrow /></a><a className="button button-ghost" href="/ayush-resume.pdf" target="_blank">View resume <Arrow /></a></div></div>
        <TerminalScene />
        <div className="hero-bottom"><span>SCROLL TO ENTER</span><i /><span>0 → BUILDER</span></div>
      </section>

      <section id="origin" data-scroll-depth="origin" className="origin section-grid"><div className="section-marker"><span>01</span><i />The beginning</div><div className="origin-copy"><Eyebrow>Curiosity was the entry point</Eyebrow><h2>I started with a question:<br /><em>how does software actually work?</em></h2><p>That curiosity became a habit — learning the tools, trying ideas, then turning them into working systems.</p></div><div className="journey" aria-label="Learning, experimenting, building"><div className="journey-line" /><div className="journey-stop"><span>01</span><b>Learning</b><small>Python / JS / systems</small></div><div className="journey-stop"><span>02</span><b>Experimenting</b><small>models / APIs / UI</small></div><div className="journey-stop"><span>03</span><b>Building</b><small>products / platforms</small></div><div className="skill-motes"><i>Python</i><i>React</i><i>Git</i><i>ML</i><i>terminal</i></div></div></section>

      <section data-scroll-depth="debug" className="debug-section"><div className="debug-copy"><Eyebrow>The unglamorous work mattered</Eyebrow><h2><span>I BUILT.</span><span>I BROKE.</span><span>I FIXED.</span><span className="muted">I LEARNED.</span></h2><p>Real development meant API errors, database issues, deployment problems, authentication flows, model experiments and rebuilding features. Each problem left a better system behind.</p></div><div className="debug-console" aria-label="Terminal examples"><div className="console-bar"><i /><i /><i /><span>debug-log</span></div><p><small>08:11</small><b className="error">×</b> API connection failed</p><p><small>08:18</small><b className="error">×</b> MongoDB connection error</p><p><small>09:02</small><b className="wait">~</b> Model training...</p><p className="success"><small>09:47</small><b>✓</b> Build successful</p><div className="console-input"><i>$</i><span>keep learning<span className="cursor">_</span></span></div></div></section>

      <section data-scroll-depth="focus" className="focus-section section-grid"><div className="focus-intro"><Eyebrow>03 — What I build</Eyebrow><h2>Different systems.<br /><em>One instinct:</em><br />make it useful.</h2></div><div className="focus-orbit"><div className="orbit-center">BUILD<span>×</span></div><div className="orbit orbit-a"><span>AI / ML</span></div><div className="orbit orbit-b"><span>FULL STACK</span></div><div className="orbit orbit-c"><span>COMPUTER VISION</span></div><div className="orbit orbit-d"><span>BACKEND SYSTEMS</span></div></div></section>

      <section id="projects" className="projects"><div className="projects-heading section-grid"><div><Eyebrow>04 — Selected work</Eyebrow><h2>Things I&apos;ve taken<br />from <em>idea to interface.</em></h2></div><p>Every project is a way of learning by making: connecting the parts, facing the edge cases, and getting it across the finish line.</p></div><div className="project-list">{projects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div><p className="placeholder-note">Project links are intentionally kept ready for your real GitHub and demo URLs.</p></section>

      <section id="skills" data-scroll-depth="skills" className="skills-section section-grid"><div className="skills-heading"><Eyebrow>05 — My toolbox</Eyebrow><h2>I don&apos;t just know technologies.<br /><em>I use them to build.</em></h2></div><div className="skill-galaxy">{skillGroups.map((group, index) => <div className="skill-cluster" style={{ "--cluster": index } as CSSProperties} key={group.title}><h3>{group.title}</h3><div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div></section>

      <section className="mindset-section"><div className="mindset-wrap"><Eyebrow>06 — The engineering mindset</Eyebrow><h2>BUILD <i>→</i> DEBUG <i>→</i><br />LEARN <i>→</i> IMPROVE</h2><p>Every project taught me something I couldn&apos;t learn from tutorials alone.</p><div className="mindset-cycle" aria-label="Problem, Experiment, Failure, Debugging, Solution, Better System"><span>Problem</span><span>Experiment</span><span>Failure</span><span>Debugging</span><span>Solution</span><span>Better system</span><b>↻</b></div></div></section>

      <section id="about" className="about-section section-grid"><div><Eyebrow>07 — A little about me</Eyebrow><h2>I&apos;m Ayush.<br />Still <em>becoming.</em></h2></div><div className="about-copy"><p className="lead">I&apos;m an AI &amp; Machine Learning student who enjoys turning ideas into working products. I started with programming and gradually moved into machine learning, computer vision, backend systems and full-stack development.</p><p>I&apos;m currently focused on becoming a strong software engineer who can understand both the product and the technology behind it.</p><div className="education"><span>EDUCATION</span><strong>B.Tech — Computer Science &amp; Engineering (AI/ML)</strong><p>Dr. Ambedkar Institute of Technology for Divyangjan, Kanpur <small>2023 — 2027</small></p></div></div></section>

      <section data-scroll-depth="building" className="building-section"><div className="assembly" aria-hidden="true"><i /><i /><i /><i /><b /></div><div><Eyebrow>08 — Currently building</Eyebrow><h2>STILL<br /><em>BUILDING.</em></h2><p>I&apos;m not done yet.</p><div className="building-steps"><span>Learning</span><i>→</i><span>Building</span><i>→</i><span>Improving</span><i>→</i><span>Shipping</span></div></div></section>

      <footer id="contact" className="contact-section"><Eyebrow>Let&apos;s make something useful</Eyebrow><h2>Have a problem<br />worth <em>building?</em></h2><p>Let&apos;s build something useful.</p><div className="contact-actions"><a className="button button-light" href={contactLinks.email}>Email me <Arrow /></a><a className="button button-ghost" href={contactLinks.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a><a className="button button-ghost" href={contactLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="button button-ghost" href="/ayush-resume.pdf" target="_blank"><Download /> Resume</a></div><div className="footer-bottom"><span>AYUSH — AI/ML × FULL STACK</span><span>FROM 0 → BUILDER</span><span>© {new Date().getFullYear()}</span></div></footer>
    </div>
  </main>;
}
