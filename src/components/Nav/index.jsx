import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";

export default function Navigation() {
  return (
    <div className="flex flex-col justify-between px-4 sm:px-6 md:px-10 pt-16 pb-12 h-full box-border">
      <div className="flex flex-col gap-2 sm:gap-3">
        {links.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.div
              key={`b_${i}`}
              className="perspective-[120px] origin-bottom"
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
              layout
            >
              <a
                href={href}
                className="block text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-white no-underline cursor-pointer"
              >
                {title}
              </a>
            </motion.div>
          );
        })}
      </div>

      <motion.div className="flex flex-row flex-wrap gap-2 mt-8" layout>
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              key={`f_${i}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={slideIn}
              initial="initial"
              animate="enter"
              exit="exit"
              className="bg-gray-600 text-white rounded px-3 py-2 text-sm sm:text-base cursor-pointer transition-colors duration-200 hover:bg-gray-700"
              layout
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}

// import { motion } from 'framer-motion';
// import { links, footerLinks } from './data';
// import { perspective, slideIn } from "./anim";

// export default function Navigation() {
//     return (
//         <div className="flex flex-col justify-between px-4 sm:px-6 md:px-10 pt-16 pb-12 h-full box-border">
//             <div className="flex flex-col gap-2 sm:gap-3">
//                 {
//                     links.map((link, i) => {
//                         const { title, href } = link;
//                         return (
//                             <div key={`b_${i}`} className="perspective-[120px] origin-bottom">
//                                 <motion.div
//                                     href={href}
//                                     custom={i}
//                                     variants={perspective}
//                                     initial="initial"
//                                     animate="enter"
//                                     exit="exit"
//                                 >
//                                     <a href={href} className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-black no-underline cursor-pointer">
//                                         {title}
//                                     </a>
//                                 </motion.div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//             <motion.div className="flex flex-row flex-wrap">
//                 {
//                     footerLinks.map((link, i) => {
//                         const { title, href } = link;
//                         return (

//                             <>
//                                 <motion.a
//                                     href={href}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     variants={slideIn}
//                                     custom={i}
//                                     initial="initial"
//                                     animate="enter"
//                                     exit="exit"
//                                     key={`f_${i}`}
//                                     className="bg-gray-600 text-white rounded px-2 py-2 px-2 mt-1 text-sm sm:text-base cursor-pointer"
//                                 >
//                                     {title}
//                                 </motion.a>


//                             </>


//                         )
//                     })
//                 }
//             </motion.div>
//         </div>
//     )
// }
