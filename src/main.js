/* ============================================================
   DAUDI SYMON — PORTFOLIO
   src/main.js — All interactions, animations, utilities
   ============================================================ */

import './style.css'

// ── Tailwind skill-tag & tech-tag component classes ──────────
// Defined here so Tailwind v4 scans them
// skill-tag  → used in Skills section
// tech-tag   → used in Projects section
// (Both use @apply via CSS or inline classes — defined in style.css)

document.addEventListener('DOMContentLoaded', () => {

  // ── AOS init ───────────────────────────────────────────────
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  })

  // ── Navbar scroll shrink + active link ────────────────────
  const mainNav  = document.getElementById('mainNav')
  const navLinks = document.querySelectorAll('.nav-link')
  const sections = document.querySelectorAll('section[id]')
  const lightSections = ['skills', 'about']

  const updateNav = () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('bg-[#0a0a0a]/97', 'shadow-[0_2px_20px_rgba(0,0,0,0.4)]', 'py-2')
      mainNav.classList.remove('py-4')
    } else {
      mainNav.classList.remove('bg-[#0a0a0a]/97', 'shadow-[0_2px_20px_rgba(0,0,0,0.4)]', 'py-2')
      mainNav.classList.add('py-4')
    }

    let current = ''
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id
    })

    const isLightSection = lightSections.includes(current)

    // Toggle class on nav — CSS handles all color changes
    mainNav.classList.toggle('nav-light', isLightSection)

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${current}`
      link.classList.toggle('text-white', isActive && !isLightSection)
      link.classList.toggle('text-white/80', !isActive && !isLightSection)
    })
  }
  window.addEventListener('scroll', updateNav, { passive: true })
  updateNav()

  // ── Mobile menu toggle ─────────────────────────────────────
  const navToggle  = document.getElementById('navToggle')
  const mobileMenu = document.getElementById('mobileMenu')
  const bar1 = document.getElementById('bar1')
  const bar2 = document.getElementById('bar2')
  const bar3 = document.getElementById('bar3')

  navToggle.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden')
    mobileMenu.classList.toggle('hidden')
    navToggle.setAttribute('aria-expanded', String(!isOpen))

    // Animate hamburger → X
    if (!isOpen) {
      bar1.style.transform = 'translateY(7px) rotate(45deg)'
      bar2.style.opacity   = '0'
      bar3.style.transform = 'translateY(-7px) rotate(-45deg)'
    } else {
      bar1.style.transform = ''
      bar2.style.opacity   = ''
      bar3.style.transform = ''
    }
  })

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      navToggle.setAttribute('aria-expanded', 'false')
      bar1.style.transform = ''
      bar2.style.opacity   = ''
      bar3.style.transform = ''
    })
  })

  // ── Typed text animation ───────────────────────────────────
  const phrases    = ['web applications.', 'mobile experiences.', 'network solutions.', 'clean, secure code.']
  let phraseIndex  = 0
  let charIndex    = 0
  let isDeleting   = false
  const typedEl    = document.getElementById('typedText')

  const typeLoop = () => {
    if (!typedEl) return
    const phrase = phrases[phraseIndex]

    if (!isDeleting) {
      typedEl.textContent = phrase.substring(0, ++charIndex)
      if (charIndex === phrase.length) {
        isDeleting = true
        return setTimeout(typeLoop, 1800)
      }
    } else {
      typedEl.textContent = phrase.substring(0, --charIndex)
      if (charIndex === 0) {
        isDeleting   = false
        phraseIndex  = (phraseIndex + 1) % phrases.length
      }
    }
    setTimeout(typeLoop, isDeleting ? 50 : 85)
  }
  typeLoop()

  // ── Back to top ────────────────────────────────────────────
  const backToTop = document.getElementById('backToTop')

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.remove('opacity-0', 'invisible')
      backToTop.classList.add('opacity-100', 'visible')
    } else {
      backToTop.classList.add('opacity-0', 'invisible')
      backToTop.classList.remove('opacity-100', 'visible')
    }
  }, { passive: true })

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  // ── Footer year ────────────────────────────────────────────
  const yearEl = document.getElementById('footerYear')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // ── Smooth scroll with navbar offset ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      const offset = mainNav.offsetHeight
      const top    = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })

  // ── Contact form ───────────────────────────────────────────
  const contactForm = document.getElementById('contactForm')
  const submitBtn   = document.getElementById('submitBtn')
  const formMsg     = document.getElementById('formMsg')

  const sanitize = str => {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  }

  const showMsg = (msg, type) => {
    formMsg.textContent = msg
    formMsg.className   = `mt-1 px-4 py-3 rounded-md text-sm font-medium ${
      type === 'success'
        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
        : 'bg-red-500/15 text-red-400 border border-red-500/30'
    }`
    formMsg.classList.remove('hidden')
    setTimeout(() => formMsg.classList.add('hidden'), 5000)
  }

  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault()

      const name    = sanitize(document.getElementById('contactName').value.trim())
      const email   = sanitize(document.getElementById('contactEmail').value.trim())
      const subject = sanitize(document.getElementById('contactSubject').value.trim())
      const message = sanitize(document.getElementById('contactMessage').value.trim())

      if (!name || !email || !subject || !message) {
        return showMsg('Please fill in all fields.', 'error')
      }
      if (!isValidEmail(email)) {
        return showMsg('Please enter a valid email address.', 'error')
      }
      if (message.length < 10) {
        return showMsg('Your message is too short. Tell me more!', 'error')
      }

      // Show loading state
      submitBtn.disabled     = true
      submitBtn.innerHTML    = '<i class="bi bi-hourglass-split mr-2"></i>Sending...'

      fetch('https://formspree.io/f/mlgprbgj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      })
      .then(r => {
        if (r.ok) {
          showMsg("Message sent! I'll get back to you soon.", 'success')
          contactForm.reset()
        } else {
          showMsg('Something went wrong. Please email me directly.', 'error')
        }
      })
      .catch(() => {
        showMsg('Network error. Please check your connection and try again.', 'error')
      })
      .finally(() => {
        submitBtn.disabled  = false
        submitBtn.innerHTML = '<i class="bi bi-send-fill"></i>Send Message'
      })
    })
  }

})
