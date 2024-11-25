import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const animateText = () => {
    gsap.fromTo(
        ".animated-text",
        { opacity: 0, y: -50 },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out",
            stagger: 0.2,
        }
    );
    gsap.fromTo(
        ".banner-main",
        { opacity: 0, y: -50 },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out",
            stagger: 0.2,
        }
    );
    gsap.fromTo(
        ".title",
        { opacity: 0, y: -50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        }
    );
    gsap.fromTo(
        ".subtitle",
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.5,
        }
    );
    gsap.fromTo(
        ".shop-button",
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 1,
        }
    );
    gsap.fromTo(
        ".cta-button",
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            delay: 1,
        }
    );

    gsap.fromTo(
        ".shop-categories",
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".shop-categories",
                start: "top 80%",
                toggleActions: "play none none none",
            },
        }
    );
    gsap.utils.toArray(".category-card").forEach((card, index) => {
        const scaleValue = 0.95;

        gsap.fromTo(
            card,
            { opacity: 0, scale: scaleValue, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    });

    gsap.utils.toArray(".product-card").forEach((card, index) => {
        const scaleValue = 0.95;

        gsap.fromTo(
            card,
            { opacity: 0, scale: scaleValue, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            }
        );
    });
    gsap.fromTo(
        ".dashboard-card",
        {  y: 30 },
        {
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".shop-categories",
                start: "top 80%",
                toggleActions: "play none none none",
            },
        }
    );
    
};
