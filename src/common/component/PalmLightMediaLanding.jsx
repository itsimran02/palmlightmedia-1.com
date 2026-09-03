"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PalmLightMediaLanding() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formModal, setFormModal] = useState({
    open: false,
    success: true,
    title: "",
    message: ""
  });

  const toggleFaq = (index) => {
    setActiveFaq(prev => prev === index ? -1 : index);
  };
  useEffect(() => {
    let lenis;
    let rafHandler;
    try {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      const handleFormResult = (e) => {
        if (e.detail) {
          setFormModal({
            open: true,
            success: e.detail.success,
            title: e.detail.title,
            message: e.detail.message
          });
        }
      };
      window.addEventListener("plmFormResult", handleFormResult);

      lenis.on("scroll", ScrollTrigger.update);

      rafHandler = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafHandler);
      gsap.ticker.lagSmoothing(0);


      // Lenis Smooth Anchor Scrolling
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (href && href !== "#") {
            try {
              const target = document.querySelector(href);
              if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -80 });
              }
            } catch (err) {}
          } else if (href === "#") {
            e.preventDefault();
            lenis.scrollTo(0);
          }
        });
      });

(function(){

    "use strict";


    /* =====================================================
       WAIT FOR ELEMENTOR
    ===================================================== */

    function initPalmNavigation(){

        const nav =
            document.querySelector(".plm-nav");

        const toggle =
            document.querySelector(".plm-menu-toggle");

        const mobileMenu =
            document.querySelector(".plm-mobile-menu");

        const backdrop =
            document.querySelector(".plm-mobile-backdrop");

        const desktopLinks =
            document.querySelectorAll(".plm-nav-link");

        const mobileLinks =
            document.querySelectorAll(".plm-mobile-link");


        if(!nav || !toggle || !mobileMenu){

            return;

        }


        /* =================================================
           SECTION IDS
        ================================================= */

        const sectionIDs = [
            "home",
            "services",
            "what-we-do",
            "about",
            "why-us",
            "testimonials",
            "vision",
            "portfolio",
            "pricing",
            "team",
            "faq",
            "contact",
            "contact-us"
        ];

        /* =================================================
           CONTACT FORM HANDLER
        ================================================= */
        const contactForm = document.querySelector(".plm-contact-form");
        if (contactForm && !contactForm.dataset.bound) {
            contactForm.dataset.bound = "true";
            contactForm.addEventListener("submit", async function (e) {
                e.preventDefault();

                // 1. Native HTML5 form validity check
                if (!contactForm.checkValidity()) {
                    contactForm.reportValidity();
                    return;
                }

                const name = document.getElementById("plm-name")?.value?.trim();
                const business = document.getElementById("plm-business")?.value?.trim();
                const email = document.getElementById("plm-email")?.value?.trim();
                const phone = document.getElementById("plm-phone")?.value?.trim();
                const service = document.getElementById("plm-service")?.value?.trim();
                const budget = document.getElementById("plm-budget")?.value?.trim();
                const message = document.getElementById("plm-message")?.value?.trim();

                // 2. Mandatory fields validation check (Name, Email, Phone, Service, Budget required)
                if (!name || !email || !phone || !service || !budget) {
                    window.dispatchEvent(new CustomEvent("plmFormResult", {
                        detail: {
                            success: false,
                            title: "Missing Required Fields",
                            message: "Please fill in all mandatory fields (* Name, Email, Phone, Service, and Budget) before submitting."
                        }
                    }));
                    contactForm.reportValidity();
                    return;
                }

                const submitBtn = contactForm.querySelector(".plm-form-submit");
                const originalText = submitBtn ? submitBtn.innerText : "Send Project Request ↗";
                if (submitBtn) {
                    submitBtn.innerText = "Sending...";
                    submitBtn.disabled = true;
                }

                const formData = { name, business, email, phone, service, budget, message };

                try {
                    const res = await fetch("/api/sendEmail", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });
                    const data = await res.json();
                    if (data.success) {
                        window.dispatchEvent(new CustomEvent("plmFormResult", {
                            detail: {
                                success: true,
                                title: "Consultation Request Sent!",
                                message: "Thank you! Our team at Palmlight Media has received your details and will contact you shortly."
                            }
                        }));
                        contactForm.reset();
                    } else {
                        window.dispatchEvent(new CustomEvent("plmFormResult", {
                            detail: {
                                success: false,
                                title: "Submission Issue",
                                message: "There was an issue processing your request. Please try again or chat with us directly on WhatsApp."
                            }
                        }));
                    }
                } catch (err) {
                    window.dispatchEvent(new CustomEvent("plmFormResult", {
                        detail: {
                            success: false,
                            title: "Connection Error",
                            message: "Unable to send your request. Please check your network connection or message us on WhatsApp."
                        }
                    }));
                } finally {
                    if (submitBtn) {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                    }
                }
            });
        }



        /* =================================================
           FIND ELEMENT
        ================================================= */

        function getElement(id){

            let element =
                document.getElementById(id);

            if(element){

                return element;

            }


            try{

                element =
                    document.querySelector(
                        "#" + CSS.escape(id)
                    );

                if(element){

                    return element;

                }

            }catch(error){}


            return null;

        }


        /* =================================================
           NAV HEIGHT
        ================================================= */

        function navHeight(){

            return nav.getBoundingClientRect().height + 25;

        }


        /* =================================================
           CLOSE MENU
        ================================================= */

        function closeMenu(){

            mobileMenu.classList.remove("open");

            toggle.classList.remove("open");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.style.overflow = "";

        }


        /* =================================================
           OPEN MENU
        ================================================= */

        function openMenu(){

            mobileMenu.classList.add("open");

            toggle.classList.add("open");

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        /* =================================================
           MOBILE TOGGLE
        ================================================= */

        toggle.addEventListener(
            "click",
            function(){

                if(
                    mobileMenu.classList.contains("open")
                ){

                    closeMenu();

                }else{

                    openMenu();

                }

            }
        );


        /* =================================================
           BACKDROP
        ================================================= */

        if(backdrop){

            backdrop.addEventListener(
                "click",
                closeMenu
            );

        }


        /* =================================================
           SCROLL TO SECTION
        ================================================= */

        function goToSection(id){

            const target =
                getElement(id);


            if(!target){

                console.warn(
                    "Palmlight Media: #" +
                    id +
                    " was not found."
                );

                return;

            }


            closeMenu();
            setActive(id);


            const rect =
                target.getBoundingClientRect();


            const absoluteTop =
                rect.top +
                window.scrollY;


            const finalPosition =
                absoluteTop -
                navHeight();


            window.scrollTo({

                top:Math.max(
                    0,
                    finalPosition
                ),

                behavior:"smooth"

            });


            /*
             * Update hash without browser
             * automatically jumping.
             */

            try{

                history.pushState(
                    null,
                    "",
                    "#" + id
                );

            }catch(error){}

        }


        /* =================================================
           NAV CLICK
        ================================================= */

        const allNavLinks =
            document.querySelectorAll(
                ".plm-nav-link, .plm-mobile-link, .plm-nav-logo, .plm-mobile-logo"
            );


        allNavLinks.forEach(
            function(link){

                link.addEventListener(
                    "click",
                    function(event){

                        const href =
                            this.getAttribute("href");


                        if(
                            !href ||
                            href.charAt(0) !== "#"
                        ){

                            return;

                        }


                        const id =
                            href.substring(1);


                        const target =
                            getElement(id);


                        if(!target){

                            /*
                             * Do not prevent default if
                             * target genuinely doesn't exist.
                             */

                            return;

                        }


                        event.preventDefault();

                        goToSection(id);

                    }
                );

            }
        );


        /* =================================================
           ACTIVE LINK
        ================================================= */

        function setActive(id){

            desktopLinks.forEach(
                function(link){

                    link.classList.toggle(
                        "active",
                        link.getAttribute(
                            "data-section"
                        ) === id
                    );

                }
            );


            mobileLinks.forEach(
                function(link){

                    link.classList.toggle(
                        "active",
                        link.getAttribute(
                            "data-section"
                        ) === id
                    );

                }
            );

        }


        /* =================================================
           DETECT CURRENT SECTION
        ================================================= */

        function updateActive(){

            const marker =
                navHeight() +
                25;


            if (window.scrollY < 80) {

                setActive("home");

                return;

            }


            const totalHeight = document.documentElement.scrollHeight;

            if ((window.innerHeight + window.scrollY) >= (totalHeight - 50)) {

                setActive("contact");

                return;

            }


            let current = "home";


            for (let i = 0; i < sectionIDs.length; i++) {

                const id = sectionIDs[i];

                const section = getElement(id);


                if (!section) continue;


                const rect = section.getBoundingClientRect();


                if (rect.top <= marker) {

                    current = id;

                }

            }


            if (current) {

                setActive(current);

            }

        }


        /* =================================================
           SCROLL PERFORMANCE
        ================================================= */

        let ticking = false;


        window.addEventListener(
            "scroll",
            function(){

                if(ticking){

                    return;

                }


                window.requestAnimationFrame(
                    function(){

                        updateActive();

                        ticking = false;

                    }
                );


                ticking = true;

            },
            {
                passive:true
            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            updateActive
        );


        /* =================================================
           ESCAPE
        ================================================= */

        document.addEventListener(
            "keydown",
            function(event){

                if(
                    event.key === "Escape"
                ){

                    closeMenu();

                }

            }
        );


        /* =================================================
           INITIAL HASH
        ================================================= */

        function handleHash(){

            const hash =
                window.location.hash;


            if(!hash){

                updateActive();

                return;

            }


            const id =
                hash.substring(1);


            const target =
                getElement(id);


            if(!target){

                updateActive();

                return;

            }


            setTimeout(
                function(){

                    goToSection(id);

                },
                500
            );

        }


        /* =================================================
           INITIALIZE
        ================================================= */

        updateActive();

        handleHash();


        /*
         * Elementor can change the page layout
         * after initial load.
         */

        setTimeout(
            updateActive,
            500
        );

        setTimeout(
            updateActive,
            1500
        );

    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if(
        document.readyState === "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            initPalmNavigation
        );

    }else{

        initPalmNavigation();

    }


})();




/* FAQ accordion is now React-controlled via activeFaq state */


    } catch (e) {
      console.error("Effect error:", e);
    }

    return () => {
      window.removeEventListener("plmFormResult", handleFormResult);
      if (rafHandler) gsap.ticker.remove(rafHandler);
      if (lenis) lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="plm-site-wrapper text-white min-h-screen bg-[#0f1015]">
      <header className="plm-nav">

    <div className="plm-nav-inner">


        {/* LOGO */}

        <a href="#home" className="plm-nav-logo" aria-label="Palmlight Media" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>

            <img decoding="async" src="/logo.jpeg" alt="Palmlight Media Logo" width="44" height="44" style={{height:'44px', width:'44px', objectFit:'cover', borderRadius:'50%'}} />

            <span style={{ color: '#ffffff', fontSize: '19px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                Palmlight <span style={{ color: '#a855f7' }}>Media</span>
            </span>

        </a>


        {/* =================================================
             DESKTOP NAVIGATION
        ================================================== */}

        <nav className="plm-nav-links">


            <a href="#home" className="plm-nav-link active" data-section="home">
                Home
            </a>


            <a href="#about" className="plm-nav-link" data-section="about">
                About
            </a>


            <a href="#why-us" className="plm-nav-link" data-section="why-us">
                Why Us
            </a>


            <a href="#testimonials" className="plm-nav-link" data-section="testimonials">
                Testimonials
            </a>


            <a href="#portfolio" className="plm-nav-link" data-section="portfolio">
                Portfolio
            </a>


            <a href="#contact" className="plm-nav-link" data-section="contact">
                Contact
            </a>

        </nav>


        {/* =================================================
             DESKTOP CTA
        ================================================== */}

        <a href="https://wa.me/96875186675?text=Hello%20Palm%20Light%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-nav-cta">

            Start Your Project

            <span className="plm-nav-cta-arrow">
                →
            </span>

        </a>


        {/* =================================================
             MOBILE BUTTON
        ================================================== */}

        <button type="button" className="plm-menu-toggle" aria-label="Open menu" aria-expanded="false">

            <span className="plm-menu-lines">

                <span></span>
                <span></span>
                <span></span>

            </span>

        </button>

    </div>

</header>


{/* =======================================================
     MOBILE MENU
======================================================= */}

<div className="plm-mobile-menu" aria-hidden="true">

    <div className="plm-mobile-backdrop"></div>


    <div className="plm-mobile-panel">


        <div className="plm-mobile-header">

            <a href="#home" className="plm-mobile-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>

                <img decoding="async" src="/logo.jpeg" alt="Palmlight Media Logo" width="38" height="38" style={{height:'38px', width:'38px', objectFit:'cover', borderRadius:'50%'}} />

                <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: '900', letterSpacing: '-0.5px' }}>
                    Palmlight <span style={{ color: '#a855f7' }}>Media</span>
                </span>

            </a>

        </div>


        <nav className="plm-mobile-links">


            <a href="#home" className="plm-mobile-link active" data-section="home">

                <span>
                    <small className="plm-mobile-number">
                        01
                    </small>

                    Home
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#about" className="plm-mobile-link" data-section="about">

                <span>
                    <small className="plm-mobile-number">
                        02
                    </small>

                    About
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#why-us" className="plm-mobile-link" data-section="why-us">

                <span>
                    <small className="plm-mobile-number">
                        03
                    </small>

                    Why Us
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#testimonials" className="plm-mobile-link" data-section="testimonials">

                <span>
                    <small className="plm-mobile-number">
                        04
                    </small>

                    Testimonials
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#portfolio" className="plm-mobile-link" data-section="portfolio">

                <span>
                    <small className="plm-mobile-number">
                        05
                    </small>

                    Portfolio
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#contact" className="plm-mobile-link" data-section="contact">

                <span>
                    <small className="plm-mobile-number">
                        07
                    </small>

                    Contact
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="https://wa.me/96875186675?text=Hello%20Palm%20Light%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-mobile-cta">

                Start Your Project

                <span>→</span>

            </a>


            <div className="plm-mobile-bottom">

                Global · Remote
                &nbsp;•&nbsp;
                <strong>Palmlight Media</strong>

            </div>

        </nav>

    </div>

</div>


					{/* =========================================================
     PALM LIGHT MEDIA — MODERN 3D HERO
========================================================= */}

<section className="plm3-hero" id="home">

  {/* BACKGROUND */}
  <div className="plm3-grid"></div>
  <div className="plm3-noise"></div>

  <div className="plm3-glow plm3-glow-1"></div>
  <div className="plm3-glow plm3-glow-2"></div>

  {/* FLOATING PARTICLES */}
  <div className="plm3-particle p1"></div>
  <div className="plm3-particle p2"></div>
  <div className="plm3-particle p3"></div>
  <div className="plm3-particle p4"></div>


  <div className="plm3-container">

    {/* =====================================================
         LEFT SIDE
    ====================================================== */}

    <div className="plm3-copy">

      <div className="plm3-location">
        <span className="plm3-live"></span>
        GLOBAL · REMOTE
      </div>


      <h1 className="plm3-title">

        <span className="line">WE MAKE</span>

        <span className="line gradient-text">
          BUSINESSES
        </span>

        <span className="line">
          IMPOSSIBLE
        </span>

        <span className="line outline-text">
          TO IGNORE.
        </span>

      </h1>


      <p className="plm3-description">
        Websites. Social media. Design. Video. Apps. Software.
        SEO. Paid Ads.
        <strong>
         &nbsp; Everything your business needs to get seen,
          chosen and remembered.
        </strong>
      </p>


      {/* BUTTONS */}

      <div className="plm3-actions">

        <a href="https://wa.me/96875186675?text=Hello%20Palm%20Light%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm3-primary">

          <span>
            Start Your Project
          </span>

          <b>
            ↗
          </b>

        </a>


        <a href="#services" className="plm3-secondary">

          <span className="secondary-text">
            Explore What We Do
          </span>

          <span className="secondary-arrow">
            ↓
          </span>

        </a>

      </div>


      {/* PROOF */}

      <div className="plm3-proof">

        <div className="plm3-proof-number">

          <strong>
            80+
          </strong>

          <span>
            Businesses 
            <br />
            Served
          </span>

        </div>


        <div className="plm3-proof-line"></div>


        <div className="plm3-proof-number">

          <strong>
            08
          </strong>

          <span>
            Digital 
            <br />
            Services
          </span>

        </div>


        <div className="plm3-proof-line"></div>


        <div className="plm3-proof-number">

          <strong>
            01
          </strong>

          <span>
            Goal:
            <br />
            Your Growth
          </span>

        </div>

      </div>

    </div>



    {/* =====================================================
         RIGHT 3D VISUAL
    ====================================================== */}

    <div className="plm3-visual">

      {/* ROTATING RINGS */}

      <div className="plm3-ring ring-1"></div>
      <div className="plm3-ring ring-2"></div>
      <div className="plm3-ring ring-3"></div>


      {/* SERVICE ORBIT */}

      <div className="plm3-orbit">

        <div className="plm3-service service-1">
          <span>WEB</span>
        </div>

        <div className="plm3-service service-2">
          <span>SOCIAL</span>
        </div>

        <div className="plm3-service service-3">
          <span>DESIGN</span>
        </div>

        <div className="plm3-service service-4">
          <span>VIDEO</span>
        </div>

        <div className="plm3-service service-5">
          <span>APPS</span>
        </div>

        <div className="plm3-service service-6">
          <span>SOFTWARE</span>
        </div>

        <div className="plm3-service service-7">
          <span>SEO</span>
        </div>

        <div className="plm3-service service-8">
          <span>ADS</span>
        </div>

      </div>


      {/* MAIN 3D OBJECT — FLOATING LAPTOP SHOWCASE */}

      <div className="plm3-core plm3-core-laptop">

        <img
          src="/hero-laptop.png"
          alt="Palmlight Media 3D Floating Laptop Showcase"
          className="plm3-laptop-img"
        />

      </div>


      {/* ANALYTICS CARD */}

      <div className="plm3-floating-card analytics-card">

        <div className="card-top">

          <span>
            CAMPAIGN PERFORMANCE
          </span>

          <b>
            ↗
          </b>

        </div>


        <div className="analytics-number">
          +127.8%
        </div>


        <div className="analytics-label">
          Business visibility
        </div>


        <div className="mini-chart">

          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>

        </div>

      </div>


      {/* LEAD CARD */}

      <div className="plm3-floating-card lead-card">

        <div className="lead-icon">
          ↗
        </div>

        <div>

          <span>
            NEW LEAD
          </span>

          <strong>
            Someone found you.
          </strong>

        </div>

      </div>


      {/* SERVICE CARD */}

      <div className="plm3-floating-card service-card">

        <span className="service-dot"></span>

        <div>

          <small>
            BUILDING NOW
          </small>

          <strong>
            Digital Presence
          </strong>

        </div>

      </div>


      {/* DECORATIVE CURSOR */}

      <div className="plm3-cursor">
        <span></span>
      </div>

    </div>

  </div>


  {/* =====================================================
       CONTINUOUS MARQUEE
  ====================================================== */}

  <div className="plm3-marquee">

    <div className="plm3-marquee-track">


      {/* MARQUEE GROUP 1 */}

      <div className="plm3-marquee-group">

        <span>WEB DESIGN</span>
        <i>✦</i>

        <span>SOCIAL MEDIA</span>
        <i>✦</i>

        <span>GRAPHIC DESIGN</span>
        <i>✦</i>

        <span>VIDEOGRAPHY</span>
        <i>✦</i>

        <span>APP DEVELOPMENT</span>
        <i>✦</i>

        <span>SOFTWARE</span>
        <i>✦</i>

        <span>SEO</span>
        <i>✦</i>

        <span>PAID ADS</span>
        <i>✦</i>

      </div>


      {/* MARQUEE GROUP 2 — EXACT DUPLICATE */}

      <div className="plm3-marquee-group">

        <span>WEB DESIGN</span>
        <i>✦</i>

        <span>SOCIAL MEDIA</span>
        <i>✦</i>

        <span>GRAPHIC DESIGN</span>
        <i>✦</i>

        <span>VIDEOGRAPHY</span>
        <i>✦</i>

        <span>APP DEVELOPMENT</span>
        <i>✦</i>

        <span>SOFTWARE</span>
        <i>✦</i>

        <span>SEO</span>
        <i>✦</i>

        <span>PAID ADS</span>
        <i>✦</i>

      </div>


    </div>

  </div>

</section>







					{/* =========================================================
     PALM LIGHT MEDIA — SERVICES SECTION
     RESPONSIVE / PREMIUM VERSION
========================================================= */}

<section className="plm-services" id="what-we-do">
  <div id="services"></div>

  {/* BACKGROUND */}
  <div className="plm-services-transition"></div>
  <div className="plm-srv-grid"></div>

  <div className="plm-srv-glow plm-srv-glow-1"></div>
  <div className="plm-srv-glow plm-srv-glow-2"></div>


  <div className="plm-srv-container">


    {/* =====================================================
         SECTION INTRO
    ====================================================== */}

    <div className="plm-srv-heading">

      <div className="plm-srv-label">
        <span></span>
        WHAT WE DO
      </div>


      <div className="plm-srv-heading-row">

        <div className="plm-srv-title-wrap">

          <h2>
            EVERYTHING YOUR
            <span>BUSINESS</span>
            NEEDS TO STAND OUT.
          </h2>

        </div>


        <div className="plm-srv-intro">

          <p>
            From your first website visit to your next customer,
            we create the digital experiences that make your brand
            impossible to overlook.
          </p>


          <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-srv-link">

            <span className="plm-link-text">
              Let's build something
            </span>

            <span className="plm-link-arrow">
              ↗
            </span>

          </a>

        </div>

      </div>

    </div>



    {/* =====================================================
         SERVICES LIST
    ====================================================== */}

    <div className="plm-services-list">


      {/* ===================================================
           01 — WEB DESIGN
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          01
        </div>


        <div className="plm-service-icon web-icon">

          <div className="browser-frame">

            <div className="browser-dots">
              <i></i>
              <i></i>
              <i></i>
            </div>

            <div className="browser-screen">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            DIGITAL EXPERIENCE
          </div>

          <h3>
            Web
            <em>Design</em>
          </h3>

          <p>
            Premium, fast and conversion-focused websites
            designed to make your business look credible,
            modern and ready for growth.
          </p>

          <div className="plm-service-tags">
            <span>UI / UX</span>
            <span>WordPress</span>
            <span>Landing Pages</span>
            <span>Business Websites</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Web%20Design%20services." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Web Design on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           02 — SOCIAL MEDIA
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          02
        </div>


        <div className="plm-service-icon social-icon">

          <div className="social-orbit">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="social-symbol">
            ◎
          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            BRAND ATTENTION
          </div>

          <h3>
            Social
            <em>Media</em>
          </h3>

          <p>
            Strategic content, creative campaigns and social
            media management that keep your business visible
            and relevant.
          </p>

          <div className="plm-service-tags">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Content</span>
            <span>Strategy</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Social%20Media%20Marketing." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Social Media Marketing on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           03 — GRAPHIC DESIGN
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          03
        </div>


        <div className="plm-service-icon design-icon">

          <div className="design-shape shape-one"></div>
          <div className="design-shape shape-two"></div>
          <div className="design-shape shape-three"></div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            VISUAL IDENTITY
          </div>

          <h3>
            Graphic
            <em>Design</em>
          </h3>

          <p>
            Scroll-stopping visuals, branding and marketing
            creatives that make your business instantly
            recognizable.
          </p>

          <div className="plm-service-tags">
            <span>Branding</span>
            <span>Social Posts</span>
            <span>Ads</span>
            <span>Print</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Graphic%20Design." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Graphic Design on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           04 — VIDEOGRAPHY
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          04
        </div>


        <div className="plm-service-icon video-icon">

          <div className="video-frame">
            <span>▶</span>
          </div>

          <div className="video-line"></div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            STORYTELLING
          </div>

          <h3>
            Video
            <em>Production</em>
          </h3>

          <p>
            Professional videography, reels, promotional
            videos and editing designed to make people
            stop scrolling.
          </p>

          <div className="plm-service-tags">
            <span>Reels</span>
            <span>Commercials</span>
            <span>Editing</span>
            <span>Motion</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Videography%20%26%20Video%20Production." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Video Production on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           05 — APP DEVELOPMENT
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          05
        </div>


        <div className="plm-service-icon app-icon">

          <div className="phone-3d">

            <span className="phone-speaker"></span>

            <div className="phone-screen">
              <i></i>
              <i></i>
              <i></i>
            </div>

            <span className="phone-button"></span>

          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            DIGITAL PRODUCTS
          </div>

          <h3>
            App
            <em>Development</em>
          </h3>

          <p>
            Custom mobile applications built around your
            customers, your workflow and the way your
            business actually operates.
          </p>

          <div className="plm-service-tags">
            <span>Android</span>
            <span>iOS</span>
            <span>UI / UX</span>
            <span>Custom Apps</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20App%20Development." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss App Development on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           06 — INDUSTRIAL SOFTWARE
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          06
        </div>


        <div className="plm-service-icon software-icon">

          <div className="software-box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            BUSINESS SYSTEMS
          </div>

          <h3>
            Custom
            <em>SAAS</em>
          </h3>

          <p>
            Custom software solutions that simplify
            operations, automate repetitive work and
            help businesses run smarter.
          </p>

          <div className="plm-service-tags">
            <span>Automation</span>
            <span>Dashboards</span>
            <span>Management</span>
            <span>Custom Systems</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Industrial%20Software%20Development." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Industrial Software on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           07 — SEO
      ==================================================== */}

      <article className="plm-service-card">

        <div className="plm-service-number">
          07
        </div>


        <div className="plm-service-icon seo-icon">

          <div className="seo-circle">
            <span></span>
          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            ORGANIC GROWTH
          </div>

          <h3>
            Search
            <em>SEO</em>
          </h3>

          <p>
            Improve your visibility on search engines and
            get discovered when customers are actively
            looking for your services.
          </p>

          <div className="plm-service-tags">
            <span>Local SEO</span>
            <span>Google</span>
            <span>Keywords</span>
            <span>Optimization</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Search%20SEO%20services." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss SEO on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>



      {/* ===================================================
           08 — PAID ADS
      ==================================================== */}

      <article className="plm-service-card last-card">

        <div className="plm-service-number">
          08
        </div>


        <div className="plm-service-icon ads-icon">

          <div className="ads-target">
            <span></span>
          </div>

        </div>


        <div className="plm-service-main">

          <div className="plm-service-category">
            PAID GROWTH
          </div>

          <h3>
            Paid
            <em>Ads</em>
          </h3>

          <p>
            Targeted Google and Meta campaigns designed
            to put your business in front of the right
            audience and generate measurable results.
          </p>

          <div className="plm-service-tags">
            <span>Meta Ads</span>
            <span>Google Ads</span>
            <span>Lead Gen</span>
            <span>Retargeting</span>
          </div>

        </div>


        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27m%20interested%20in%20Paid%20Ads%20campaigns." target="_blank" rel="noopener noreferrer" className="plm-service-arrow" aria-label="Discuss Paid Ads on WhatsApp" style={{ textDecoration: 'none', cursor: 'pointer' }}>
          ↗
        </a>

      </article>


    </div>

  </div>

</section>







					{/* =========================================================
     PALM LIGHT MEDIA — ABOUT SECTION
     ORIGINAL DESIGN + FOUNDER CARD
========================================================= */}

<section className="plm-about" id="about">

  {/* BACKGROUND */}
  <div className="plm-about-grid"></div>

  <div className="plm-about-glow plm-about-glow-1"></div>
  <div className="plm-about-glow plm-about-glow-2"></div>


  <div className="plm-about-container">


    {/* =====================================================
         LEFT — IMAGE
    ====================================================== */}

    <div className="plm-about-visual">

      <div className="plm-about-image-wrap">

        <div className="plm-about-image-glow"></div>

        <img decoding="async" loading="lazy" className="plm-about-image" src="wp-content/uploads/2026/08/WhatsApp-Image-2026-08-15-at-6.55.21-PM.jpeg" alt="Shahnwaz Khan - Founder of Palmlight Media" />

        <div className="plm-about-image-fade"></div>

      </div>


      {/* =================================================
           FOUNDER CARD
      ================================================== */}

      <div className="plm-about-floating-card">

        <div className="plm-floating-dot"></div>

        <div>

          <strong>
            Shahnwaz Khan
          </strong>

          <span>
            FOUNDER OF PALMLIGHT MEDIA
          </span>

        </div>

      </div>


      {/* Decorative number */}

      <div className="plm-about-big-number">
        01
      </div>

    </div>



    {/* =====================================================
         RIGHT — CONTENT
    ====================================================== */}

    <div className="plm-about-content">


      {/* Label */}

      <div className="plm-about-label">

        <span></span>

        ABOUT PALMLIGHT MEDIA

      </div>


      {/* Main heading */}

      <h2 className="plm-about-title">

        BUILT TO MAKE YOUR
        <span>BUSINESS</span>
        IMPOSSIBLE TO IGNORE.

      </h2>


      {/* Intro */}

      <p className="plm-about-lead">

        Great businesses deserve more than just another
        website or another social media post.

      </p>


      {/* Main text */}

      <p className="plm-about-text">

        Palmlight Media helps businesses worldwide build
        a stronger digital presence through design, technology
        and marketing that actually works together.

        From your first impression to the moment a customer
        decides to contact you, we focus on making your brand
        look better, communicate clearly and compete harder.

      </p>


      {/* Highlight */}

      <div className="plm-about-highlight">

        <div className="plm-highlight-line"></div>

        <p>

          We don't just create things that &nbsp;
          <strong> look good.</strong>&nbsp;

          We create digital experiences
          designed to move your business forward.

        </p>

      </div>


      {/* ===================================================
           STATS
      ==================================================== */}

      <div className="plm-about-stats">


        <div className="plm-about-stat">

          <strong>
            80<span>+</span>
          </strong>

          <small>
            PROJECTS<br />
            COMPLETED
          </small>

        </div>


        <div className="plm-about-stat">

          <strong>
            35<span>+</span>
          </strong>

          <small>
            HAPPY<br />
            CLIENTS
          </small>

        </div>


        <div className="plm-about-stat">

          <strong>
            8<span>+</span>
          </strong>

          <small>
            YEARS OF<br />
            EXPERIENCE
          </small>

        </div>


      </div>


      {/* ===================================================
           CTA
      ==================================================== */}

      <a href="#contact" className="plm-about-button">

        <span>
          Let's Build Your Brand
        </span>

        <i>
          ↗
        </i>

      </a>


    </div>

  </div>


  {/* =====================================================
       BOTTOM DECORATIVE LINE
  ====================================================== */}

  <div className="plm-about-bottom-line"></div>

</section>


{/* =========================================================
     PALM LIGHT MEDIA — WHY US
     PREMIUM / MODERN / INTERACTIVE
========================================================= */}

<section className="plm-why" id="why-us">

  {/* Background */}
  <div className="plm-why-grid"></div>

  <div className="plm-why-glow plm-why-glow-1"></div>
  <div className="plm-why-glow plm-why-glow-2"></div>


  <div className="plm-why-container">


    {/* =====================================================
         TOP INTRO
    ====================================================== */}

    <div className="plm-why-header">

      <div className="plm-why-label">

        <span></span>

        WHY PALMLIGHT MEDIA

      </div>


      <h2 className="plm-why-title">

        NOT JUST ANOTHER
        <span>DIGITAL AGENCY.</span>

      </h2>


      <p className="plm-why-intro">

        We bring design, technology and marketing together
        to help businesses worldwide build a digital presence
        that gets noticed, remembered and trusted.

      </p>

    </div>



    {/* =====================================================
         DIFFERENTIATORS
    ====================================================== */}

    <div className="plm-why-grid-cards">


      {/* =================================================
           CARD 01
      ================================================== */}

      <article className="plm-why-card" data-number="01">

        <div className="plm-why-card-top">

          <span className="plm-why-number">
            01
          </span>

          <span className="plm-why-arrow">
            ↗
          </span>

        </div>


        <div className="plm-why-card-content">

          <h3>
            ONE TEAM.
            <br />
            EVERYTHING DIGITAL.
          </h3>

          <p>
            Websites, branding, content, social media,
            apps, SEO and advertising — all working
            under one creative direction.
          </p>

        </div>


        <div className="plm-why-card-line"></div>

      </article>



      {/* =================================================
           CARD 02
      ================================================== */}

      <article className="plm-why-card" data-number="02">

        <div className="plm-why-card-top">

          <span className="plm-why-number">
            02
          </span>

          <span className="plm-why-arrow">
            ↗
          </span>

        </div>


        <div className="plm-why-card-content">

          <h3>
            BUILT FOR
            <br />
            REAL BUSINESSES.
          </h3>

          <p>
            We don't create things just because they
            look good. Every design, campaign and
            digital experience has a purpose.
          </p>

        </div>


        <div className="plm-why-card-line"></div>

      </article>



      {/* =================================================
           CARD 03
      ================================================== */}

      <article className="plm-why-card" data-number="03">

        <div className="plm-why-card-top">

          <span className="plm-why-number">
            03
          </span>

          <span className="plm-why-arrow">
            ↗
          </span>

        </div>


        <div className="plm-why-card-content">

          <h3>
            CREATIVE
            <br />
            <span>×</span> TECHNOLOGY.
          </h3>

          <p>
            We combine creative thinking with development
            and digital strategy to build experiences that
            look impressive and work intelligently.
          </p>

        </div>


        <div className="plm-why-card-line"></div>

      </article>



      {/* =================================================
           CARD 04
      ================================================== */}

      <article className="plm-why-card" data-number="04">

        <div className="plm-why-card-top">

          <span className="plm-why-number">
            04
          </span>

          <span className="plm-why-arrow">
            ↗
          </span>

        </div>


        <div className="plm-why-card-content">

          <h3>
            GLOBALLY
            <br />
            <span>FOCUSED.</span>
          </h3>

          <p>
            We understand modern international standards and build high-impact digital solutions for businesses competing worldwide—with proven experience across the <strong>USA, UK, Germany, Spain, Scotland, Turkey, Oman, and India</strong>.
          </p>

          <div className="plm-country-tags">
            <span>🇺🇸 USA</span>
            <span>🇬🇧 UK</span>
            <span>🇩🇪 Germany</span>
            <span>🇪🇸 Spain</span>
            <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland</span>
            <span>🇹🇷 Turkey</span>
            <span>🇴🇲 Oman</span>
            <span>🇮🇳 India</span>
          </div>

        </div>


        <div className="plm-why-card-line"></div>

      </article>


    </div>



    {/* =====================================================
         BOTTOM STATEMENT
    ====================================================== */}

    <div className="plm-why-bottom">


      <div className="plm-why-bottom-line"></div>


      <div className="plm-why-bottom-content">

        <span>
          OUR APPROACH
        </span>

        <strong>
          DESIGN
          <i>×</i>
          TECHNOLOGY
          <i>×</i>
          GROWTH
        </strong>

      </div>


      <div className="plm-why-bottom-line"></div>


    </div>

  </div>

</section>


{/* =========================================================
     PALMLIGHT MEDIA — CLIENT TESTIMONIALS
     AUTO MOVING PREMIUM VERSION
========================================================= */}

<section className="plm-testimonials" id="testimonials">

  {/* =====================================================
       BACKGROUND
  ====================================================== */}

  <div className="plm-testimonials-grid"></div>

  <div className="plm-testimonials-glow glow-one"></div>
  <div className="plm-testimonials-glow glow-two"></div>
  <div className="plm-testimonials-glow glow-three"></div>


  {/* =====================================================
       CONTAINER
  ====================================================== */}

  <div className="plm-testimonials-container">


    {/* ===================================================
         HEADER
    ==================================================== */}

    <div className="plm-testimonials-header">

      <div className="plm-testimonials-label">

        <span></span>

        CLIENT TESTIMONIALS

      </div>


      <h2 className="plm-testimonials-title">

        DON'T TAKE
        <span>OUR WORD FOR IT.</span>

      </h2>


      <p className="plm-testimonials-intro">

        See what business owners say after working
        with Palmlight Media.

      </p>

    </div>



    {/* ===================================================
         MOVING TESTIMONIAL AREA
    ==================================================== */}

    <div className="plm-testimonials-marquee">

      <div className="plm-testimonials-track">


        {/* =================================================
             TESTIMONIAL 01 — DEMETRIO
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>


          {/* Giant quote */}

          <div className="plm-card-quote">
            “
          </div>


          {/* Top */}

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-22.webp" alt="Demetrio Guerrero" loading="lazy" />

              </div>


              <div className="plm-client-details">

                <strong>
                  Demetrio Guerrero
                </strong>

                <span>
                  Founder | ATXWD
                </span>

              </div>

            </div>


            <div className="plm-card-index">
              01
            </div>

          </div>


          {/* Quote */}

          <div className="plm-card-content">

            <p>

              Palmlight Media exceeded my expectations.
              Their team created engaging content and a strong
              social media strategy that helped my business reach
              more customers. The process was smooth,
              professional, and results-driven.

            </p>

          </div>


          {/* Bottom */}

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             TESTIMONIAL 02 — SHANNON
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>


          <div className="plm-card-quote">
            “
          </div>


          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-32.webp" alt="Shannon Aitken" loading="lazy" />

              </div>


              <div className="plm-client-details">

                <strong>
                  Shannon Aitken
                </strong>

                <span>
                  Founder | SiteClencher
                </span>

              </div>

            </div>


            <div className="plm-card-index">
              02
            </div>

          </div>


          <div className="plm-card-content">

            <p>

              I was looking for a creative agency that could
              handle my branding and social media without
              breaking the budget. Palmlight Media delivered
              outstanding designs, engaging content, and
              excellent communication throughout the project.

            </p>

          </div>


          {/* Bottom */}

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             TESTIMONIAL 03 — TODD
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>


          <div className="plm-card-quote">
            “
          </div>


          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-33.webp" alt="Todd Honohan" loading="lazy" />

              </div>


              <div className="plm-client-details">

                <strong>
                  Todd Honohan
                </strong>

                <span>
                  Owner | Honohan Consulting
                </span>

              </div>

            </div>


            <div className="plm-card-index">
              03
            </div>

          </div>


          <div className="plm-card-content">

            <p>

              Palmlight Media gave my consulting practice a polished
              website that builds trust with clients from the
              very first visit. The site is fast, professional,
              and clearly communicates the value I provide.
              The process was stress-free.

            </p>

          </div>


          {/* Bottom */}

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             TESTIMONIAL 04 — RODNEY
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>


          <div className="plm-card-quote">
            “
          </div>


          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-36.webp" alt="Rodney" loading="lazy" />

              </div>


              <div className="plm-client-details">

                <strong>
                  Rodney
                </strong>

                <span>
                  Owner | Austin's Collision
                </span>

              </div>

            </div>


            <div className="plm-card-index">
              04
            </div>

          </div>


          <div className="plm-card-content">

            <p>

              Palmlight Media helped me showcase my car repair
              services in a way that's easy for customers to
              find and understand. People in Austin can quickly
              contact me, and I've noticed more new customers
              finding me online.

            </p>

          </div>


          {/* Bottom */}

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             TESTIMONIAL 05 — NAZIM ALI
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Nazim-Ali.jpeg" alt="Nazim Ali" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Nazim Ali
                </strong>

                <span>
                  Self-Employed
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              05
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              I worked with Palmlight Media on my website and SEO,
              and honestly, I’m very happy with the results.
              They understood what I needed and made the whole
              process easy and smooth. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             TESTIMONIAL 06 — MERYEM NOUR
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Meryem.jpeg" alt="Meryem Nour" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Meryem Nour
                </strong>

                <span>
                  Self-Employed
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              06
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media helped me with my website setup
              and SEO, and the experience was really good.
              They were helpful, professional, and made sure
              everything was done properly. I’m happy with the
              final result. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>

		  {/* =================================================
             TESTIMONIAL 07 — SHAUN MOAT
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/K2ZDRTNM5NO6UNP3YD55.jpg" alt="Shaun Moat" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Shaun Moat
                </strong>

                <span>
                  Founder | Donut Pig
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              07
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media did an excellent job with my website and
              LMS setup. The entire process was smooth and professional.
              Shahnwaz was supportive, responsive, and understood exactly
              what I needed. Everything was completed perfectly. I’m
              genuinely satisfied with the final outcome. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>

		  {/* =================================================
             TESTIMONIAL 08 — Ajay Rawani
        ================================================== */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Ajay Rawani.png" alt="Ajay Rawani" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Ajay Rawani
                </strong>

                <span>
                  Founder | Amigo ManPower
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              08
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media helped us establish a strong online presence for
              Amigo Manpower. From designing our website to setting up our social
              media presence, their team was professional, responsive, and
              understood our needs perfectly. Highly recommended for reliable
              digital solutions and support.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* =================================================
             DUPLICATE SET
             Needed for seamless infinite animation
        ================================================== */}


        {/* DEMETRIO */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-22.webp" alt="Demetrio Guerrero" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Demetrio Guerrero
                </strong>

                <span>
                  Founder | ATXWD
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              01
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media exceeded my expectations.
              Their team created engaging content and a strong
              social media strategy that helped my business reach
              more customers. The process was smooth,
              professional, and results-driven.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* SHANNON */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-32.webp" alt="Shannon Aitken" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Shannon Aitken
                </strong>

                <span>
                  Founder | Site Lawncher
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              02
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              I was looking for a creative agency that could
              handle my branding and social media without
              breaking the budget. Palmlight Media delivered
              outstanding designs, engaging content, and
              excellent communication throughout the project.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* TODD */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-33.webp" alt="Todd Honohan" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Todd Honohan
                </strong>

                <span>
                  Owner | Honohan Consulting
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              03
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media gave my consulting practice a polished
              website that builds trust with clients from the
              very first visit. The site is fast, professional,
              and clearly communicates the value I provide.
              The process was stress-free.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* RODNEY */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="wp-content/uploads/2026/06/Untitled-design-36.webp" alt="Rodney" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Rodney
                </strong>

                <span>
                  Owner | Austin's Collision
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              04
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media helped me showcase my car repair
              services in a way that's easy for customers to
              find and understand. People in Austin can quickly
              contact me, and I've noticed more new customers
              finding me online.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* NAZIM ALI */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Nazim-Ali.jpeg" alt="Nazim Ali" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Nazim Ali
                </strong>

                <span>
                  Self-Employed
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              05
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              I worked with Palmlight Media on my website and SEO,
              and honestly, I’m very happy with the results.
              They understood what I needed and made the whole
              process easy and smooth. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



        {/* MERYEM NOUR */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Meryem.jpeg" alt="Meryem Nour" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Meryem Nour
                </strong>

                <span>
                  Self-Employed
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              06
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media helped me with my website setup
              and SEO, and the experience was really good.
              They were helpful, professional, and made sure
              everything was done properly. I’m happy with the
              final result. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>

		  {/* SHAUN MOAT */}

        <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/K2ZDRTNM5NO6UNP3YD55.jpg" alt="Shaun Moat" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Shaun Moat
                </strong>

                <span>
                  Founder| Donut Pig
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              07
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media did an excellent job with my website and
			  LMS setup. The entire process was smooth and professional.
              Shahnwaz was supportive, responsive, and understood exactly
              what I needed. Everything was completed perfectly. I’m
              genuinely satisfied with the final outcome. Highly recommended!

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>
        
		{/* Ajay Rawani */}

		  <article className="plm-testimonial-card">

          <div className="plm-card-glow"></div>

          <div className="plm-card-quote">
            “
          </div>

          <div className="plm-testimonial-top">

            <div className="plm-client-profile">

              <div className="plm-client-image">

                <img decoding="async" src="/Ajay Rawani.png" alt="Ajay Rawani" loading="lazy" />

              </div>

              <div className="plm-client-details">

                <strong>
                  Ajay Rawani
                </strong>

                <span>
                  Founder | Amigo ManPower
                </span>

              </div>

            </div>

            <div className="plm-card-index">
              08
            </div>

          </div>

          <div className="plm-card-content">

            <p>

              Palmlight Media helped us establish a strong online presence for
              Amigo Manpower. From designing our website to setting up our social
              media presence, their team was professional, responsive, and
              understood our needs perfectly. Highly recommended for reliable
              digital solutions and support.

            </p>

          </div>

          <div className="plm-card-bottom">

            <div className="plm-stars">
              ★★★★★
            </div>

            <span>
              CLIENT EXPERIENCE
            </span>

          </div>

        </article>



      </div>

    </div>



    {/* =====================================================
         BOTTOM TRUST NUMBERS
    ====================================================== */}

    <div className="plm-testimonial-trust">


      <div className="plm-trust-item">

        <strong>
          35<span>+</span>
        </strong>

        <small>
          HAPPY CLIENTS
        </small>

      </div>


      <div className="plm-trust-line"></div>


      <div className="plm-trust-item">

        <strong>
          78<span>+</span>
        </strong>

        <small>
          PROJECTS COMPLETED
        </small>

      </div>


      <div className="plm-trust-line"></div>


      <div className="plm-trust-item">

        <strong>
          8<span>+</span>
        </strong>

        <small>
          YEARS EXPERIENCE
        </small>

      </div>


      <div className="plm-trust-line"></div>


      <div className="plm-trust-item">

        <strong>
          100<span>%</span>
        </strong>

        <small>
          CREATIVE FOCUS
        </small>

      </div>


    </div>

  </div>

</section>


<section className="plm-video-section" id="vision">


    {/* =====================================================
         YOUTUBE BACKGROUND
    ====================================================== */}

    <div className="plm-video-bg">

        <iframe src="https://www.youtube.com/embed/D3r5dxDSZXI?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=D3r5dxDSZXI&amp;controls=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;disablekb=1" title="Palmlight Media Video Showcase" loading="lazy" allow="
                autoplay;
                encrypted-media;
                picture-in-picture;
            " allowFullScreen></iframe>

    </div>


    {/* =====================================================
         OVERLAYS
    ====================================================== */}

    <div className="plm-video-overlay"></div>

    <div className="plm-video-purple"></div>

    <div className="plm-video-vignette"></div>


    {/* =====================================================
         FLOATING 3D ELEMENTS
    ====================================================== */}

    <div className="plm-float plm-float-1"></div>

    <div className="plm-float plm-float-2"></div>

    <div className="plm-float plm-float-3"></div>


    {/* =====================================================
         CONTENT
    ====================================================== */}

    <div className="plm-video-content">


        <div className="plm-video-eyebrow">

            SIMPLE PLANS.
            POWERFUL EXECUTION.

        </div>


        <h2 className="plm-video-title">

            YOUR VISION,

            <span>OUR EXECUTION.</span>

        </h2>


        <p className="plm-video-description">

            You bring the ambition.
            We build everything around it — from your website
            and branding to content, social media, SEO and
            performance marketing.

            <br />

            <strong>
                One creative partner.
                Everything your business needs to grow.
            </strong>

        </p>


        <div className="plm-video-buttons">


            <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-video-btn plm-video-btn-primary">

                Start Your Project

                <span>↗</span>

            </a>


            <a href="#services" className="plm-video-btn plm-video-btn-secondary">

                Explore Services

                <span>↓</span>

            </a>


        </div>


    </div>


    {/* =====================================================
         BOTTOM TRANSITION
    ====================================================== */}

    <div className="plm-video-bottom"></div>


</section>


{/* =========================================================
     PALMLIGHT MEDIA — PORTFOLIO
========================================================= */}

<section className="plm-work" id="portfolio">


    {/* BACKGROUND */}

    <div className="plm-work-grid"></div>

    <div className="plm-orb plm-orb-1"></div>
    <div className="plm-orb plm-orb-2"></div>
    <div className="plm-orb plm-orb-3"></div>


    <div className="plm-work-container">


        {/* =================================================
             HEADER
        ================================================== */}

        <header className="plm-work-header">

            <div>

                <div className="plm-work-eyebrow">

                    <span></span>

                    SELECTED WORK

                </div>


                <h2 className="plm-work-title">

                    WE MAKE
                    <span>BRANDS MOVE.</span>

                </h2>

            </div>


            <p className="plm-work-description">

                From websites and branding to social media
                campaigns and digital experiences, here's a look
                at some of the projects we've helped bring to life.

            </p>

        </header>



        {/* =================================================
             PROJECT GRID
        ================================================== */}

        <div className="plm-project-grid">


            {/* =================================================
                 01 — SITELAWNCHER
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work5.jpeg"
                        alt="Sitelawncher Lawn Care Web Design and Lead Generation"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        01 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://sitelawncher.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Sitelawncher">
                        ↗
                    </a>


                    {/* SERVICES */}

                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                                <path d="M7 6.5h.01"></path>
                                <path d="M10 6.5h.01"></path>
                            </svg>
                            Website
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>
                            Branding
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M4 17l6-6 4 4 3-3 4 3"></path>
                                <circle cx="8" cy="9" r="1.5"></circle>
                            </svg>
                            SEO Setup
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Sitelawncher
                    </h3>


                    <p className="plm-project-description">
                        High-converting lawn care web platform with CRM automation, local SEO setup, and lead funnels.
                    </p>


                    <a className="plm-project-button" href="https://sitelawncher.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 02 — ADDISON CHIROPRACTIC
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work2.jpeg"
                        alt="Addison Chiropractic Healthcare Social Media"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        02 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/addisonchiroandsportsclinic/" target="_blank" rel="noopener noreferrer" aria-label="Visit Addison Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>
                            Social Media
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <circle cx="8" cy="9" r="1.5"></circle>
                                <path d="M4 17l5-5 4 4 2-2 5 4"></path>
                            </svg>
                            Healthcare Content
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h16"></path>
                                <path d="M12 4l8 8-8 8"></path>
                            </svg>
                            Strategy
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Addison Chiropractic
                    </h3>


                    <p className="plm-project-description">
                        Sports & rehab clinic social media management, patient education graphics, and brand positioning.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/addisonchiroandsportsclinic/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 03 — ALLURE BEAUTY STUDIO
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work3.jpeg"
                        alt="Allure Beauty Studio Social Media and Brand Direction"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        03 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/allurebeautystudiomuscat/" target="_blank" rel="noopener noreferrer" aria-label="Visit Allure Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>
                            Social Media
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <circle cx="8" cy="9" r="1.5"></circle>
                                <path d="M4 17l5-5 4 4 2-2 5 4"></path>
                            </svg>
                            Visual Content
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 3v18"></path>
                                <path d="M3 12h18"></path>
                                <path d="M5 5l14 14"></path>
                                <path d="M19 5L5 19"></path>
                            </svg>
                            Campaigns
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Allure Beauty Studio
                    </h3>


                    <p className="plm-project-description">
                        Luxury beauty salon branding, high-aesthetic social media curation, and premium visual campaigns.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/allurebeautystudiomuscat/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 04 — FREEWEBING
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work4.jpeg"
                        alt="Freewebing Modern Web Agency Platform"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        04 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://freewebing.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Freewebing">
                        ↗
                    </a>


                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>
                            Website
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>
                            Branding
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>
                            Digital Growth
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Freewebing
                    </h3>


                    <p className="plm-project-description">
                        Agency digital architecture, frictionless web design, and conversion-focused customer acquisition.
                    </p>


                    <a className="plm-project-button" href="https://freewebing.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 05 — DOPEMAN MARKETING
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work6.jpeg"
                        alt="Dopeman Marketing High Impact Brand and Landing Page"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        05 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://dopemanmarketing.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Dopeman Marketing">
                        ↗
                    </a>


                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>
                            Website
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>
                            Branding
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Social Media
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h16"></path>
                                <path d="M12 4l8 8-8 8"></path>
                            </svg>
                            Paid Ads
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Dopeman Marketing
                    </h3>


                    <p className="plm-project-description">
                        Bold, edgy marketing agency digital presence, custom high-contrast landing page, and brand identity.
                    </p>


                    <a className="plm-project-button" href="https://dopemanmarketing.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 06 — KLUB808
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <img
                        src="/work1.jpeg"
                        alt="Klub808 Nightclub Events Flyers and Social Media"
                        className="plm-project-img"
                        loading="lazy"
                    />

                    <div className="plm-project-img-overlay"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        06 / 06
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/klub808muscat/" target="_blank" rel="noopener noreferrer" aria-label="Visit Klub808 Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            Social Media
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                                <path d="M10 9l5 3-5 3V9z"></path>
                            </svg>
                            Flyer Design
                        </span>

                        <span className="plm-service">
                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h16"></path>
                                <path d="M12 4l8 8-8 8"></path>
                            </svg>
                            Promotions
                        </span>

                    </div>


                    <h3 className="plm-project-title">
                        Klub808
                    </h3>


                    <p className="plm-project-description">
                        Nightlife entertainment branding, event promo campaigns, DJ flyers, and viral social media marketing.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/klub808muscat/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>


        </div>



        {/* =================================================
             BOTTOM CTA
        ================================================== */}

        <div className="plm-work-bottom">

            <a href="#contact" className="plm-work-more">

                HAVE A PROJECT IN MIND?

                <span>
                    LET'S TALK ↗
                </span>

            </a>

        </div>


    </div>

</section>


<section className="plm-pricing" id="pricing">


    {/* BACKGROUND */}

    <div className="plm-pricing-grid"></div>

    <div className="plm-pricing-glow"></div>

    <div className="plm-pricing-glow2"></div>

    <div className="plm-pricing-glow3"></div>


    {/* FLOATING ORBS */}

    <div className="plm-price-orb o1"></div>

    <div className="plm-price-orb o2"></div>

    <div className="plm-price-orb o3"></div>


    {/* PARTICLES */}

    <div className="plm-price-particles">

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

    </div>


    {/* DECORATIVE CORNERS */}

    <div className="plm-price-corner c1"></div>

    <div className="plm-price-corner c2"></div>


    {/* =====================================================
         CONTENT
    ====================================================== */}

    <div className="plm-pricing-container">


        {/* BADGE */}

        <div className="plm-pricing-badge">

            TAILORED SOLUTIONS

        </div>


        {/* HEADLINE */}

        <h2 className="plm-custom-title">

            No Cookie-Cutter Packages. <br />
            <span>100% Built Around Your Vision.</span>

        </h2>


        <p className="plm-custom-subtitle">

            Every business is unique. We engineer custom digital strategies, high-performance design, and scalable code tailored to your exact market and growth targets.

        </p>


        {/* 3 VALUE PILLARS */}

        <div className="plm-custom-features">

            {/* PILLAR 01 */}
            <div className="plm-custom-feature-card">

                <div className="plm-custom-card-top">
                    <span className="plm-custom-card-tag">01 / STRATEGY</span>
                    <div className="plm-custom-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                    </div>
                </div>

                <h4>Bespoke Strategic Blueprint</h4>

                <p>
                    Zero generic templates. We research your specific competitive landscape, consumer psychographics, and conversion funnels to architect a bespoke digital roadmap.
                </p>

                <ul className="plm-custom-card-list">
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Market & Competitive Whitespace Audit</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Custom High-Fidelity UX/UI Flows</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Conversion-Engineered Architecture</span>
                    </li>
                </ul>

            </div>


            {/* PILLAR 02 */}
            <div className="plm-custom-feature-card">

                <div className="plm-custom-card-top">
                    <span className="plm-custom-card-tag">02 / VELOCITY</span>
                    <div className="plm-custom-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                </div>

                <h4>Agile High-Velocity Execution</h4>

                <p>
                    Direct, frictionless developer communication with weekly production milestones, rapid sprint deliverables, and 100% full intellectual property and code ownership.
                </p>

                <ul className="plm-custom-card-list">
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Direct Senior Developer Channel</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Weekly Milestones & Live Staging</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>100% Full Code & Asset Ownership</span>
                    </li>
                </ul>

            </div>


            {/* PILLAR 03 */}
            <div className="plm-custom-feature-card">

                <div className="plm-custom-card-top">
                    <span className="plm-custom-card-tag">03 / PERFORMANCE</span>
                    <div className="plm-custom-feature-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                            <polyline points="16 7 22 7 22 13" />
                        </svg>
                    </div>
                </div>

                <h4>Measurable Growth & High ROI</h4>

                <p>
                    Engineered to turn cold traffic into committed, paying clients. Blazing sub-second load times, deep technical SEO, and conversion tracking that proves ROI.
                </p>

                <ul className="plm-custom-card-list">
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>95+ Google PageSpeed Performance</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>High-Converting Lead Capture Funnels</span>
                    </li>
                    <li>
                        <svg className="plm-check-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>End-to-End Analytics & Tracking</span>
                    </li>
                </ul>

            </div>

        </div>


        {/* PURPLE ACCENT LINE */}

        <div className="plm-price-line"></div>


        {/* CTA */}

        <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20discuss%20a%20custom%20project%20estimate." target="_blank" rel="noopener noreferrer" className="plm-pricing-button">

            Get A Free Custom Proposal

            <span className="plm-pricing-button-arrow">
                →
            </span>

        </a>


        {/* TRUST GUARANTEES */}

        <div className="plm-pricing-guarantees">

            <div className="plm-guarantee-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Strict Non-Disclosure (NDA)</span>
            </div>

            <div className="plm-guarantee-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>24-Hour Scope & Estimate Turnaround</span>
            </div>

            <div className="plm-guarantee-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Direct Senior Engineer & Founder Access</span>
            </div>

        </div>


    </div>


</section>


        {/* =========================================================
             MEET OUR TEAM SECTION
        ========================================================= */}
        <section className="plm-team" id="team">

            {/* BACKGROUND */}
            <div className="plm-team-grid-bg"></div>
            <div className="plm-team-orb"></div>

            <div className="plm-team-container">

                {/* HEADER */}
                <div className="plm-team-header">
                    <div className="plm-team-badge">
                        OUR TEAM
                    </div>

                    <h2>
                        Meet The Minds <span>Behind Palmlight Media.</span>
                    </h2>

                    <p>
                        A dedicated team of growth strategists, full-stack developers, and e-commerce experts driving digital transformation.
                    </p>
                </div>

                {/* TEAM GRID */}
                <div className="plm-team-grid">

                    {/* MEMBER 1 */}
                    <div className="plm-team-card">
                        <div className="plm-team-image-wrap">
                            <img 
                                src="/founder-new.jpeg" 
                                alt="Shahnwaz Khan - Founder & Operation Manager" 
                                className="plm-team-image"
                                loading="lazy"
                            />
                            <div className="plm-team-card-overlay"></div>
                        </div>

                        <div className="plm-team-card-content">
                            <h3 className="plm-team-name">Shahnwaz Khan</h3>
                            <div className="plm-team-pill">
                                Founder &amp; Operation Manager
                            </div>
                        </div>
                    </div>

                    {/* MEMBER 2 */}
                    <div className="plm-team-card">
                        <div className="plm-team-image-wrap">
                            <img 
                                src="/imran.jpeg" 
                                alt="Imran Sheikh - Full Stack Developer" 
                                className="plm-team-image"
                                loading="lazy"
                            />
                            <div className="plm-team-card-overlay"></div>
                        </div>

                        <div className="plm-team-card-content">
                            <h3 className="plm-team-name">Imran Sheikh</h3>
                            <div className="plm-team-pill">
                                Full Stack Developer
                            </div>
                        </div>
                    </div>

                    {/* MEMBER 3 */}
                    <div className="plm-team-card">
                        <div className="plm-team-image-wrap">
                            <img 
                                src="/gupta.jpeg" 
                                alt="Rashmi Gupta - Shopify Developer & Social Media Manager" 
                                className="plm-team-image"
                                loading="lazy"
                            />
                            <div className="plm-team-card-overlay"></div>
                        </div>

                        <div className="plm-team-card-content">
                            <h3 className="plm-team-name">Rashmi Gupta</h3>
                            <div className="plm-team-pill">
                                Shopify Developer &amp; Social Media Manager
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>


        <section className="plm-faq" id="faq">


    {/* BACKGROUND */}

    <div className="plm-faq-grid"></div>

    <div className="plm-faq-orb"></div>


    <div className="plm-faq-container">


        {/* =================================================
             HEADER
        ================================================== */}

        <div className="plm-faq-header">


            <div className="plm-faq-heading">


                <div className="plm-faq-badge">

                    FAQ

                </div>


                <h2>

                    Questions? &nbsp;
                    <span>We've got answers.</span>

                </h2>


                <p>

                    Everything you need to know before
                    starting your next project with
                    Palmlight Media.

                </p>


            </div>


            <div className="plm-faq-header-note">

                <strong>Still deciding?</strong><br />

                No pressure. Explore the answers below
                or speak directly with our team about
                your project.

            </div>


        </div>



        {/* =================================================
             CONTENT
        ================================================== */}

        <div className="plm-faq-content">


            {/* =================================================
                 LEFT CARD
        ================================================== */}

            <div className="plm-faq-intro">


                <div className="plm-faq-intro-label">

                    Palmlight Media

                </div>


                <h3>

                    Let's make your
                   &nbsp; <span>next move.</span>

                </h3>


                <p>

                    From websites and branding to social
                    media, SEO, paid advertising and
                    software development — we bring the
                    creative and digital pieces together
                    to help your business grow.

                </p>


                <a href="#contact-us" className="plm-faq-button">

                    Get Started Now

                    <span>→</span>

                </a>


            </div>



            {/* =================================================
                 FAQ
            ================================================== */}

            <div className="plm-faq-list">


                {/* FAQ 01 */}

                <div className={`plm-faq-item${activeFaq === 0 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 0} onClick={() => toggleFaq(0)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                01
                            </span>

                            <span className="plm-faq-question-text">
                                What services do you offer?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                We provide Web Designing,
                                Social Media Marketing,
                                Graphic Designing,
                                Videography &amp; Editing,
                                App Development,
                                Industrial Software Development,
                                SEO and Paid Ads.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 02 */}

                <div className={`plm-faq-item${activeFaq === 1 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 1} onClick={() => toggleFaq(1)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                02
                            </span>

                            <span className="plm-faq-question-text">
                                Do you work with global clients?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Yes. Palmlight Media works
                                with businesses worldwide to
                                build stronger brands, high-performing
                                websites and a powerful
                                digital presence.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 03 */}

                <div className={`plm-faq-item${activeFaq === 2 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 2} onClick={() => toggleFaq(2)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                03
                            </span>

                            <span className="plm-faq-question-text">
                                How do you work with remote clients?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                We operate with a fully remote and seamless digital workflow, enabling smooth collaboration across time zones. We have successfully delivered digital solutions for clients in the <strong>USA, UK, Germany, Spain, Scotland, Turkey, Oman, and India</strong>.

                                <div className="plm-faq-country-tags">
                                    <span>🇺🇸 USA</span>
                                    <span>🇬🇧 UK</span>
                                    <span>🇩🇪 Germany</span>
                                    <span>🇪🇸 Spain</span>
                                    <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland</span>
                                    <span>🇹🇷 Turkey</span>
                                    <span>🇴🇲 Oman</span>
                                    <span>🇮🇳 India</span>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 04 */}

                <div className={`plm-faq-item${activeFaq === 3 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 3} onClick={() => toggleFaq(3)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                04
                            </span>

                            <span className="plm-faq-question-text">
                                Can I see examples of your previous work?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Absolutely. Explore our Portfolio
                                section to see examples of websites,
                                branding, graphic design, social
                                media campaigns and other creative
                                projects.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 05 */}

                <div className={`plm-faq-item${activeFaq === 4 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 4} onClick={() => toggleFaq(4)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                05
                            </span>

                            <span className="plm-faq-question-text">
                                How much does a website cost?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Website pricing depends on
                                the size, features, functionality
                                and design requirements. We
                                recommend an option based on
                                what your business actually needs.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 06 */}

                <div className={`plm-faq-item${activeFaq === 5 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 5} onClick={() => toggleFaq(5)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                06
                            </span>

                            <span className="plm-faq-question-text">
                                How long does it take to build a website?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                The timeline depends on the scope
                                of the project. Standard business
                                websites can be completed relatively
                                quickly, while larger websites,
                                applications and custom software
                                require more development time.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 07 */}

                <div className={`plm-faq-item${activeFaq === 6 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 6} onClick={() => toggleFaq(6)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                07
                            </span>

                            <span className="plm-faq-question-text">
                                Do you offer ongoing maintenance and support?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Yes. We provide ongoing website
                                maintenance, updates, technical
                                support and other digital assistance
                                based on your requirements.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 08 */}

                <div className={`plm-faq-item${activeFaq === 7 ? ' active' : ''}`}>


                    <button className="plm-faq-question" type="button" aria-expanded={activeFaq === 7} onClick={() => toggleFaq(7)}>

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                08
                            </span>

                            <span className="plm-faq-question-text">
                                Do you manage social media accounts?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Yes. Our social media management
                                can include content planning,
                                graphic design, reels and video
                                editing, posting, account management,
                                campaigns and paid advertising.

                            </div>

                        </div>

                    </div>


                </div>


            </div>


        </div>


        {/* =================================================
             BOTTOM
        ================================================== */}

        <div className="plm-faq-bottom">

            Still have questions?

            <a href="#contact-us">
                Talk to us →
            </a>

        </div>


    </div>

</section>


{/* =========================================================
     FINAL CTA
========================================================= */}

<section className="plm-final-cta" id="final-cta">


    {/* BACKGROUND GRID */}

    <div className="plm-cta-grid"></div>


    {/* GLOWING ORBS */}

    <div className="plm-cta-orb plm-cta-orb-1"></div>

    <div className="plm-cta-orb plm-cta-orb-2"></div>


    {/* PARTICLES */}

    <div className="plm-cta-particles">

        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>
        <span className="plm-cta-particle"></span>

    </div>


    {/* CENTER 3D GLOW */}

    <div className="plm-cta-object"></div>


    {/* FLOATING LABELS */}

    <div className="plm-cta-card plm-cta-card-1">
        WEB • SOCIAL • DESIGN
    </div>

    <div className="plm-cta-card plm-cta-card-2">
        SEO • ADS • VIDEO
    </div>


    {/* CONTENT */}

    <div className="plm-cta-container">


        <div className="plm-cta-label">
            LET'S BUILD SOMETHING GREAT
        </div>


        <h2 className="plm-cta-title">

            READY TO MAKE

            <span>YOUR BUSINESS MOVE?</span>

        </h2>


        <p className="plm-cta-description">

            Your next customer is already online.
            Let's build the website, content, branding and
            marketing that makes them choose you.

        </p>


        <div className="plm-cta-buttons">


            <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-cta-btn plm-cta-primary">

                Start Your Project

                <span>↗</span>

            </a>


            <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-cta-btn plm-cta-secondary">

                Talk to Us

                <span>→</span>

            </a>


        </div>


    </div>


    {/* BOTTOM TRANSITION */}

    <div className="plm-cta-bottom"></div>


</section>


{/* =========================================================
     CONTACT SECTION
========================================================= */}

<section className="plm-contact" id="contact">
  <div id="contact-us"></div>


    {/* BACKGROUND */}

    <div className="plm-contact-grid"></div>

    <div className="plm-contact-orb plm-contact-orb-1"></div>

    <div className="plm-contact-orb plm-contact-orb-2"></div>


    {/* =====================================================
         MAIN CONTAINER
    ====================================================== */}

    <div className="plm-contact-container">


        {/* =================================================
             LEFT SIDE
        ================================================== */}

        <div className="plm-contact-left">


            {/* LABEL */}

            <div className="plm-contact-label">

                GET IN TOUCH

            </div>


            {/* TITLE */}

            <h2 className="plm-contact-title">

                LET'S

                <span>
                    TALK.
                </span>

            </h2>


            {/* DESCRIPTION */}

            <p className="plm-contact-description">

                Have a business that deserves more attention?

                Tell us what you're building, where you're stuck,
                and where you want to go.

                We'll figure out how Palmlight Media can help
                turn that idea into something people notice.

            </p>


            {/* =================================================
                 CONTACT DETAILS
            ================================================== */}

            <div className="plm-contact-details">


                {/* =============================================
                     CALL
                ============================================== */}

                <a href="tel:+96875186675" className="plm-contact-detail" aria-label="Call Palmlight Media">

                    <div className="plm-contact-icon">

                        {/* PHONE SVG */}

                        <svg viewBox="0 0 24 24" aria-hidden="true">

                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                                19.79 19.79 0 0 1-8.63-3.07
                                19.5 19.5 0 0 1-6-6
                                A19.79 19.79 0 0 1 2.12 4.18
                                2 2 0 0 1 4.11 2h3
                                a2 2 0 0 1 2 1.72
                                12.84 12.84 0 0 0 .7 2.81
                                2 2 0 0 1-.45 2.11L8.09 9.91
                                a16 16 0 0 0 6 6l1.27-1.27
                                a2 2 0 0 1 2.11-.45
                                12.84 12.84 0 0 0 2.81.7
                                A2 2 0 0 1 22 16.92z"></path>

                        </svg>

                    </div>


                    <div className="plm-contact-detail-text">

                        <small>
                            Call
                        </small>

                        <strong>
                            +968 7518 6675
                        </strong>

                    </div>

                </a>


                {/* =============================================
                     EMAIL
                ============================================== */}

                <a href="mailto:info@palmlightmedia.com" className="plm-contact-detail" aria-label="Email Palmlight Media">

                    <div className="plm-contact-icon">

                        {/* EMAIL SVG */}

                        <svg viewBox="0 0 24 24" aria-hidden="true">

                            <path d="M4 4h16
                                a2 2 0 0 1 2 2v12
                                a2 2 0 0 1-2 2H4
                                a2 2 0 0 1-2-2V6
                                a2 2 0 0 1 2-2z"></path>

                            <polyline points="22,6 12,13 2,6"></polyline>

                        </svg>

                    </div>


                    <div className="plm-contact-detail-text">

                        <small>
                            Email
                        </small>

                        <strong>
                            info@palmlightmedia.com
                        </strong>

                    </div>

                </a>


                {/* =============================================
                     WEBSITE
                ============================================== */}

                <a href="https://palmlightmedia.com" className="plm-contact-detail" target="_blank" rel="noopener noreferrer" aria-label="Visit Palmlight Media website">

                    <div className="plm-contact-icon">

                        {/* GLOBE SVG */}

                        <svg viewBox="0 0 24 24" aria-hidden="true">

                            <circle cx="12" cy="12" r="10"></circle>

                            <line x1="2" y1="12" x2="22" y2="12"></line>

                            <path d="M12 2
                                a15.3 15.3 0 0 1
                                4 10
                                15.3 15.3 0 0 1
                                -4 10
                                15.3 15.3 0 0 1
                                -4-10
                                15.3 15.3 0 0 1
                                4-10z"></path>

                        </svg>

                    </div>


                    <div className="plm-contact-detail-text">

                        <small>
                            Website
                        </small>

                        <strong>
                            palmlightmedia.com
                        </strong>

                    </div>

                </a>


                {/* =============================================
                     ADDRESS
                ============================================== */}

                <div className="plm-contact-detail" aria-label="Palmlight Media address">

                    <div className="plm-contact-icon">

                        {/* LOCATION SVG */}

                        <svg viewBox="0 0 24 24" aria-hidden="true">

                            <path d="M21 10
                                c0 7-9 12-9 12
                                S3 17 3 10
                                a9 9 0 0 1
                                18 0z"></path>

                            <circle cx="12" cy="10" r="3"></circle>

                        </svg>

                    </div>


                    <div className="plm-contact-detail-text">

                        <small>
                            Location
                        </small>

                        <strong>
                            Global · Remote
                        </strong>

                    </div>

                </div>


            </div>


            {/* FLOATING BADGE */}

            <div className="plm-contact-floating">

                WEB • SOCIAL • DESIGN

            </div>


        </div>


        {/* =================================================
             RIGHT — FORM
        ================================================== */}

        <div className="plm-contact-form-wrapper">


            <div className="plm-contact-3d"></div>


            <div className="plm-form-header">

                <h3>
                    Tell us about your project.
                </h3>

                <p>
                    Fill in the details and we'll get back to you.
                </p>

            </div>


            <form className="plm-contact-form" id="contact-form" action="#" method="post">


                <div className="plm-form-grid">


                    {/* NAME */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-name">
                            Your Name *
                        </label>

                        <input type="text" id="plm-name" name="name" placeholder="Enter your name" required="" />

                    </div>


                    {/* BUSINESS */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-business">
                            Business Name <span style={{ opacity: 0.6, fontSize: '13px', fontWeight: 'normal' }}>(Optional)</span>
                        </label>

                        <input type="text" id="plm-business" name="business" placeholder="Your business" />

                    </div>


                    {/* EMAIL */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-email">
                            Email *
                        </label>

                        <input type="email" id="plm-email" name="email" placeholder="you@example.com" required="" />

                    </div>


                    {/* PHONE */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-phone">
                            Phone *
                        </label>

                        <input type="tel" id="plm-phone" name="phone" placeholder="+1 (555) 000-0000" required="" />

                    </div>


                    {/* SERVICE */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-service">
                            What do you need? *
                        </label>

                        <select id="plm-service" name="service" required="">

                            <option value="">
                                Select a service
                            </option>

                            <option>
                                Web Designing
                            </option>

                            <option>
                                Social Media Marketing
                            </option>

                            <option>
                                Graphic Designing
                            </option>

                            <option>
                                Videography &amp; Editing
                            </option>

                            <option>
                                App Development
                            </option>

                            <option>
                                Industrial Software Development
                            </option>

                            <option>
                                SEO
                            </option>

                            <option>
                                Paid Ads
                            </option>

                            <option>
                                Multiple Services
                            </option>

                            <option>
                                Not Sure — Need Advice
                            </option>

                        </select>

                    </div>


                    {/* BUDGET */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-budget">
                            Approx. Budget *
                        </label>

                        <select id="plm-budget" name="budget" required="">

                            <option value="">
                                Select budget
                            </option>

                            <option>
                                Under OMR 50
                            </option>

                            <option>
                                OMR 50 – 100
                            </option>

                            <option>
                                OMR 100 – 250
                            </option>

                            <option>
                                OMR 250 – 500
                            </option>

                            <option>
                                OMR 500+
                            </option>

                            <option>
                                Let's Discuss
                            </option>

                        </select>

                    </div>


                    {/* MESSAGE */}

                    <div className="plm-form-field full">

                        <label htmlFor="plm-message">
                            Tell us about your project <span style={{ opacity: 0.6, fontSize: '13px', fontWeight: 'normal' }}>(Optional)</span>
                        </label>

                        <textarea id="plm-message" name="message" placeholder="What are you looking to build, improve or promote?"></textarea>

                    </div>


                </div>


                {/* SUBMIT */}

                <button type="submit" className="plm-form-submit">

                    Send Project Request

                    <span>
                        ↗
                    </span>

                </button>


                <p className="plm-form-note">

                    Your information is used only to contact you
                    regarding your project.

                </p>


            </form>


        </div>


    </div>


</section>











{/* =========================================================
     FOOTER
========================================================= */}

<footer className="plm-footer">


    {/* BACKGROUND */}

    <div className="plm-footer-grid"></div>

    <div className="plm-footer-orb"></div>


    <div className="plm-footer-container">


        {/* =================================================
             MAIN FOOTER
        ================================================== */}

        <div className="plm-footer-main">


            {/* BRAND */}

            <div className="plm-footer-brand">


                <a href="#home" className="plm-footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>

                    <img src="/logo.jpeg" alt="Palmlight Media Logo" width="52" height="52" style={{height:'52px', width:'52px', objectFit:'cover', borderRadius:'50%'}} />

                    <span className="plm-footer-logo-text" style={{ color: '#ffffff', fontSize: '22px', fontWeight: '900', letterSpacing: '-0.7px' }}>
                        Palmlight <span style={{ color: '#a855f7' }}>Media</span>
                    </span>

                </a>


                <p className="plm-footer-description">

                    We help businesses get noticed,
                    remembered and chosen — through
                    websites, branding, content, marketing
                    and technology built for growth.

                </p>


                <div className="plm-footer-location">

                    <span>✦</span>

                    Global · Remote Agency

                </div>


                {/* SOCIAL */}

                <div className="plm-footer-socials">

                    <a href="https://www.instagram.com/palmlightmedia/" target="_blank" rel="noopener noreferrer" className="plm-footer-social" aria-label="Follow Palmlight Media on Instagram">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>

                    <a href="https://www.youtube.com/@palmlightmedia" target="_blank" rel="noopener noreferrer" className="plm-footer-social" aria-label="Subscribe to Palmlight Media on YouTube">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>

                    <a href="https://www.facebook.com/palmlightmedia" target="_blank" rel="noopener noreferrer" className="plm-footer-social" aria-label="Follow Palmlight Media on Facebook">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                    </a>

                    <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-footer-social" aria-label="Chat with Palmlight Media on WhatsApp">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                    </a>

                </div>


            </div>


            {/* =================================================
                 EXPLORE
            ================================================== */}

            <div className="plm-footer-column">

                <h3>
                    Explore
                </h3>

                <div className="plm-footer-links">

                    <a href="#home">
                        Home
                    </a>

                    <a href="#about">
                        About
                    </a>

                    <a href="#services">
                        Services
                    </a>

                    <a href="#portfolio">
                        Portfolio
                    </a>

                    <a href="#pricing">
                        Pricing
                    </a>

                    <a href="#contact-us">
                        Contact
                    </a>

                </div>

            </div>


            {/* =================================================
                 SERVICES
            ================================================== */}

            <div className="plm-footer-column">

                <h3>
                    Services
                </h3>

                <div className="plm-footer-links">

                    <a href="#services">
                        Web Designing
                    </a>

                    <a href="#services">
                        Social Media Marketing
                    </a>

                    <a href="#services">
                        Graphic Designing
                    </a>

                    <a href="#services">
                        Videography &amp; Editing
                    </a>

                    <a href="#services">
                        App Development
                    </a>

                    <a href="#services">
                        SEO &amp; Paid Ads
                    </a>

                </div>

            </div>


            {/* =================================================
                 CONTACT
            ================================================== */}

            <div className="plm-footer-column">

                <h3>
                    Let's Connect
                </h3>

                <div className="plm-footer-links">

                    <a href="mailto:hello@palmlightmedia.com">
                        hello@palmlightmedia.com
                    </a>

                    <a href="https://wa.me/96875186675" target="_blank" rel="noopener noreferrer">
                        WhatsApp
                    </a>

                    <a href="#contact-us">
                        Start a Project
                    </a>

                    <a href="#faq">
                        FAQ
                    </a>

                </div>

            </div>


        </div>


        {/* =================================================
             MINI CTA
        ================================================== */}

        <div className="plm-footer-mini-cta">


            <div className="plm-footer-mini-cta-text">

                <h3>
                    Have an idea? Let's make it real.
                </h3>

                <p>
                    Tell us what you need. We'll take it from there.
                </p>

            </div>


            <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20start%20a%20project." target="_blank" rel="noopener noreferrer" className="plm-footer-mini-btn">

                Start Your Project

                <span>↗</span>

            </a>


        </div>


        {/* =================================================
             BOTTOM
        ================================================== */}

        <div className="plm-footer-bottom">


            <div className="plm-footer-copyright">

                © 2026 Palmlight Media.
                All rights reserved.

            </div>




        </div>


        {/* BACK TO TOP */}

        <a href="#" className="plm-footer-top" aria-label="Back to top">
            ↑
        </a>


    </div>


</footer>

    {/* =========================================================
         SITEWIDE STICKY FLOATING WHATSAPP
    ========================================================== */}

    <a href="https://wa.me/96875186675?text=Hello%20Palmlight%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project." className="plm-sticky-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat with Palmlight Media on WhatsApp">

        <span className="plm-wa-pulse"></span>


        <span className="plm-wa-icon">

            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

                <path fill="currentColor" d="M19.11 17.2c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26s.98 2.62 1.11 2.8c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"></path>

                <path fill="currentColor" d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.55 1.74 6.53L3 29l6.61-1.73a12.97 12.97 0 0 0 6.41 1.69h.01c7.18 0 13.02-5.84 13.02-13.02C29.05 8.84 23.2 3 16.02 3zm0 23.74h-.01c-2.04 0-4.04-.55-5.78-1.59l-.41-.24-3.92 1.03 1.05-3.82-.27-.39a10.75 10.75 0 0 1-1.65-5.72c0-5.94 4.84-10.78 10.79-10.78 2.88 0 5.58 1.12 7.61 3.16a10.72 10.72 0 0 1 3.15 7.62c0 5.94-4.84 10.78-10.79 10.78z"></path>

            </svg>

        </span>


        <span className="plm-wa-text">
            Chat with us
        </span>

    </a>

{/* =========================================================
     CUSTOM GLASSMORPHIC CONSULTATION SUCCESS / ERROR MODAL
========================================================= */}
{formModal.open && (
  <div
    className="plm-modal-backdrop"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      background: 'rgba(10, 10, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      animation: 'plmModalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}
    onClick={() => setFormModal(prev => ({ ...prev, open: false }))}
  >
    <div
      className="plm-modal-card"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        background: 'linear-gradient(145deg, rgba(26, 27, 40, 0.96), rgba(16, 17, 26, 0.98))',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        borderRadius: '24px',
        padding: '40px 32px 32px',
        textAlign: 'center',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.7), 0 0 50px rgba(168, 85, 247, 0.25)',
        color: '#ffffff',
        overflow: 'hidden'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: formModal.success
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Icon Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '72px',
          height: '72px',
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: formModal.success
            ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
            : 'linear-gradient(135deg, #ef4444, #dc2626)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '34px',
          fontWeight: '900',
          color: '#ffffff',
          boxShadow: formModal.success
            ? '0 0 30px rgba(168, 85, 247, 0.65)'
            : '0 0 30px rgba(239, 68, 68, 0.65)'
        }}
      >
        {formModal.success ? '✓' : '!'}
      </div>

      {/* Title */}
      <h3
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '24px',
          fontWeight: '800',
          marginBottom: '12px',
          color: '#ffffff',
          letterSpacing: '-0.5px',
          fontFamily: 'Poppins, system-ui, sans-serif'
        }}
      >
        {formModal.title}
      </h3>

      {/* Message */}
      <p
        style={{
          position: 'relative',
          zIndex: 2,
          fontSize: '16px',
          lineHeight: '1.65',
          color: '#cbd5e1',
          marginBottom: '32px',
          fontWeight: '400'
        }}
      >
        {formModal.message}
      </p>

      {/* Action Button */}
      <button
        type="button"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '16px 28px',
          borderRadius: '16px',
          border: 'none',
          background: formModal.success
            ? 'linear-gradient(135deg, #a855f7, #9333ea)'
            : 'rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: formModal.success ? '0 10px 30px rgba(168, 85, 247, 0.45)' : 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onClick={() => setFormModal(prev => ({ ...prev, open: false }))}
      >
        {formModal.success ? 'Got It' : 'Try Again'}
      </button>
    </div>
  </div>
)}
    </div>
  );
}
