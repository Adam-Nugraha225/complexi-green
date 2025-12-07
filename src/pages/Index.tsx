import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CalculationSection from "@/components/CalculationSection";
import CodeSection from "@/components/CodeSection";
import VisualizationSection from "@/components/VisualizationSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import DocumentationSection from "@/components/DocumentationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <CalculationSection />
        <CodeSection />
        <VisualizationSection />
        <ExperimentsSection />
        <DocumentationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
