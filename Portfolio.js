// Scroll progress bar
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Typewriter effect for hero role
  const roles = [
    'Software QA Engineer',
    'Payments Testing Specialist',
    'Banking & Fintech QA',
    'Automation Enthusiast'
  ];
  const twEl = document.getElementById('typewriter');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced){
    twEl.textContent = roles[0];
  } else {
    let roleIdx = 0, charIdx = 0, deleting = false;
    function tick(){
      const current = roles[roleIdx];
      if (!deleting){
        charIdx++;
        twEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length){
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIdx--;
        twEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0){
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  menuToggle.addEventListener('click', () => {
    sideNav.classList.toggle('mobile-open');
    sideNav.style.display = sideNav.classList.contains('mobile-open') ? 'flex' : 'none';
  });

  const navLinks = document.querySelectorAll('.side-nav a');
  const sections = document.querySelectorAll('main .section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetBoundingClientRect ? 0 : sec.getBoundingClientRect().top;
      if (top < 140) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideNav.classList.remove('mobile-open');
      if (window.innerWidth <= 860) sideNav.style.display = 'none';
    });
  });
