import ImageSection from "@/components/ui/ImageSection";
import Navbar from "@/components/header/Navbar";
import HeroSection from "@/components/HeroSection";
import TestimonialShowcase from "@/components/ui/TestimonialShowcase";
import FaqSection from "@/components/ui/FaqSection";
import Footer from "@/components/ui/Footer";
import Features from "@/components/ui/Features";
import SecondaryCta from "@/components/ui/SecondaryCta";
import WhyUs from "@/components/ui/WhyUs";
import HeroSectionHome from "@/components/HeroSectionHome";
import Reviews from "@/components/Review";
import WhoWeAre from "@/components/ui/WhoWeAre";
import ComparisonSection from "@/components/ui/ComparisonSection";
export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <HeroSectionHome/>
        {/* <HeroSection /> */}
        <Reviews/>
        <WhoWeAre/>
        <ComparisonSection/>
      {/* <TestimonialShowcase /> */}
      </div>
      {/* <ImageSection /> */}
      {/* <Features /> */}

      {/* <Header/> */}
      {/* <Form/> */}

      {/* <WhyUs/> */}
      <SecondaryCta />
      <FaqSection />

      <Footer />
    </>
  );
}
