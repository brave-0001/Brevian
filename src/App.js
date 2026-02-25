import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

// ─── Data ─────────────────────────────────────────────────────────────────────

const person = {
  name:      'Brevian Emmanuel',
  location:  'Kibabii University, Kenya',
  email:     'brivian179@gmail.com',
  phone:     '+254 727 611 362',
  whatsapp:  '254727611362',
  github:    'brave-0001',

  // Used in the hero — first impression, short and confident
  heroBio: 'I build things that work and feel right — a CS student who goes beyond the classroom, shipping real products and solving real problems.',

  // Used in About — deeper, reflects academic + hands-on balance
  aboutBio: 'Computer Science grounds my thinking. Curiosity drives everything else. I combine structured academic knowledge with hands-on building — because the best way to understand something is to make it work.',
};

const stack = [
  { title: 'Frontend',      techs: ['React', 'JavaScript', 'TypeScript', 'Next.js'] },
  { title: 'Backend',       techs: ['Node.js', 'Python', 'Express'] },
  { title: 'Mobile',        techs: ['Flutter', 'React Native', 'Android', 'iOS'] },
  { title: 'Database',      techs: ['PostgreSQL', 'MongoDB', 'MySQL'] },
  { title: 'Cloud & Tools', techs: ['AWS', 'Docker', 'Git', 'Linux'] },
  { title: 'Design',        techs: ['Figma', 'Illustrator', 'Photoshop', 'CorelDRAW'] },
];

const projects = [
  {
    title:        'Life-Course Learning',
    description:  'Knowledge should be free. This e-library makes it happen — curated books, zero barriers, and a request system so readers always find what they need.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    link:         'https://life-course-learning.vercel.app',
    status:       'Live',
    year:         '2024',
  },
  {
    title:        'SecondMarket',
    description:  "Good tech shouldn't expire. A trusted space for buying and selling refurbished phones and laptops — with payments built in and trust built first.",
    technologies: ['React', 'Firebase', 'Stripe'],
    link:         '#',
    status:       'In Development',
    year:         '2025',
  },
  {
    title:        'SmartAttendance',
    description:  "Paper lists get lost. This doesn't. A clean digital attendance system that lets students sign in online — fast, reliable, and built for real classrooms.",
    technologies: ['Flutter', 'Node.js', 'PostgreSQL'],
    link:         '#',
    status:       'In Development',
    year:         '2025',
  },
];

const details = [
  ['Location', person.location],
  ['Approach', 'Principled. Practical. Always shipping.'],
  ['Status',   '● Open to opportunities'],
  ['GitHub',   `@${person.github}`],
];

// ─── Icons ────────────────────────────────────────────────────────────────────

// Shared SVG wrapper — keeps icon declarations to a single line each
const Icon = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const MailIcon   = () => <Icon><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Icon>;
const PhoneIcon  = () => <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.82 12 19.79 19.79 0 0 1 1.76 3.38 2 2 0 0 1 3.74 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const GithubIcon = () => <Icon><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></Icon>;

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M8 3l5 5-5 5"/>
  </svg>
);

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Components ───────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView();
  const classes = ['reveal', visible && 'revealed', className].filter(Boolean).join(' ');
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return <div ref={ref} className={classes} style={style}>{children}</div>;
}

function ContactCard({ href, icon, label, value, highlight = false }) {
  const isExternal = !href.startsWith('mailto');
  const cls = `contact-card${highlight ? ' contact-card--highlight' : ''}`;

  return (
    <a
      href={href}
      className={cls}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <div className="contact-card__icon">{icon}</div>
      <div className="contact-card__body">
        <span className="contact-card__label">{label}</span>
        <span className="contact-card__val">{value}</span>
      </div>
      <ArrowIcon />
    </a>
  );
}

// ─── Image fallbacks (shown when profile/about images fail to load) ────────────

