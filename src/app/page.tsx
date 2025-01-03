import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import SupportedChains from '@/components/SupportedChains';
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SupportedChains />
      <Features />
      <Footer />
    </>
  );
}
