import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import MotionShowcase from "@/components/MotionShowcase";
import Workflow from "@/components/Workflow";
import Stats from "@/components/Stats";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#030306]">
      {/* Floating Header Nav bar */}
      <Header />

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Full-screen Hero section with ThreeJS overlay */}
        <Hero />

        {/* About section with 3D Image tilt */}
        <About />

        {/* 12-item bento grid services */}
        <Services />

        {/* Masonry projects and interactive color grading slider */}
        <Portfolio />

        {/* Motion graphics experiments showcase */}
        <MotionShowcase />

        {/* Scrolling playhead workflow timeline */}
        <Workflow />

        {/* Counter stats */}
        <Stats />

        {/* Switcher pricing cards */}
        <Pricing />

        {/* Smooth opening accordion FAQ */}
        <FAQ />

        {/* Contact form and booking slots */}
        <Contact />
      </main>

      {/* Looping footer marquee and clock */}
      <Footer />
    </div>
  );
}
