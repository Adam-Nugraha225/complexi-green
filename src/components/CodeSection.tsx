import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Code2 } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-go";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import { codeSnippets } from "@/lib/algorithms";

type Language = "pseudocode" | "react";
type Algorithm = "iterative" | "recursive";

const languages: { id: Language; label: string; prismLang: string }[] = [
  { id: "pseudocode", label: "Pseudocode", prismLang: "clike" },
  { id: "react", label: "React", prismLang: "tsx" },
];

const CodeSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("pseudocode");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>("iterative");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [selectedLanguage, selectedAlgorithm]);

  const currentCode = codeSnippets[selectedLanguage][selectedAlgorithm];
  const prismLang = languages.find((l) => l.id === selectedLanguage)?.prismLang || "clike";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Implementasi Kode</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Lihat implementasi algoritma dalam berbagai bahasa pemrograman
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Language Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="tab-switch">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={selectedLanguage === lang.id ? "active" : ""}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Algorithm Selector */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedAlgorithm("iterative")}
              className={`btn-pill ${selectedAlgorithm === "iterative" ? "!bg-forest border-blush" : ""}`}
            >
              Iteratif
            </button>
            <button
              onClick={() => setSelectedAlgorithm("recursive")}
              className={`btn-pill ${selectedAlgorithm === "recursive" ? "!bg-forest border-blush" : ""}`}
            >
              Rekursif
            </button>
          </div>

          {/* Code Block */}
          <div className="code-block relative">
            <div className="flex items-center justify-between px-6 py-4 border-b border-mist/10">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-blush" />
                <span className="text-mist font-medium">
                  {selectedAlgorithm === "iterative" ? "Algoritma Iteratif" : "Algoritma Rekursif"} - {languages.find((l) => l.id === selectedLanguage)?.label}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blush text-emerald font-medium text-sm hover:bg-blush/90 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <pre className="!bg-transparent !m-0">
              <code className={`language-${prismLang}`}>{currentCode}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeSection;
