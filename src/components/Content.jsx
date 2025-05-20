
import React from 'react'
import ContactSection from './contactSection'

export default function Content() {
  return (
    <div className='bg-[#2D2C43] py-8 px-4 md:px-12 h-full w-full flex flex-col justify-between'>
        <Section1 />
        <ContactSection />
        <Section2 />
    </div>
  )
}

const Section1 = () => {
    return (
        <div className='mt-10'>
            {/* <Nav /> */}
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end mt-16 pb-8'>
            {/* <h1 className='text-[8vw] md:text-[10vw] leading-[0.8] mt-10'>Let's Connect</h1> */}
            <p className='text-gray-400 text-sm'>©copyright Harish</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex flex-col md:flex-row shrink-0 gap-8 md:gap-20'>
            <div className='flex flex-col gap-2 mt-10' >
                <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
                <p className='hover:text-white cursor-pointer transition-colors'>Home</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Projects</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Our Mission</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Contact Us</p>
            </div>
            <div className='flex flex-col gap-2 mt-10 md:mt-10'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
                <p className='hover:text-white cursor-pointer transition-colors'>News</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Learn</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Certification</p>
                <p className='hover:text-white cursor-pointer transition-colors'>Publications</p>
            </div>
        </div>
    )
}

// import React from 'react'

// export default function Content() {
//   return (
//     <div className='bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between'>
//         <Section1 />
//         <Section2 />
//     </div>
//   )
// }

// const Section1 = () => {
//     return (
//         <div>
//             <Nav />
//         </div>
//     )
// }

// const Section2 = () => {
//     return (
//         <div className='flex justify-between items-end'>
//             <h1 className='text-[10vw] leading-[0.8] mt-10'>Let's Connect</h1>
//             <p>©copyright</p>
//         </div>
//     )
// }

// const Nav = () => {
//     return (
//         <div className='flex shrink-0 gap-20'>
//             <div className='flex flex-col gap-2 mt-10' >
//                 <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
//                 <p>Home</p>
//                 <p>Projects</p>
//                 <p>Our Mission</p>
//                 <p>Contact Us</p>
//             </div>
//             <div className='flex flex-col gap-2'>
//                 <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
//                 <p>News</p>
//                 <p>Learn</p>
//                 <p>Certification</p>
//                 <p>Publications</p>
//             </div>
//         </div>
//     )
// }