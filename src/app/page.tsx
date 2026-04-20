import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EmailGenerator from "@/components/EmailGenerator";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Roadmap from "@/components/Roadmap";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <EmailGenerator />
        <Testimonials />
        <HowItWorks />
        <Roadmap />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
