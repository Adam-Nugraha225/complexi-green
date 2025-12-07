import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToCalculation = () => {
    document.getElementById("calculation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="gradient-orb-1 animate-float" />
      <div className="gradient-orb-2 animate-float" style={{ animationDelay: "1.5s" }} />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(hsla(189 16% 78% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsla(189 16% 78% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 glass-card"
          >
            <Sparkles className="w-4 h-4 text-blush" />
            <span className="text-sm font-medium text-mist">Tugas Besar AKA • TEL-U</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-gradient">Analisis Rekursif vs Iteratif</span>
            <br />
            <span className="text-foreground">dalam Bilangan Kuadrat</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-blush/80 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Perbandingan Jumlah Operasi Algoritma Rekursif dan Iteratif 
            dalam Deret Bilangan Kuadrat
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToCalculation}
              className="btn-pill-accent group"
            >
              <span>Mulai Analisis</span>
              <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </button>
            <a href="#documentation" className="btn-pill">
              <span>Baca Dokumentasi</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Floating formula decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-8 text-mist/30 font-mono text-sm"
        >
          <span>Σ i² = 1² + 2² + 3² + ... + n²</span>
          <span className="hidden md:inline">= n(n+1)(2n+1)/6</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-mist/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-blush"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
