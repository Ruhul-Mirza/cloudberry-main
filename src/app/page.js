import ImageSection from "@/components/ui/ImageSection";
import Navbar from "@/components/header/Navbar";
import HeroSection from "@/components/HeroSection";
import TestimonialShowcase from "@/components/ui/TestimonialShowcase";
import FaqSection from "@/components/ui/FaqSection";
import Footer from "@/components/ui/Footer";
import Features from "@/components/ui/Features";
import SecondaryCta from "@/components/ui/SecondaryCta";
import WhyUs from "@/components/ui/WhyUs";
export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-tr from-zinc-100 via-white to-zinc-300">
        <Navbar />
        <HeroSection />
      <TestimonialShowcase />
      </div>
      <ImageSection />
      <Features />

      {/* <Header/> */}
      {/* <Form/> */}

      {/* <WhyUs/> */}
      <SecondaryCta />
      <FaqSection />

      <Footer />
    </>
  );
}