const FALLBACK_HERO  = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='480'%3E%3Crect fill='%23052659' width='400' height='480'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%237DA0CA' font-size='96' font-family='Georgia'%3EBE%3C/text%3E%3C/svg%3E";
const FALLBACK_ABOUT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23052659' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%237DA0CA' font-size='80' font-family='serif'%3EBE%3C/text%3E%3C/svg%3E";

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [dark,    setDark]    = useState(() => localStorage.getItem('darkMode') === 'true');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pub = process.env.PUBLIC_URL;

  return (
    <div className={`app${dark ? ' dark' : ''}`}>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav__inner">

          <a href="#home" className="nav__logo">
            <img
              src={`${pub}/Profile.jpeg`}
              alt="Brevian Emmanuel"
              className="nav__avatar"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <span className="nav__name">Brevian</span>
          </a>

          <nav className="nav__links">
            {['Tech', 'Projects', 'About', 'Contact'].map(label => (
              <a key={label} href={`#${label.toLowerCase()}`} className="nav__link">
                {label}
              </a>
            ))}
          </nav>

          <button className="nav__toggle" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section id="home" className="hero">
        <div className="hero__glow" aria-hidden="true" />

        <div className="container hero__inner">

          <div className="hero__text">
            <p className="hero__eyebrow">Developer · Designer · Problem Solver</p>
            <h1 className="hero__heading">
              <span className="hero__line">Built by</span>
              <span className="hero__line hero__line--name">Brevian.</span>
              <span className="hero__line hero__line--accent">Made to last.</span>
            </h1>
            <p className="hero__sub">{person.heroBio}</p>
            <div className="hero__cta">
              <a href="#projects" className="btn btn--primary">See My Work</a>
              <a
                href={`https://wa.me/${person.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Start a Conversation
              </a>
            </div>
          </div>

          <div className="hero__photo-wrap">
            <div className="hero__photo-ring" aria-hidden="true" />
            <img
              src={`${pub}/About.jpg`}
              alt="Brevian Emmanuel"
              className="hero__photo"
              onError={e => { e.target.src = FALLBACK_HERO; }}
            />
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              Available for work
            </div>
          </div>

        </div>

        <div className="hero__scroll" aria-hidden="true">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────────────────────────────── */}
      <section id="tech" className="section">
        <div className="container">
          <Reveal><p className="label">Expertise</p></Reveal>
          <Reveal delay={80}><h2 className="section__title">Tech Stack</h2></Reveal>
          <Reveal delay={150}>
            <p className="section__sub">
              Every tool chosen with purpose. Every skill earned through building something real.
            </p>
          </Reveal>

          <div className="tech-grid">
            {stack.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 70}>
                <div className="tech-card">
                  <p className="tech-card__label">{cat.title}</p>
                  <div className="tech-card__items">
                    {cat.techs.map(t => <span key={t} className="tech-pill">{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────────── */}
      <section id="projects" className="section section--alt">
        <div className="container">
          <Reveal><p className="label">Work</p></Reveal>
          <Reveal delay={80}><h2 className="section__title">Things I've Built</h2></Reveal>

          <div className="projects-list">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 100}>
                <div className="project-row">

                  <div className="project-row__meta">
                    <span className="project-row__year">{project.year}</span>
                    <span className={`project-row__status ${project.status === 'Live' ? 'status--live' : 'status--dev'}`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="project-row__body">
                    <h3 className="project-row__title">{project.title}</h3>
                    <p className="project-row__desc">{project.description}</p>
                    <div className="project-row__tags">
                      {project.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>

                  {project.status === 'Live' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-row__link"
                    >
                      <span>View</span>
                      <ArrowIcon />
                    </a>
                  )}

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">

            <div className="about-left">
              <Reveal><p className="label">The Person</p></Reveal>
              <Reveal delay={80}><h2 className="section__title">Who I Am</h2></Reveal>
              <Reveal delay={160}><p className="about__bio">{person.aboutBio}</p></Reveal>

              <Reveal delay={240}>
                <div className="about__details">
                  {details.map(([key, val]) => (
                    <div key={key} className="about__row">
                      <span className="about__key">{key}</span>
                      <span className={`about__val${key === 'Status' ? ' open' : ''}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={320}>
                <a
                  href={`https://github.com/${person.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  See My Code
                </a>
              </Reveal>
            </div>

            <Reveal delay={180} className="about-right">
              <div className="about__img-wrap">
                <img
                  src={`${pub}/About.jpg`}
                  alt="Brevian Emmanuel"
                  className="about__img"
                  onError={e => { e.target.src = FALLBACK_ABOUT; }}
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section id="contact" className="section section--alt">
        <div className="container">
          <div className="contact-grid">

            <div className="contact-left">
              <Reveal><p className="label">Contact</p></Reveal>
              <Reveal delay={80}><h2 className="section__title">Let's Build<br />Something Real.</h2></Reveal>
              <Reveal delay={160}>
                <p className="section__sub">Got an idea, a role, or a problem worth solving? I'm ready.</p>
              </Reveal>

              <Reveal delay={240}>
                <div className="contact-cards">
                  <ContactCard
                    href={`mailto:${person.email}`}
                    icon={<MailIcon />}
                    label="Email"
                    value={person.email}
                  />
                  <ContactCard
                    href={`https://wa.me/${person.whatsapp}`}
                    icon={<PhoneIcon />}
                    label="Phone · WhatsApp"
                    value={person.phone}
                    highlight
                  />
                  <ContactCard
                    href={`https://github.com/${person.github}`}
                    icon={<GithubIcon />}
                    label="GitHub"
                    value={`@${person.github}`}
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="contact-right">
              <div className="contact__video-wrap">
                <video
                  src={`${pub}/work.mp4`}
                  className="contact__video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__copy">© 2026 Brevian Emmanuel</p>
          <div className="footer__links">
            <a href={`https://github.com/${person.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`mailto:${person.email}`}>Email</a>
            <a href={`https://wa.me/${person.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
