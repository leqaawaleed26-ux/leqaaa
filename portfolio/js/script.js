/**
 * ==========================================================================
 * LEQAA WALEED - DATA ENGINEERING & DATA SCIENCE PORTFOLIO
 * Vanilla JavaScript Core Application
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light Mode) with LocalStorage Persistence
  // --------------------------------------------------------------------------
  const THEME_STORAGE_KEY = 'leqaa_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  /**
   * Retrieves the saved theme or defaults to 'dark'
   */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Default to dark mode as required
    return 'dark';
  }

  /**
   * Applies the theme to the root element and updates ARIA labels
   * @param {'dark'|'light'} theme
   */
  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      const newLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggleBtn.setAttribute('aria-label', newLabel);
      themeToggleBtn.setAttribute('title', newLabel);
    }
  }

  // Initialize theme immediately on script execution
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(targetTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Accessible Keyboard Handling
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    if (!navMenu || !mobileMenuBtn) return;
    navMenu.classList.add('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!navMenu || !mobileMenuBtn) return;
    navMenu.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when any nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          closeMobileMenu();
        }
      });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeMobileMenu();
        mobileMenuBtn.focus();
      }
    });

    // Close menu if user clicks outside
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Navigation State Tracking via IntersectionObserver
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in upper-mid viewport
      threshold: 0
    };

    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach(function (sec) {
      navObserver.observe(sec);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Scroll Reveal Animations (with Reduced Motion Support)
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    // Select elements to reveal
    const revealTargets = document.querySelectorAll(
      '.hero-content, .hero-visual, .narrative-card, .info-card, .skill-category-card, .project-card, .timeline-item, .service-card, .objective-card, .cert-card, .contact-info-card, .contact-form-card'
    );

    revealTargets.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
    });

    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target); // Reveal only once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Project Category Filtering
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const selectedFilter = btn.getAttribute('data-filter');

        // Update active filter button state
        filterButtons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter projects
        projectCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');

          if (selectedFilter === 'all' || cardCategory === selectedFilter) {
            card.classList.remove('is-hidden');
            // Re-trigger reveal animation if hidden before
            card.classList.add('is-revealed');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Service "Request Service" Interaction
  // --------------------------------------------------------------------------
  const serviceButtons = document.querySelectorAll('.service-btn');
  const subjectInput = document.getElementById('emailSubject');
  const nameInput = document.getElementById('senderName');

  if (serviceButtons.length > 0 && subjectInput) {
    serviceButtons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const serviceName = btn.getAttribute('data-service');
        if (serviceName) {
          subjectInput.value = 'Inquiry: ' + serviceName;
          if (nameInput) {
            setTimeout(function () {
              nameInput.focus();
            }, 600); // Allow smooth scroll to finish
          }
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Validation & Honest Static Submission Workflow
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function clearErrors() {
    [nameError, emailError, subjectError, messageError].forEach(function (err) {
      if (err) err.textContent = '';
    });
    const invalidInputs = contactForm ? contactForm.querySelectorAll('.is-invalid') : [];
    invalidInputs.forEach(function (input) {
      input.classList.remove('is-invalid');
    });
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';
      formStatus.innerHTML = '';
    }
  }

  function validateEmail(email) {
    // Standard RFC-compliant email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      const nameVal = document.getElementById('senderName').value.trim();
      const emailVal = document.getElementById('senderEmail').value.trim();
      const subjectVal = document.getElementById('emailSubject').value.trim();
      const messageVal = document.getElementById('emailMessage').value.trim();

      let hasError = false;

      // Validate Name
      if (!nameVal) {
        document.getElementById('senderName').classList.add('is-invalid');
        if (nameError) nameError.textContent = 'Please enter your name.';
        hasError = true;
      }

      // Validate Email
      if (!emailVal) {
        document.getElementById('senderEmail').classList.add('is-invalid');
        if (emailError) emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!validateEmail(emailVal)) {
        document.getElementById('senderEmail').classList.add('is-invalid');
        if (emailError) emailError.textContent = 'Please enter a valid email format (e.g. name@domain.com).';
        hasError = true;
      }

      // Validate Subject
      if (!subjectVal) {
        document.getElementById('emailSubject').classList.add('is-invalid');
        if (subjectError) subjectError.textContent = 'Please provide a subject.';
        hasError = true;
      }

      // Validate Message
      if (!messageVal) {
        document.getElementById('emailMessage').classList.add('is-invalid');
        if (messageError) messageError.textContent = 'Please write your message.';
        hasError = true;
      } else if (messageVal.length < 10) {
        document.getElementById('emailMessage').classList.add('is-invalid');
        if (messageError) messageError.textContent = 'Message should be at least 10 characters.';
        hasError = true;
      }

      if (hasError) {
        return;
      }

      // Compose Honest Mailto Dispatch
      const recipient = 'leqaawaleed26@gmail.com';
      const encodedSubject = encodeURIComponent(subjectVal);
      const emailBody = 
        'Hello Leqaa,\n\n' +
        messageVal + '\n\n' +
        '------------------------------------\n' +
        'Sender Name: ' + nameVal + '\n' +
        'Sender Email: ' + emailVal + '\n' +
        'Dispatched via Portfolio Contact Form';

      const encodedBody = encodeURIComponent(emailBody);
      const mailtoUrl = 'mailto:' + recipient + '?subject=' + encodedSubject + '&body=' + encodedBody;

      // Trigger user default email client
      window.location.href = mailtoUrl;

      // Provide clear, honest feedback on static site delivery
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        formStatus.innerHTML = `
          <strong>Email Client Launched:</strong> Your message has been prepared for dispatch to <code>${recipient}</code>.<br>
          <span style="font-size: 0.8125rem; display: inline-block; margin-top: 0.5rem;">
            If your email app didn't open automatically, you can email directly at 
            <a href="mailto:${recipient}" style="text-decoration: underline; font-weight: 600;">${recipient}</a>.
          </span>
        `;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 9. Back To Top Smooth Scrolling
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

})();
