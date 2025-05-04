
import CanvasBackground from "./CanvasBackground";
import { useState, useEffect, useRef } from "react";
import { ArrowDownRight, Menu, Code, Server, Workflow } from "lucide-react";
import NavbarCustom from "./shared";
import AboutSection from "./about";
import ProjectSection from "./project";

const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollPosition(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};

function HeroSection() {
    const scrollPosition = useScrollPosition();
    const [displayText, setDisplayText] = useState("");
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const phrases = [
        "building scalable apps.",
        "solving complex problems.",
        "creating elegant solutions.",
        "optimizing workflows."
    ];

    // Ref for scrollable container
    const containerRef = useRef(null);

    // Calculate viewport height in pixels
    const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
    const scrollProgress = Math.min(1, scrollPosition / (vh * 2)) * 100;

    // Parallax and transition calculations
    const heroOpacity = Math.max(0, 1 - scrollProgress / 50);
    const heroScale = Math.max(0.8, 1 - scrollProgress / 200);
    const heroBlur = Math.min(10, scrollProgress / 10);

    // About section calculations
    const aboutStartThreshold = 15; // Start showing at 25% scroll
    const aboutEndThreshold = 40;  // Fully visible at 50% scroll
    const aboutOpacity = scrollProgress < aboutStartThreshold ? 0 :
        scrollProgress > aboutEndThreshold ? 1 :
            (scrollProgress - aboutStartThreshold) / (aboutEndThreshold - aboutStartThreshold);

    // Content (skills) section calculations
    const contentStartThreshold = 40; // Start showing at 40% scroll
    const contentEndThreshold = 50;  // Fully visible at 70% scroll
    const contentOpacity = scrollProgress < contentStartThreshold ? 0 :
        scrollProgress > contentEndThreshold ? 1 :
            (scrollProgress - contentStartThreshold) / (contentEndThreshold - contentStartThreshold);
    const contentTranslateY = Math.max(0, 100 - scrollProgress);

    // Left column move calculation
    const leftColumnTranslate = Math.min(100, scrollProgress * 1.5);

    // Right column move calculation
    const rightColumnTranslate = Math.min(100, scrollProgress * 1.5);

    useEffect(() => {
        const phrase = phrases[currentPhraseIndex];
        let index = 0;
        let direction = 1;
        const interval = setInterval(() => {
            if (direction === 1) {
                // Typing
                if (index <= phrase.length) {
                    setDisplayText(phrase.substring(0, index));
                    index++;
                } else {
                    // Wait before deleting
                    setTimeout(() => {
                        direction = -1;
                    }, 1500);
                }
            } else {
                // Deleting
                if (index >= 0) {
                    setDisplayText(phrase.substring(0, index));
                    index--;
                } else {
                    // Move to next phrase
                    direction = 1;
                    setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, direction === 1 ? 100 : 50);

        return () => clearInterval(interval);
    }, [currentPhraseIndex]);

    return (
        <div className="parallax-container" ref={containerRef} style={{
            overflowY: 'hidden'
        }}>
            <CanvasBackground />

            {/* Hero Section */}
            <section
                className="min-h-screen flex items-center bg-transparent relative z-10 overflow-hidden"
                style={{
                    opacity: heroOpacity,
                    transform: `scale(${heroScale})`,
                    filter: `blur(${heroBlur}px)`,
                    transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease'
                }}
            >
                {/* Background divider - desktop only */}
                <div className="absolute top-0 left-0 h-full w-1/2 bg-black z-0 hidden lg:block"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    {/* Navigation menu */}

                    {/* <NavbarCustom /> */}

                    {/* Mobile layout (stacked) */}
                    <div className="flex flex-col lg:hidden mb-8 pt-20">

                        {/* Mobile name */}
                        <h1 className="text-6xl font-serif text-cream leading-none mb-10 text-center">
                            <span className="block">Harish</span>
                        </h1>

                        {/* Mobile skill cards */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                            <div className="bg-cream/5 backdrop-blur-md p-3 rounded-lg hover:bg-cream/10 transition-all duration-300 group flex flex-col items-center justify-center">
                                <Code className="text-cream w-5 h-5 mb-1 group-hover:text-cream/100 text-cream/80" />
                                <h3 className="text-cream text-xs font-medium">Frontend</h3>
                            </div>
                            <div className="bg-cream/5 backdrop-blur-md p-3 rounded-lg hover:bg-cream/10 transition-all duration-300 group flex flex-col items-center justify-center">
                                <Server className="text-cream w-5 h-5 mb-1 group-hover:text-cream/100 text-cream/80" />
                                <h3 className="text-cream text-xs font-medium">Backend</h3>
                            </div>
                            <div className="bg-cream/5 backdrop-blur-md p-3 rounded-lg hover:bg-cream/10 transition-all duration-300 group flex flex-col items-center justify-center">
                                <Workflow className="text-cream w-5 h-5 mb-1 group-hover:text-cream/100 text-cream/80" />
                                <h3 className="text-cream text-xs font-medium">DevOps</h3>
                            </div>
                        </div>

                        {/* Mobile info card */}
                        <div className="backdrop-blur-sm bg-black/80 p-6 rounded-lg mb-8" style={{ marginTop: '10px' }}>
                            <div className="border-l-4 border-cream pl-4 mb-6">
                                <h2 className="text-xl text-cream font-mono uppercase tracking-wider">
                                    Full Stack Developer
                                </h2>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-center space-x-3 mb-2">
                                    <span className="w-2 h-2 bg-cream rounded-full animate-pulse"></span>
                                    <h3 className="text-base text-cream font-medium">I specialize in</h3>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">MERN</span>
                                    <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">MEAN</span>
                                    <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">Next.js</span>
                                    <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">Python</span>
                                    <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">DevOps</span>
                                </div>
                            </div>

                            <div className="text-cream mb-6">
                                <p className="text-lg font-light mb-2">
                                    I'm passionate about <span className="font-medium">{displayText}</span>
                                    <span className="animate-pulse">|</span>
                                </p>
                                <p className="text-sm opacity-80">
                                    With 2 years at Sify Technologies, I build scalable web applications
                                    and focus on AI-driven solutions with high-quality software delivery.
                                </p>
                            </div>

                            <div className="mt-6 flex space-x-3">
                                <button className="group flex items-center space-x-1 bg-cream text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-white transition-all duration-300">
                                    <span>View Projects</span>
                                    <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                                </button>
                                <button className="border border-cream/50 text-cream px-4 py-2.5 rounded-full text-sm font-medium hover:bg-cream/10 transition-all duration-300">
                                    Contact Me
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Desktop layout (side by side) */}
                    <div className="hidden lg:grid lg:grid-cols-5 gap-0 items-center pt-20">
                        {/* Left Column - Info */}
                        <div className="lg:col-span-2"
                            style={{
                                transform: `translateX(${leftColumnTranslate}%)`,
                                transition: 'transform 0.1s ease-out'
                            }}
                        >
                            <div className="backdrop-blur-sm bg-black/30 p-8 rounded-lg lg:bg-transparent lg:backdrop-blur-none lg:p-0">
                                <div className="border-l-4 border-cream pl-4 mb-8">
                                    <h2 className="text-2xl text-cream font-mono uppercase tracking-wider">
                                        Full Stack Developer
                                    </h2>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="w-2 h-2 bg-cream rounded-full animate-pulse"></span>
                                        <h3 className="text-lg text-cream font-medium">I specialize in</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mb-6">
                                        <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">MERN</span>
                                        <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">MEAN</span>
                                        <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">Next.js</span>
                                        <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">Python</span>
                                        <span className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm hover:bg-cream/20 transition-all duration-300">DevOps</span>
                                    </div>
                                </div>

                                <div className="text-cream mb-8">
                                    <p className="text-xl font-light mb-2">
                                        I'm passionate about <span className="font-medium">{displayText}</span>
                                        <span className="animate-pulse">|</span>
                                    </p>
                                    <p className="text-sm opacity-80">
                                        With 2 years at Sify Technologies, I build scalable web applications
                                        and focus on AI-driven solutions with high-quality software delivery.
                                    </p>
                                </div>

                                <div className="mt-8 flex space-x-4">
                                    <button className="group flex items-center space-x-2 bg-cream text-white px-6 py-3 rounded-full font-medium hover:bg-white transition-all duration-300">
                                        <span>View Projects</span>
                                        <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" />
                                    </button>
                                    <button className="border border-cream/50 text-cream px-6 py-3 rounded-full font-medium hover:bg-cream/10 transition-all duration-300">
                                        Contact Me
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Spacer */}
                        <div className="lg:col-span-1 relative h-full">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-cream to-transparent opacity-50"></div>
                        </div>

                        {/* Right Column - Name */}
                        <div className="lg:col-span-2 relative"
                            style={{
                                transform: `translateX(${rightColumnTranslate}%)`,
                                transition: 'transform 0.1s ease-out'
                            }}
                        >
                            <h1 className="text-9xl font-serif text-cream leading-none mb-6">
                                <span className="block transform hover:scale-105 transition-transform duration-500 origin-left">Harish</span>

                                {/* <span className="block transform hover:scale-105 transition-transform duration-500 origin-left mt-2">ish</span> */}
                            </h1>


                            <div className="grid grid-cols-3 gap-4 mt-12" style={{
                                background: "#242424"
                            }}>
                                <div className="bg-cream/5 backdrop-blur-md p-4 rounded-lg hover:bg-cream/10 transition-all duration-300 group">
                                    <Code className="text-cream w-6 h-6 mb-2 group-hover:text-cream/100 text-cream/80" />
                                    <h3 className="text-cream text-sm font-medium">Frontend</h3>
                                </div>
                                <div className="bg-cream/5 backdrop-blur-md p-4 rounded-lg hover:bg-cream/10 transition-all duration-300 group">
                                    <Server className="text-cream w-6 h-6 mb-2 group-hover:text-cream/100 text-cream/80" />
                                    <h3 className="text-cream text-sm font-medium">Backend</h3>
                                </div>
                                <div className="bg-cream/5 backdrop-blur-md p-4 rounded-lg hover:bg-cream/10 transition-all duration-300 group">
                                    <Workflow className="text-cream w-6 h-6 mb-2 group-hover:text-cream/100 text-cream/80" />
                                    <h3 className="text-cream text-sm font-medium">DevOps</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements - desktop only */}
                <div className="hidden lg:block absolute bottom-30 right-36 w-45 h-45 border border-cream/10 rounded-full mt-10"></div>
            </section>

            {/* "ABOUT" Overlay - appears during scroll */}
            <div
                className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20"
                style={{
                    opacity: aboutOpacity,
                    transition: 'opacity 0.5s ease',
                }}
            >
                <h1
                    className="text-cream font-serif font-black tracking-tight text-[clamp(4rem,10vw,8rem)] leading-none pointer-events-none"
                    style={{
                        fontFamily: "'UnifrakturCook', cursive",
                        transform: `scale(${1 + aboutOpacity * 0.8})`,
                        transition: 'transform 0.3s ease',
                        textTransform: 'inherit',
                    }}
                >
                    ABOUT
                </h1>
            </div>

            {/* About Content Section */}
            <div
                className="min-h-screen flex items-center justify-center bg-black text-cream relative z-30 overflow-hidden"
                style={{
                    opacity: contentOpacity,
                    transform: `translateY(${contentTranslateY}px)`,
                    transition: 'opacity 0.5s ease, transform 0.3s ease'
                }}
            >
                <div className="container mx-auto ">
                    <AboutSection />
                </div>
            </div>
            <div className=" flex items-center justify-center bg-black text-cream absolute z-30 overflow-hidden">
                <div className="container mx-auto ">
                    <ProjectSection />
                </div>
            </div>


        </div>
    );
}

export default HeroSection;