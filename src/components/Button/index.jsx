import { motion } from 'framer-motion';

export default function Button({ isActive, toggleMenu }) {
  return (
    <div className="absolute top-0 right-0 w-24 sm:w-28 h-10 cursor-pointer rounded-3xl overflow-hidden">
      <motion.div 
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div 
          className="w-full h-full bg-[#c9fd74] group"
          onClick={() => {toggleMenu()}}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div 
          className="w-full h-full bg-black group"
          onClick={() => {toggleMenu()}}
        >
          <PerspectiveText label="Close" textColor="text-[#c9fd74]" />
        </div>
      </motion.div>
    </div>
  )
}

function PerspectiveText({ label, textColor = "text-black" }) {
  return (    
    <div className="flex flex-col justify-center items-center h-full w-full transform-gpu preserve-3d transition-transform duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-x-90">
      <p className={`${textColor} pointer-events-none uppercase transition-all duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:opacity-0`}>
        {label}
      </p>
      <p className={`${textColor} pointer-events-none uppercase absolute transform-gpu origin-bottom rotate-x-[-90deg] translate-y-2 opacity-0 transition-all duration-[0.75s] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100`}>
        {label}
      </p>
    </div>
  )
}