import { gsap } from "gsap";

export const applyFloatingAnimation = (element) => {
    gsap.to(element, {
        rotationX: 4,
        rotationY: 4,
        y: "-=10",
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        duration: 2,
    });
};
export const applyFloatingText = (element) => {
    gsap.to(element, {
        rotationX: 4,
        rotationY: 4,
        y: "-=10",
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        duration: 2,
    });
};