import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import GameServers from "@/components/GameServers";
import Features from "@/components/Features";
import BDIXNodes from "@/components/BDIXNodes";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <GameServers />
        <section id="features">
          <Features />
        </section>
        <BDIXNodes />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
