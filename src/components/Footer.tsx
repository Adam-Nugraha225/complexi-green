import { motion } from "framer-motion";
import { Heart, Github, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-mist/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-blush flex items-center justify-center">
              <span className="text-emerald font-bold text-lg">Σ</span>
            </div>
            <span className="font-semibold text-foreground">Square Analysis</span>
          </div>

          <p className="text-mist/70 mb-6">
            Tugas Besar Analisis Kompleksitas Algoritma
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href="#"
              className="text-mist hover:text-blush transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">Source Code</span>
            </a>
            <a
              href="https://telkomuniversity.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mist hover:text-blush transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">Telkom University</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-mist/60 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-blush fill-blush" />
            <span>for TEL-U AKA</span>
          </div>

          <p className="text-mist/40 text-xs mt-4">
            © 2024 Square Number Analysis. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
