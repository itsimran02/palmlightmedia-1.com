"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PalmLightMediaLanding() {
  useEffect(() => {
    let lenis;
    let rafHandler;
    try {
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      rafHandler = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafHandler);
      gsap.ticker.lagSmoothing(0);

      // GSAP Section Reveal Animations
      const sections = document.querySelectorAll("section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0.85, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Lenis Smooth Anchor Scrolling
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (href && href !== "#") {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              lenis.scrollTo(target, { offset: -80 });
            }
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
                const submitBtn = contactForm.querySelector(".plm-form-submit");
                const originalText = submitBtn ? submitBtn.innerText : "Send Project Request ↗";
                if (submitBtn) {
                    submitBtn.innerText = "Sending...";
                    submitBtn.disabled = true;
                }

                const formData = {
                    name: document.getElementById("plm-name")?.value,
                    business: document.getElementById("plm-business")?.value,
                    email: document.getElementById("plm-email")?.value,
                    phone: document.getElementById("plm-phone")?.value,
                    service: document.getElementById("plm-service")?.value,
                    budget: document.getElementById("plm-budget")?.value,
                    message: document.getElementById("plm-message")?.value,
                };

                try {
                    const res = await fetch("/api/sendEmail", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });
                    const data = await res.json();
                    if (data.success) {
                        alert("Thank you! Your consultation request has been sent successfully.");
                        contactForm.reset();
                    } else {
                        alert("There was an issue sending your message. Please try again.");
                    }
                } catch (err) {
                    alert("Submission error. Please check your connection and try again.");
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
                    "Palm Light Media: #" +
                    id +
                    " was not found."
                );

                return;

            }


            closeMenu();


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
                80;


            let current =
                "home";


            let bestDistance =
                Infinity;


            sectionIDs.forEach(
                function(id){

                    const section =
                        getElement(id);


                    if(!section){

                        return;

                    }


                    const rect =
                        section.getBoundingClientRect();


                    if(
                        rect.top <= marker
                    ){

                        const distance =
                            Math.abs(
                                marker -
                                rect.top
                            );


                        if(
                            distance <
                            bestDistance
                        ){

                            bestDistance =
                                distance;

                            current =
                                id;

                        }

                    }

                }
            );


            setActive(current);

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





/* =========================================================
   PALM LIGHT MEDIA — 3D MOUSE INTERACTION
========================================================= */

(function () {

  const hero =
    document.querySelector(
      ".plm3-hero"
    );

  const visual =
    document.querySelector(
      ".plm3-visual"
    );

  const core =
    document.querySelector(
      ".plm3-core"
    );


  if (
    !hero ||
    !visual ||
    !core
  ) {
    return;
  }


  /* Disable interaction on tablet/mobile */

  if (
    window.innerWidth <= 1050
  ) {
    return;
  }


  let heroTicking = false;
  hero.addEventListener(
    "mousemove",
    function (e) {
      if (heroTicking) return;
      heroTicking = true;
      const clientX = e.clientX;
      const clientY = e.clientY;
      requestAnimationFrame(function () {
        const rect = hero.getBoundingClientRect();
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        const rotateY = (x - .5) * 12;
        const rotateX = (y - .5) * -10;

        visual.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        core.style.transform = `translate(-50%,-50%) rotateX(${8 + rotateX / 2}deg) rotateY(${-8 + rotateY / 2}deg)`;
        heroTicking = false;
      });
    },
    { passive: true }
  );

  hero.addEventListener(
    "mouseleave",
    function () {
      visual.style.transform = "rotateX(0deg) rotateY(0deg)";
      core.style.transform = `translate(-50%,-50%) rotateX(8deg) rotateY(-8deg)`;
    },
    { passive: true }
  );

})();





/* =========================================================
   PALM LIGHT MEDIA
   3D SERVICE CARD INTERACTION
========================================================= */

(function () {

  const cards =
    document.querySelectorAll(
      ".plm-service-card"
    );


  /*
   * Only activate the mouse-based
   * 3D effect on larger screens.
   */

  if (
    window.innerWidth <= 900
  ) {

    return;

  }


  cards.forEach(function(card) {


    const icon =
      card.querySelector(
        ".plm-service-icon"
      );


    if (!icon) {
      return;
    }


    let cardTicking = false;
    card.addEventListener(
      "mousemove",
      function(e) {
        if (cardTicking) return;
        cardTicking = true;
        const clientX = e.clientX;
        const clientY = e.clientY;
        requestAnimationFrame(function() {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const rotateY = ((x / rect.width) - .5) * 5;
          const rotateX = ((y / rect.height) - .5) * -4;

          icon.style.transform = `perspective(600px) rotateY(${-12 + rotateY}deg) rotateX(${8 + rotateX}deg) translateZ(20px)`;
          cardTicking = false;
        });
      },
      { passive: true }
    );

    card.addEventListener(
      "mouseleave",
      function() {
        icon.style.transform = "";
      },
      { passive: true }
    );

  });

})();





/* =========================================================
   PALM LIGHT MEDIA
   SUBTLE 3D IMAGE MOVEMENT
========================================================= */

(function () {

  const visual =
    document.querySelector(
      ".plm-about-visual"
    );

  const image =
    document.querySelector(
      ".plm-about-image"
    );


  /*
   * Only activate on desktop.
   */

  if (
    !visual ||
    !image ||
    window.innerWidth <= 900
  ) {

    return;

  }


  let visTicking = false;
  visual.addEventListener(
    "mousemove",
    function(e) {
      if (visTicking) return;
      visTicking = true;
      const clientX = e.clientX;
      const clientY = e.clientY;
      requestAnimationFrame(function() {
        const rect = visual.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const moveX = ((x / rect.width) - .5) * 8;
        const moveY = ((y / rect.height) - .5) * 6;

        image.style.transform = `perspective(1000px) rotateY(${moveX * .35}deg) rotateX(${-moveY * .25}deg) scale(1.025) translate(${moveX * .35}px, ${moveY * .25}px)`;
        visTicking = false;
      });
    },
    { passive: true }
  );

  visual.addEventListener(
    "mouseleave",
    function() {
      image.style.transform = "";
    },
    { passive: true }
  );

})();





/* =========================================================
   PALM LIGHT MEDIA
   MOUSE 3D CARD EFFECT
========================================================= */

(function () {

  const cards =
    document.querySelectorAll(
      ".plm-why-card"
    );


  if (
    !cards.length ||
    window.innerWidth <= 900
  ) {

    return;

  }


  cards.forEach(function(card) {


    let whyTicking = false;
    card.addEventListener(
      "mousemove",
      function(e) {
        if (whyTicking) return;
        whyTicking = true;
        const clientX = e.clientX;
        const clientY = e.clientY;
        requestAnimationFrame(function() {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const rotateY = ((x / rect.width) - .5) * 4;
          const rotateX = ((y / rect.height) - .5) * -4;

          card.style.transform = `perspective(1000px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          whyTicking = false;
        });
      },
      { passive: true }
    );

    card.addEventListener(
      "mouseleave",
      function() {
        card.style.transform = "";
      },
      { passive: true }
    );

  });

})();





/* =========================================================
   PALM LIGHT MEDIA
   TESTIMONIAL 3D INTERACTION
========================================================= */

(function () {

  /*
   * Desktop only.
   * The marquee itself remains CSS-driven.
   */

  const cards = document.querySelectorAll(".plm-testimonial-card");
  cards.forEach(function(card) {
    let testTicking = false;
    card.addEventListener(
      "mousemove",
      function(e) {
        if (testTicking) return;
        testTicking = true;
        const clientX = e.clientX;
        const clientY = e.clientY;
        requestAnimationFrame(function() {
          const rect = card.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const rotateY = ((x / rect.width) - .5) * 4;
          const rotateX = ((y / rect.height) - .5) * -4;

          card.style.transform = `perspective(1100px) translateY(-9px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
          testTicking = false;
        });
      },
      { passive: true }
    );

    card.addEventListener(
      "mouseleave",
      function() {
        card.style.transform = "";
      },
      { passive: true }
    );
  });

})();





/* =========================================================
   3D CARD EFFECT
========================================================= */

(function(){

    if(window.innerWidth <= 900){
        return;
    }

    const cards =
        document.querySelectorAll(
            ".plm-project"
        );


    cards.forEach(function(card){
        let projTicking = false;
        card.addEventListener(
            "mousemove",
            function(e){
                if(projTicking) return;
                projTicking = true;
                const clientX = e.clientX;
                const clientY = e.clientY;
                requestAnimationFrame(function(){
                    const rect = card.getBoundingClientRect();
                    const x = clientX - rect.left;
                    const y = clientY - rect.top;
                    const rotateY = ((x / rect.width) - .5) * 5;
                    const rotateX = ((y / rect.height) - .5) * -5;

                    card.style.transform = `perspective(1200px) translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    projTicking = false;
                });
            },
            { passive: true }
        );

        card.addEventListener(
            "mouseleave",
            function(){
                card.style.transform = "";
            },
            { passive: true }
        );
    });

})();


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

(function(){

    if(window.innerWidth <= 900){
        return;
    }

    const buttons =
        document.querySelectorAll(
            ".plm-project-button"
        );


    buttons.forEach(function(button){
        let btnTicking = false;
        button.addEventListener(
            "mousemove",
            function(e){
                if(btnTicking) return;
                btnTicking = true;
                const clientX = e.clientX;
                const clientY = e.clientY;
                requestAnimationFrame(function(){
                    const rect = button.getBoundingClientRect();
                    const x = clientX - rect.left - rect.width / 2;
                    const y = clientY - rect.top - rect.height / 2;

                    button.style.transform = `translate(${x * .12}px,${y * .12}px)`;
                    btnTicking = false;
                });
            },
            { passive: true }
        );

        button.addEventListener(
            "mouseleave",
            function(){
                button.style.transform = "";
            },
            { passive: true }
        );
    });

})();





/* =========================================================
   FAQ ACCORDION
========================================================= */

(function(){

    const faqItems =
        document.querySelectorAll(
            '.plm-faq-item'
        );


    faqItems.forEach(function(item){

        const button =
            item.querySelector(
                '.plm-faq-question'
            );


        button.addEventListener(
            'click',
            function(){

                const currentlyOpen =
                    item.classList.contains(
                        'active'
                    );


                faqItems.forEach(function(other){

                    other.classList.remove(
                        'active'
                    );

                    const otherButton =
                        other.querySelector(
                            '.plm-faq-question'
                        );

                    otherButton.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                });


                if(!currentlyOpen){

                    item.classList.add(
                        'active'
                    );

                    button.setAttribute(
                        'aria-expanded',
                        'true'
                    );

                }

            }
        );

    });

})();


    } catch (e) {
      console.error("Effect error:", e);
    }

    return () => {
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

        <a href="#home" className="plm-nav-logo" aria-label="Palm Light Media">

            <img decoding="async" src="/wp-content/uploads/2026/08/palmlightmedia-logo-transparent.png" alt="Palm Light Media" />

        </a>


        {/* =================================================
             DESKTOP NAVIGATION
        ================================================== */}

        <nav className="plm-nav-links">


            <a href="#home" className="plm-nav-link active" data-section="home">
                Home
            </a>


            <a href="#what-we-do" className="plm-nav-link" data-section="what-we-do">
                What We Do
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


            <a href="#pricing" className="plm-nav-link" data-section="pricing">
                Pricing
            </a>


            <a href="#faq" className="plm-nav-link" data-section="faq">
                FAQ
            </a>


            <a href="#contact" className="plm-nav-link" data-section="contact">
                Contact
            </a>

        </nav>


        {/* =================================================
             DESKTOP CTA
        ================================================== */}

        <a href="https://wa.me/96875186675" target="_blank" rel="noopener noreferrer" className="plm-nav-cta">

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

            <a href="#home" className="plm-mobile-logo">

                <img decoding="async" src="/wp-content/uploads/2026/08/palmlightmedia-logo-transparent.png" alt="Palm Light Media" />

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


            <a href="#what-we-do" className="plm-mobile-link" data-section="what-we-do">

                <span>
                    <small className="plm-mobile-number">
                        02
                    </small>

                    What We Do
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#about" className="plm-mobile-link" data-section="about">

                <span>
                    <small className="plm-mobile-number">
                        03
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
                        04
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
                        05
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
                        06
                    </small>

                    Portfolio
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#pricing" className="plm-mobile-link" data-section="pricing">

                <span>
                    <small className="plm-mobile-number">
                        07
                    </small>

                    Pricing
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#faq" className="plm-mobile-link" data-section="faq">

                <span>
                    <small className="plm-mobile-number">
                        08
                    </small>

                    FAQ
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="#contact" className="plm-mobile-link" data-section="contact">

                <span>
                    <small className="plm-mobile-number">
                        09
                    </small>

                    Contact
                </span>

                <span className="plm-mobile-arrow">
                    →
                </span>

            </a>


            <a href="https://wa.me/96875186675" target="_blank" rel="noopener noreferrer" className="plm-mobile-cta">

                Start Your Project

                <span>→</span>

            </a>


            <div className="plm-mobile-bottom">

                Muscat · Oman
                &nbsp;•&nbsp;
                <strong>Palm Light Media</strong>

            </div>

        </nav>

    </div>

</div>


					{/* =========================================================
     PALM LIGHT MEDIA — MODERN 3D HERO
========================================================= */}

<section className="plm3-hero">

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
        MUSCAT, OMAN
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
          Everything your business needs to get seen,
          chosen and remembered.
        </strong>
      </p>


      {/* BUTTONS */}

      <div className="plm3-actions">

        <a href="https://wa.me/96875186675" className="plm3-primary">

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
            50+
          </strong>

          <span>
            Businesses<br />
            served
          </span>

        </div>


        <div className="plm3-proof-line"></div>


        <div className="plm3-proof-number">

          <strong>
            08
          </strong>

          <span>
            Digital<br />
            services
          </span>

        </div>


        <div className="plm3-proof-line"></div>


        <div className="plm3-proof-number">

          <strong>
            01
          </strong>

          <span>
            Goal —<br />
            your growth
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


      {/* MAIN 3D OBJECT */}

      <div className="plm3-core">

        <div className="plm3-core-inner">

          <div className="plm3-logo-mark">
            PL
          </div>

          <div className="plm3-core-title">
            PALM<br />
            LIGHT
          </div>

          <div className="plm3-core-small">
            FROM IDEA<br />
            TO SPOTLIGHT
          </div>

        </div>

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

<section className="plm-services" id="services">

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


          <a href="https://wa.me/96875186675" className="plm-srv-link">

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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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
            Industrial
            <em>Software</em>
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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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


        <div className="plm-service-arrow">
          ↗
        </div>

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

        <img decoding="async" className="plm-about-image" src="wp-content/uploads/2026/08/WhatsApp-Image-2026-08-15-at-6.55.21-PM.jpeg" alt="Shahnwaz Khan - Founder of Palm Light Media" />

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

        ABOUT PALM LIGHT MEDIA

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

        Palm Light Media helps businesses in Muscat build
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

          We don't just create things that
          <strong>look good.</strong>

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
            78<span>+</span>
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
            6<span>+</span>
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

        WHY PALM LIGHT MEDIA

      </div>


      <h2 className="plm-why-title">

        NOT JUST ANOTHER
        <span>DIGITAL AGENCY.</span>

      </h2>


      <p className="plm-why-intro">

        We bring design, technology and marketing together
        to help businesses in Muscat build a digital presence
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
            MUSCAT
            <br />
            <span>FOCUSED.</span>
          </h3>

          <p>
            We understand the local business environment
            and build digital solutions for businesses
            competing in Muscat.
          </p>

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
     PALM LIGHT MEDIA — CLIENT TESTIMONIALS
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
        with Palm Light Media.

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

              Palm Light Media exceeded my expectations.
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
              breaking the budget. Palm Light Media delivered
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

              Freewebing gave my consulting practice a polished
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

              Freewebing helped me showcase my car repair
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

              Palm Light Media exceeded my expectations.
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
              breaking the budget. Palm Light Media delivered
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

              Freewebing gave my consulting practice a polished
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

              Freewebing helped me showcase my car repair
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
          6<span>+</span>
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

        <iframe src="https://www.youtube.com/embed/D3r5dxDSZXI?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=D3r5dxDSZXI&amp;controls=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1&amp;disablekb=1" title="Palm Light Media" allow="
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


            <a href="#contact" className="plm-video-btn plm-video-btn-primary">

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
     PALM LIGHT MEDIA — PORTFOLIO
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

                    <div className="plm-project-word">
                        SITELAWNCHER
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        01 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://sitelawncher.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Sitelawncher">
                        ↗
                    </a>


                    {/* SERVICES */}

                    <div className="plm-project-services">


                        {/* Website */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                                <path d="M7 6.5h.01"></path>
                                <path d="M10 6.5h.01"></path>
                            </svg>

                            Website

                        </span>


                        {/* Branding */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>

                            Branding

                        </span>


                        {/* Graphic Design */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M4 17l6-6 4 4 3-3 4 3"></path>
                                <circle cx="8" cy="9" r="1.5"></circle>
                            </svg>

                            Graphic Design

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Sitelawncher
                    </h3>


                    <p className="plm-project-description">
                        Complete brand identity and website
                        designed to create a strong digital presence.
                    </p>


                    <a className="plm-project-button" href="https://sitelawncher.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 02 — FREEWEBING
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        FREEWEBING
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        02 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://freewebing.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Freewebing">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Website */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>

                            Website

                        </span>


                        {/* Branding */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>

                            Branding

                        </span>


                        {/* Social Media */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>

                            Social Media

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Freewebing
                    </h3>


                    <p className="plm-project-description">
                        Agency branding, website development
                        and digital marketing presence.
                    </p>


                    <a className="plm-project-button" href="https://freewebing.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 03 — ALLURE
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        ALLURE
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        03 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/allurebeautystudiomuscat/" target="_blank" rel="noopener noreferrer" aria-label="Visit Allure Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Social Media */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* Content */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <circle cx="8" cy="9" r="1.5"></circle>
                                <path d="M4 17l5-5 4 4 2-2 5 4"></path>
                            </svg>

                            Content

                        </span>


                        {/* Campaigns */}

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
                        Social media campaigns and digital
                        content for a beauty studio in Muscat.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/allurebeautystudiomuscat/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 04 — ADDISON
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        ADDISON
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        04 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/addisonchiroandsportsclinic/" target="_blank" rel="noopener noreferrer" aria-label="Visit Addison Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Social Media */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                                <circle cx="17" cy="7" r="1"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* Content */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <circle cx="8" cy="9" r="1.5"></circle>
                                <path d="M4 17l5-5 4 4 2-2 5 4"></path>
                            </svg>

                            Content

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Addison Chiropractic
                    </h3>


                    <p className="plm-project-description">
                        Healthcare social media management
                        and content strategy.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/addisonchiroandsportsclinic/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 05 — DOPEMAN
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        DOPEMAN
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        05 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://dopemanmarketing.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Dopeman Marketing">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Website */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>

                            Website

                        </span>


                        {/* Branding */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <path d="M12 3l2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5L12 3z"></path>
                            </svg>

                            Branding

                        </span>


                        {/* Social */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* Paid Ads */}

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
                        Marketing agency digital presence,
                        branding and social media direction.
                    </p>


                    <a className="plm-project-button" href="https://dopemanmarketing.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 06 — AUSTINS
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        AUSTINS
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        06 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://austinscollision.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Austins Collision">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Website */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>

                            Website

                        </span>


                        {/* Social */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            Social Media

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Austins' Collision
                    </h3>


                    <p className="plm-project-description">
                        Collision shop website and social
                        media management.
                    </p>


                    <a className="plm-project-button" href="https://austinscollision.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 07 — MERICA GC
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        MERICA
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        07 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://mericagc.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Merica General Contractor">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Website */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                                <path d="M3 9h18"></path>
                            </svg>

                            Website

                        </span>


                        {/* Social */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* SEO */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <circle cx="10.5" cy="10.5" r="6"></circle>
                                <path d="M15 15l5 5"></path>
                            </svg>

                            SEO

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Merica General Contractor
                    </h3>


                    <p className="plm-project-description">
                        Construction website and social
                        media campaigns.
                    </p>


                    <a className="plm-project-button" href="https://mericagc.com/" target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 08 — KLUB808
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        KLUB808
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        08 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/klub808muscat/" target="_blank" rel="noopener noreferrer" aria-label="Visit Klub808 Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Social */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* Video */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                                <path d="M10 9l5 3-5 3V9z"></path>
                            </svg>

                            Video

                        </span>


                        {/* Paid Ads */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h16"></path>
                                <path d="M12 4l8 8-8 8"></path>
                            </svg>

                            Paid Ads

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        Klub808
                    </h3>


                    <p className="plm-project-description">
                        Nightlife promotions, campaigns,
                        creative content and social media.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/klub808muscat/" target="_blank" rel="noopener noreferrer">
                        View Instagram
                        <span>↗</span>
                    </a>

                </div>

            </article>



            {/* =================================================
                 09 — 808 LOUNGE
            ================================================== */}

            <article className="plm-project">

                <div className="plm-project-visual">

                    <div className="plm-project-word">
                        808
                    </div>

                    <div className="plm-project-shape"></div>

                </div>


                <div className="plm-project-overlay">

                    <span className="plm-project-number">
                        09 / 09
                    </span>


                    <a className="plm-project-arrow" href="https://www.instagram.com/lounge_808/" target="_blank" rel="noopener noreferrer" aria-label="Visit 808 Lounge Instagram">
                        ↗
                    </a>


                    <div className="plm-project-services">


                        {/* Social */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="5" y="5" width="14" height="14" rx="4"></rect>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>

                            Social Media

                        </span>


                        {/* Video */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <rect x="3" y="6" width="18" height="12" rx="2"></rect>
                                <path d="M10 9l5 3-5 3V9z"></path>
                            </svg>

                            Video

                        </span>


                        {/* Paid Ads */}

                        <span className="plm-service">

                            <svg viewBox="0 0 24 24">
                                <path d="M4 12h16"></path>
                                <path d="M12 4l8 8-8 8"></path>
                            </svg>

                            Paid Ads

                        </span>


                    </div>


                    <h3 className="plm-project-title">
                        808 Lounge
                    </h3>


                    <p className="plm-project-description">
                        Restaurant and lounge social media,
                        promotions and digital content.
                    </p>


                    <a className="plm-project-button" href="https://www.instagram.com/lounge_808/" target="_blank" rel="noopener noreferrer">
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

            Pricing

        </div>


        {/* KICKER */}

        <div className="plm-pricing-kicker">

            Great digital work starts from

        </div>


        {/* PRICE */}

        <div className="plm-price-display">


            <div className="plm-currency">

                OMR

            </div>


            <div className="plm-price-number">

                49

            </div>


        </div>


        {/* PURPLE LINE */}

        <div className="plm-price-line"></div>


        {/* SUBTITLE */}

        <div className="plm-price-subtitle">

            <strong>Starting from</strong>
            · tailored to your business

        </div>


        {/* CTA */}

        <a href="https://wa.me/96875186675" target="_blank" rel="noopener noreferrer" className="plm-pricing-button">

            Let's Discuss Your Project

            <span className="plm-pricing-button-arrow">
                →
            </span>

        </a>


        {/* NOTE */}

        <div className="plm-pricing-note">

            No one-size-fits-all packages.
            We build around what your business needs.

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

                    Questions?
                    <span>We've got answers.</span>

                </h2>


                <p>

                    Everything you need to know before
                    starting your next project with
                    Palm Light Media.

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

                    Palm Light Media

                </div>


                <h3>

                    Let's make your
                    <span>next move.</span>

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

                <div className="plm-faq-item active">


                    <button className="plm-faq-question" type="button" aria-expanded="true">

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

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                02
                            </span>

                            <span className="plm-faq-question-text">
                                Do you work with businesses in Muscat?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Yes. Palm Light Media focuses
                                on helping businesses in Muscat
                                build stronger brands, better
                                websites and a more effective
                                digital presence.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 03 */}

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

                        <span className="plm-faq-question-left">

                            <span className="plm-faq-index">
                                03
                            </span>

                            <span className="plm-faq-question-text">
                                Do you work with international clients?
                            </span>

                        </span>


                        <span className="plm-faq-toggle"></span>

                    </button>


                    <div className="plm-faq-answer">

                        <div className="plm-faq-answer-inner">

                            <div className="plm-faq-answer-content">

                                Yes. Although Muscat is our
                                primary market, we also work
                                with selected international
                                clients depending on their
                                project requirements.

                            </div>

                        </div>

                    </div>


                </div>



                {/* FAQ 04 */}

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

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

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

                        <span className="plm-faq-index">
                            05
                        </span>


                        <span className="plm-faq-question-text">
                            How much does a website cost?
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

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

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

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

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

                <div className="plm-faq-item">


                    <button className="plm-faq-question" type="button" aria-expanded="false">

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

<section className="plm-final-cta" id="contact">


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


            <a href="#contact-form" className="plm-cta-btn plm-cta-primary">

                Start Your Project

                <span>↗</span>

            </a>


            <a href="https://wa.me/" className="plm-cta-btn plm-cta-secondary">

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

<section className="plm-contact" id="contact-us">


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

                We'll figure out how Palm Light Media can help
                turn that idea into something people notice.

            </p>


            {/* =================================================
                 CONTACT DETAILS
            ================================================== */}

            <div className="plm-contact-details">


                {/* =============================================
                     CALL
                ============================================== */}

                <a href="tel:+96875186675" className="plm-contact-detail" aria-label="Call Palm Light Media">

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

                <a href="mailto:info@palmlightmedia.com" className="plm-contact-detail" aria-label="Email Palm Light Media">

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

                <a href="https://palmlightmedia.com" className="plm-contact-detail" target="_blank" rel="noopener noreferrer" aria-label="Visit Palm Light Media website">

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

                <div className="plm-contact-detail" aria-label="Palm Light Media address">

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
                            Address
                        </small>

                        <strong>
                            Ghala, Muscat, Oman
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


            <form className="plm-contact-form" action="#" method="post">


                <div className="plm-form-grid">


                    {/* NAME */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-name">
                            Your Name
                        </label>

                        <input type="text" id="plm-name" name="name" placeholder="Enter your name" required="" />

                    </div>


                    {/* BUSINESS */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-business">
                            Business Name
                        </label>

                        <input type="text" id="plm-business" name="business" placeholder="Your business" />

                    </div>


                    {/* EMAIL */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-email">
                            Email
                        </label>

                        <input type="email" id="plm-email" name="email" placeholder="you@example.com" required="" />

                    </div>


                    {/* PHONE */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-phone">
                            Phone
                        </label>

                        <input type="tel" id="plm-phone" name="phone" placeholder="+968 XXXXXXXX" />

                    </div>


                    {/* SERVICE */}

                    <div className="plm-form-field">

                        <label htmlFor="plm-service">
                            What do you need?
                        </label>

                        <select id="plm-service" name="service">

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
                            Approx. Budget
                        </label>

                        <select id="plm-budget" name="budget">

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
                            Tell us about your project
                        </label>

                        <textarea id="plm-message" name="message" placeholder="What are you looking to build, improve or promote?" required=""></textarea>

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


                <a href="#" className="plm-footer-logo">

                    <div className="plm-footer-logo-mark">
                    </div>

                    <div className="plm-footer-logo-text">

                        Palm Light
                        <span>Media</span>

                    </div>

                </a>


                <p className="plm-footer-description">

                    We help businesses get noticed,
                    remembered and chosen — through
                    websites, branding, content, marketing
                    and technology built for growth.

                </p>


                <div className="plm-footer-location">

                    <span>✦</span>

                    Muscat, Oman • Serving businesses beyond

                </div>


                {/* SOCIAL */}

                <div className="plm-footer-socials">


                    <a href="#" className="plm-footer-social" aria-label="Instagram">
                        IG
                    </a>


                    <a href="#" className="plm-footer-social" aria-label="Facebook">
                        FB
                    </a>


                    <a href="#" className="plm-footer-social" aria-label="LinkedIn">
                        IN
                    </a>


                    <a href="https://wa.me/96875186675" className="plm-footer-social" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        WA
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


            <a href="#contact-us" className="plm-footer-mini-btn">

                Start Your Project

                <span>↗</span>

            </a>


        </div>


        {/* =================================================
             BOTTOM
        ================================================== */}

        <div className="plm-footer-bottom">


            <div className="plm-footer-copyright">

                © 2026 Palm Light Media.
                All rights reserved.

            </div>


            <div className="plm-footer-bottom-links">

                <a href="#">
                    Privacy Policy
                </a>

                <a href="#">
                    Terms &amp; Conditions
                </a>

            </div>


        </div>


        {/* BACK TO TOP */}

        <a href="#" className="plm-footer-top" aria-label="Back to top">
            ↑
        </a>


    </div>


    {/* =========================================================
         STICKY WHATSAPP
         THIS IS THE ONLY FIXED ELEMENT
    ========================================================== */}

    <a href="https://wa.me/96875186675?text=Hello%20Palm%20Light%20Media%2C%20I%27d%20like%20to%20discuss%20a%20project." className="plm-sticky-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat with Palm Light Media on WhatsApp">

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


</footer>
    </div>
  );
}
