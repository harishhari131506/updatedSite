import React from "react";
import Intro from "./Intro";
import Footer from "./Footer1";
import Lenis from "lenis";
import { useEffect } from "react";

const FooterMain = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      <main>
        <Intro />
        <Footer />
      </main>
    </div>
  );
};

export default FooterMain;
