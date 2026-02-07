import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Curated tech stack - 13 essential technologies organized by category
  const techCategories = [
    {
      title: 'Frontend',
      icon: '💻',
      techs: ['React', 'JavaScript']
    },
    {
      title: 'Backend',
      icon: '⚙️',
      techs: ['Node.js', 'Python']
    },
    {
      title: 'Mobile',
      icon: '📱',
      techs: ['Flutter', 'React Native']
    },
    {
      title: 'Database',
      icon: '🗄️',
      techs: ['PostgreSQL', 'MongoDB']
    },
    {
      title: 'Cloud',
      icon: '☁️',
      techs: ['AWS', 'Docker']
    },
    {
      title: 'Graphic & Design',
      icon: '🎨',
      techs: ['Adobe Photoshop', 'CorelDRAW', 'Adobe Illustrator']
    }
  ];

  return (
    <div className={`page-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="profile-image-container">
            <img 
              src="/Profile.jpeg" 
              alt="Brevian" 
              className="profile-image"
            />
          </div>
          
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#tech" className="nav-link">Tech Stack</a>
            <a href="#project" className="nav-link">Project</a>
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

      {/* Main Content */}
      <div className="grid-container">
        <h1 className="intro-heading">I'm Brevian</h1>
        <p className="intro-text">
        I am a skilled and reliable digital professional offering tech solutions such as Android and iOS app development, web design, All online services, graphic design, printing, OS installation and activations, and personal tutoring. I am open to job opportunities, collaborations, consultations, and learning opportunities where I can grow, share skills, and deliver quality results. I am committed to professionalism, continuous improvement, and helping individuals and organizations succeed through technology.        </p>
      </div>

      {/* Tech Stack Section - New Minimal Design */}
      <section id="tech" className="tech-section">
        <div className="tech-container">
          <div className="tech-header">
            <h2 className="section-title">EXPERTISE</h2>
            <h3 className="tech-title">Tech Stack</h3>
            <p className="tech-description">
              Core technologies Technologies I've worked with over time. Each tool carefully chosen to craft exceptional digital experiences.
            </p>
          </div>

          <div className="tech-categories">
            {techCategories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
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
    </div>
  );
}