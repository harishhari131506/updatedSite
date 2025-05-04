function NavbarCustom(){
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center md:justify-end md:top-8 md:right-8 md:left-auto">
        <div className="bg-black/30 backdrop-blur-md fixed rounded-full p-0.1 border border-cream/20 mx-auto md:mx-0 md:mr-6">
            <ul className="flex items-center space-x-1">
                <li>
                    <a href="#home" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-cream/70 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </a>
                </li>
                {/* <li>
                    <a href="#projects" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-cream/70 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#skills" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-cream/70 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#experience" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-cream/70 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="#contact" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-cream/70 hover:text-cream rounded-full hover:bg-cream/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </a>
                </li> */}
            </ul>
        </div>
        </nav>
      );
}

export default NavbarCustom;



// <main className="h-screen relative">
//   <motion.div 
//     className="w-full h-full flex items-center justify-center text-black text-[64px] leading-[66px] cursor-default absolute bg-[#ec4e39]"
//     style={{ 
//       WebkitMaskImage: "url('/mask.svg')", 
//       WebkitMaskRepeat: "no-repeat" 
//     }}
//     animate={{
//       WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
//       WebkitMaskSize: `${size}px`,
//     }}
//     transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
//   >
//     <p 
//       className="w-[1000px] p-10"
//       onMouseEnter={() => setIsHovered(true)} 
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       A visual designer – with skills that haven't been replaced by A.I (yet) – making good shit only if the paycheck is equally good.
//     </p>
//   </motion.div>

//   <div className="w-full h-full flex items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
//     <p className="w-[1000px] p-10">
//       I'm a <span className="text-[#ec4e39]">selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.
//     </p>
//   </div>
// </main>
