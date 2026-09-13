// import React from "react";
// import { company, stats, expertise } from "../data/content";

// function Home() {
//   const HERO_IMAGE =
//     "https://png.pngtree.com/thumb_back/fh260/background/20250306/pngtree-a-hand-writing-code-on-digital-interface-with-glowing-connections-symbolizing-image_17075797.jpg";
//   return (
//     <div>
//       <section className="relative text-paper overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${HERO_IMAGE})` }}
//           role="img"
//           aria-label="Hero image in home bg of lms"
//         />
//         <div className="absolute inset-0 bg-linear-to-r from-navy-ink/95 via-navy-ink/80 to-navy-ink/45" />
//         <div className="absolute inset-0 blueprint-grid opacity-20" />

//         <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
//           <div className="reveal-up max-w-xl">
//             <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase px-3 py-1 border border-amber text-amber">
//               <Ruler size={13} /> Est. {company.established}
//             </span>
//             <h1 className="mt-5 font-display font-semibold text-4xl sm:text-5xl md:text-[3.3rem] leading-[1.08]">
//               We design, cost and build what the monsoon can&apos;t undo.
//             </h1>
//             <p className="mt-5 text-paper/80 text-base md:text-lg leading-relaxed max-w-lg">
//               New Y.B. Construction has designed, estimated and built
//               residential and small commercial projects since{" "}
//               {company.established}, with waterproofing and expansion-joint work
//               as our specialty trade.
//             </p>
//             <div className="mt-8 flex flex-wrap gap-4">
//               <Link
//                 to="/contact?type=quote"
//                 className="inline-flex items-center gap-2 bg-amber text-navy-ink font-display uppercase tracking-wide text-sm font-semibold px-6 py-3.5 hover:bg-amber-bright transition-colors"
//               >
//                 Request a Quote <ArrowRight size={16} />
//               </Link>
//               <Link
//                 to="/services"
//                 className="inline-flex items-center gap-2 border border-paper/30 text-paper font-display uppercase tracking-wide text-sm font-semibold px-6 py-3.5 hover:border-amber hover:text-amber transition-colors"
//               >
//                 Our Services
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import Sidebar from '../componets/layout/Sidebar';
import Footer from '../componets/layout/Footer';
import Navbar from '../componets/layout/Navbar';

function Home() {
  return (
    <div>
      <Navbar/>
      
      <Sidebar/>
      <Footer/>
    </div>
  )
}

export default Home
