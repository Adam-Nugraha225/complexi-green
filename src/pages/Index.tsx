import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CalculationSection from "@/components/CalculationSection";
import CodeSection from "@/components/CodeSection";
import VisualizationSection from "@/components/VisualizationSection";
import ExperimentsSection from "@/components/ExperimentsSection";
import AnalysisSection from "@/components/AnalysisSection";
import DocumentationSection from "@/components/DocumentationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [sharedN, setSharedN] = useState<number>(10);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <CalculationSection n={sharedN} setN={setSharedN} />
        <CodeSection />
        <VisualizationSection />
        <ExperimentsSection n={sharedN} />
        <AnalysisSection />
        <DocumentationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
