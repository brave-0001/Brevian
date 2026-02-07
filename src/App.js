import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Tech stack organized by category
  const techCategories = [
    {
      title: 'Frontend',
      techs: ['React', 'JavaScript', 'TypeScript', 'Next.js']
    },
    {
      title: 'Backend',
      techs: ['Node.js', 'Python', 'Express']
    },
    {
      title: 'Mobile',
      techs: ['Flutter', 'React Native', 'Android', 'iOS']
    },
    {
      title: 'Database',
      techs: ['PostgreSQL', 'MongoDB', 'MySQL']
    },
    {
      title: 'Cloud & Tools',
      techs: ['AWS', 'Docker', 'Git', 'Linux']
    },
    {
      title: 'Design',
      techs: ['Photoshop', 'CorelDRAW', 'Illustrator', 'Figma']
    }
  ];

  // Projects
  const projects = [
    {
      title: 'Life-Course Learning',
      description: 'An e-library platform offering free and premium books with a book request feature for personalized learning.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://life-course-learning.vercel.app',
      status: 'Live'
    },
    {
      title: 'SecondMarket',
      description: 'A secure e-commerce platform for buying and selling second-hand and refurbished mobile phones and laptops.',
      technologies: ['React', 'Firebase', 'Stripe'],
      link: '#',
      status: 'In Development'
    },
    {
      title: 'SmartAttendance',
      description: 'A digital attendance system helping students sign attendance online, replacing traditional paper-pen methods.',
      technologies: ['Flutter', 'Node.js', 'PostgreSQL'],
      link: '#',
      status: 'In Development'
    }
  ];

  // About info
  const aboutInfo = {
    name: 'Brevian Emmanuel',
    location: 'Kibabii University',
    experience: '3 Years',
    email: 'brivian179@gmail.com',
    phone: '+254 756 505 439',
    whatsapp: '+254756505439',
    github: 'brave-0001',
    freelanceAvailable: true,
    bio: 'A passionate full-stack developer and designer with 3 years of experience building innovative digital solutions. I specialize in creating user-friendly applications that solve real-world problems, from e-learning platforms to mobile attendance systems.'
  };

  return (
    <div className={`page-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="profile-image-container">
            <img 
              src={`${process.env.PUBLIC_URL}/Profile.jpeg`}
              alt="Brevian Emmanuel" 
              className="profile-image"
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'profile-fallback';
                fallback.textContent = 'BE';
                e.target.parentNode.appendChild(fallback);
              }}
            />
          </div>
          
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#tech" className="nav-link">Tech Stack</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>

          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="grid-container">
        <h1 className="intro-heading">I'm Brevian</h1>
        <p className="intro-text">
          A skilled and reliable digital professional offering tech solutions such as Android and iOS app development, web design, online services, graphic design, printing, OS installation, and personal tutoring. Open to job opportunities, collaborations, and learning experiences.
        </p>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="tech-section">
        <div className="tech-container">
          <div className="tech-header">
            <h2 className="section-title">EXPERTISE</h2>
            <h3 className="tech-title">Tech Stack</h3>
            <p className="tech-description">
              Core technologies I use to build exceptional digital experiences.
            </p>
          </div>

          <div className="tech-categories">
            {techCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <h4 className="category-title">{category.title}</h4>
                </div>
                <div className="category-techs">
                  {category.techs.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-badge">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <div className="projects-header">
            <h2 className="section-title">PORTFOLIO</h2>
            <h3 className="projects-title">Featured Projects</h3>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-content">
                  <div className="project-header-row">
                    <h4 className="project-title">{project.title}</h4>
                    <span className={`project-status ${project.status === 'Live' ? 'status-live' : 'status-dev'}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  {project.status === 'Live' && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-left">
              <div className="about-image-container">
                <img 
                  src={`${process.env.PUBLIC_URL}/Profile.jpeg`}
                  alt="Brevian Emmanuel" 
                  className="about-photo"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%233D8D7A" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="120" font-family="Arial"%3EBE%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            <div className="about-right">
              <h2 className="about-label">DISCOVER</h2>
              <h3 className="about-title">About Me</h3>
              <p className="about-bio">{aboutInfo.bio}</p>

              <div className="about-details-box">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{aboutInfo.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Experience:</span>
                  <span className="detail-value">{aboutInfo.experience}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{aboutInfo.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Freelance:</span>
                  <span className="detail-value freelance-status">
                    <span className={`status-dot ${aboutInfo.freelanceAvailable ? 'available' : 'unavailable'}`}></span>
                    {aboutInfo.freelanceAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">GitHub:</span>
                  <span className="detail-value">
                    <a href={`https://github.com/${aboutInfo.github}`} target="_blank" rel="noopener noreferrer">
                      {aboutInfo.github}
                    </a>
                  </span>
                </div>
              </div>

              <a 
                href={`https://github.com/${aboutInfo.github}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-btn"
              >
                View GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-wrapper">
            <div className="contact-image-section">
              <div className="contact-image-placeholder">
                <img 
                  src={`${process.env.PUBLIC_URL}/Profile.jpeg`}
                  alt="Brevian Emmanuel" 
                  className="contact-photo"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%233D8D7A" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="100" font-family="Arial"%3EBE%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>

            <div className="contact-info-section">
              <div className="contact-header">
                <h2 className="section-title">GET IN TOUCH</h2>
                <h3 className="contact-title">Let's Work Together</h3>
                <p className="contact-description">
                  Have a project in mind? Let's create something amazing together.
                </p>
              </div>

              <div className="contact-info">
                <div className="contact-card">
                  <h4 className="contact-method">Email</h4>
                  <a href={`mailto:${aboutInfo.email}`} className="contact-value">{aboutInfo.email}</a>
                </div>

                <div className="contact-card">
                  <h4 className="contact-method">Phone</h4>
                  <a href={`tel:${aboutInfo.phone}`} className="contact-value">{aboutInfo.phone}</a>
                </div>

                <div className="contact-card">
                  <h4 className="contact-method">WhatsApp</h4>
                  <a 
                    href={`https://wa.me/${aboutInfo.whatsapp}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    {aboutInfo.phone}
                  </a>
                </div>

                <div className="contact-card">
                  <h4 className="contact-method">GitHub</h4>
                  <a 
                    href={`https://github.com/${aboutInfo.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value"
                  >
                    @{aboutInfo.github}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-content">
            <p className="footer-text">© 2026 Brevian Emmanuel. Built with React.</p>
            <div className="footer-links">
              <a href={`https://github.com/${aboutInfo.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={`mailto:${aboutInfo.email}`}>Email</a>
              <a href={`https://wa.me/${aboutInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}