import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";

export default function Navigation() {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 md:px-10 pt-16 pb-12 h-full box-border">
       <div className="flex flex-col gap-2 sm:gap-3">
        {
            links.map((link, i) => {
                const { title, href } = link;
                return (
                    <div key={`b_${i}`} className="perspective-[120px] origin-bottom">
                        <motion.div
                          href={href}
                          custom={i}
                          variants={perspective}
                          initial="initial"
                          animate="enter"
                          exit="exit"
                        >
                            <a className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-black no-underline">
                                {title}
                            </a>
                        </motion.div>
                    </div>
                )
            })
        }
       </div>
       <motion.div className="flex flex-wrap">
            {
                footerLinks.map((link, i) => {
                    const { title, href } = link;
                    return (
                        <motion.a 
                            variants={slideIn}
                            custom={i} 
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            key={`f_${i}`}
                            className="w-1/2 mt-1 text-sm sm:text-base cursor-pointer"
                        >
                            {title}
                        </motion.a>
                    )
                })
            }
       </motion.div>
    </div>
  )
}