/**
 * ============================================
 * APP.JS — Aplicación principal
 * Carga datos desde data.json y renderiza
 * dinámicamente todo el contenido del sitio.
 * ============================================
 */

(function () {
  'use strict';

  // ---- Referencia al loader ----
  const loader = document.getElementById('loader');

  /**
   * Arranca la aplicación usando los datos del script data.js cargado en el HTML.
   */
  async function init() {
    try {
      const data = APP_DATA;

      // Renderizar todas las secciones con los datos del JSON
      renderSiteMeta(data.site);
      renderHero(data.hero, data.whatsapp);
      renderNav();
      renderServices(data.services);
      renderTestimonials(data.testimonials);
      renderTrust(data.trust);
      renderContact(data.contact, data.whatsapp);
      renderWhatsAppFloat(data.whatsapp);
      renderFooter(data.legal, data.site);

      // Inicializar comportamientos interactivos
      initScrollHeader();
      initMobileNav();
      initScrollAnimations();

      // Ocultar loader
      hideLoader();
    } catch (error) {
      console.error('Error inicializando la aplicación:', error);
      hideLoader();
      document.getElementById('app').innerHTML = `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;">
          <div>
            <h1 style="color:#c9a84c;font-size:1.5rem;margin-bottom:1rem;">Error al cargar el contenido</h1>
            <p style="color:#999;">Por favor, recarga la página o inténtalo más tarde.</p>
          </div>
        </div>
      `;
    }
  }

  /**
   * Oculta el loader con animación.
   */
  function hideLoader() {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }

  // ============================================
  // RENDERIZADO DE SECCIONES
  // ============================================

  /**
   * Actualiza meta tags del documento.
   */
  function renderSiteMeta(site) {
    document.title = site.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', site.description);
  }

  /**
   * Renderiza la sección hero con CTA.
   */
  function renderHero(hero, whatsapp) {
    const waURL = buildWhatsAppURL(whatsapp);
    const section = document.getElementById('hero');

    section.innerHTML = `
      <div class="hero-bg" style="background-image:url('${hero.backgroundImage}')"></div>
      <div class="hero-particles">
        ${Array.from({ length: 8 }, () => '<div class="particle"></div>').join('')}
      </div>
      <div class="hero-content">
        <span class="hero-badge">✦ Amarres de Amor ✦</span>
        <h1>${formatHeroTitle(hero.title)}</h1>
        <p class="hero-subtitle">${hero.subtitle}</p>
        <p class="hero-description">${hero.description}</p>
        <div class="hero-cta">
          <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.768-6.41-2.07l-.447-.34-2.636.884.884-2.636-.34-.447A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            ${hero.cta}
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Toma el título del hero y resalta la última parte.
   */
  function formatHeroTitle(title) {
    const words = title.split(' ');
    if (words.length <= 3) return title;
    const midpoint = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, midpoint).join(' ');
    const secondPart = words.slice(midpoint).join(' ');
    return `${firstPart} <span class="highlight">${secondPart}</span>`;
  }

  /**
   * Renderiza los links de navegación.
   */
  function renderNav() {
    const navList = document.getElementById('nav-list');
    const links = [
      { href: '#hero', label: 'Inicio' },
      { href: '#services', label: 'Servicios' },
      { href: '#testimonials', label: 'Testimonios' },
      { href: '#trust', label: 'Garantía' },
      { href: '#contact', label: 'Contacto' }
    ];

    navList.innerHTML = links
      .map(link => `<li><a href="${link.href}" class="nav-link">${link.label}</a></li>`)
      .join('');
  }

  /**
   * Renderiza la grilla de servicios.
   */
  function renderServices(services) {
    const section = document.getElementById('services');
    const grid = section.querySelector('.services-grid');

    grid.innerHTML = services
      .map(
        (service) => `
        <article class="service-card">
          <div class="service-card-image-wrapper">
            <img
              src="${service.image}"
              alt="${service.title}"
              class="service-card-image"
              loading="lazy"
            />
          </div>
          <div class="service-card-body">
            <span class="service-card-icon">${service.icon}</span>
            <h3 class="service-card-title">${service.title}</h3>
            <p class="service-card-text">${service.description}</p>
          </div>
        </article>
      `
      )
      .join('');
  }

  /**
   * Renderiza el slider horizontal de testimonios.
   */
  function renderTestimonials(testimonials) {
    const section = document.getElementById('testimonials');
    const slider = section.querySelector('.testimonials-slider');

    slider.innerHTML = testimonials
      .map(
        (t) => `
        <article class="testimonial-card">
          <div class="testimonial-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${t.name.charAt(0)}</div>
            <div class="testimonial-info">
              <h4>${t.name}</h4>
              <p>${t.location} — ${t.date}</p>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  }

  /**
   * Renderiza la sección de confianza/garantía.
   */
  function renderTrust(trust) {
    const section = document.getElementById('trust');
    const titleEl = section.querySelector('.section-title');
    const subtitleEl = section.querySelector('.section-subtitle');
    const grid = section.querySelector('.trust-grid');

    titleEl.textContent = trust.title;
    subtitleEl.textContent = trust.subtitle;

    grid.innerHTML = trust.items
      .map(
        (item) => `
        <div class="trust-card">
          <span class="trust-icon">${item.icon}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `
      )
      .join('');
  }

  /**
   * Renderiza la sección de contacto con CTA de WhatsApp.
   */
  function renderContact(contact, whatsapp) {
    const section = document.getElementById('contact');
    const waURL = buildWhatsAppURL(whatsapp);

    section.querySelector('.section-title').textContent = contact.title;
    section.querySelector('.section-subtitle').textContent = contact.subtitle;
    section.querySelector('.contact-description').textContent = contact.description;

    const details = section.querySelector('.contact-details');
    details.innerHTML = `
      <div class="contact-item">
        <span class="contact-item-icon">📞</span>
        <span>${contact.phone}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item-icon">✉️</span>
        <span>${contact.email}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item-icon">🕐</span>
        <span>${contact.schedule}</span>
      </div>
      <div class="contact-item">
        <span class="contact-item-icon">🌎</span>
        <span>${contact.location}</span>
      </div>
    `;

    section.querySelector('.contact-cta').innerHTML = `
      <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="btn btn-gold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.768-6.41-2.07l-.447-.34-2.636.884.884-2.636-.34-.447A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        Escríbenos Ahora
      </a>
    `;
  }

  /**
   * Renderiza el botón flotante de WhatsApp.
   */
  function renderWhatsAppFloat(whatsapp) {
    const container = document.getElementById('whatsapp-float');
    const waURL = buildWhatsAppURL(whatsapp);

    container.innerHTML = `
      <span class="whatsapp-float-label">${whatsapp.floatingText}</span>
      <div style="position:relative;">
        <div class="whatsapp-pulse"></div>
        <a href="${waURL}" target="_blank" rel="noopener noreferrer" class="whatsapp-float-btn" aria-label="Contactar por WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.768-6.41-2.07l-.447-.34-2.636.884.884-2.636-.34-.447A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        </a>
      </div>
    `;
  }

  /**
   * Renderiza el footer con textos legales.
   */
  function renderFooter(legal, site) {
    const footer = document.getElementById('footer');

    footer.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">${site.title.split('—')[0].trim()}</div>
          <p class="footer-text">${legal.footer}</p>
          <p class="footer-text">${legal.privacy}</p>
          <p class="footer-disclaimer">${legal.disclaimer}</p>
        </div>
      </div>
    `;
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Construye la URL de WhatsApp a partir del número y mensaje.
   */
  function buildWhatsAppURL(whatsapp) {
    const message = encodeURIComponent(whatsapp.message);
    return `https://wa.me/${whatsapp.number}?text=${message}`;
  }

  // ============================================
  // COMPORTAMIENTOS INTERACTIVOS
  // ============================================

  /**
   * Cambia el estilo del header al hacer scroll.
   */
  function initScrollHeader() {
    const header = document.getElementById('header');
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Inicializa el menú móvil (hamburguesa).
   */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    // Cerrar menú al hacer click en un enlace
    nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      }
    });
  }

  /**
   * Observa elementos y aplica animaciones al entrar en viewport.
   */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar tarjetas de servicio con delay escalonado
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    // Observar tarjetas de confianza con delay escalonado
    document.querySelectorAll('.trust-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(card);
    });

    // Observar elementos genéricos con clase fade-in
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
  }

  // ---- Arrancar la aplicación cuando el DOM esté listo ----
  document.addEventListener('DOMContentLoaded', init);
})();
