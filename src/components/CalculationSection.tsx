import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Repeat, GitCompare, Zap, Clock, Hash } from "lucide-react";
import { iterativeSquareSum, recursiveSquareSum, AlgorithmResult } from "@/lib/algorithms";

interface CalculationSectionProps {
  n: number;
  setN: (n: number) => void;
}

const CalculationSection = ({ n, setN }: CalculationSectionProps) => {
  const [iterativeResult, setIterativeResult] = useState<AlgorithmResult | null>(null);
  const [recursiveResult, setRecursiveResult] = useState<AlgorithmResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const handleIterative = () => {
    if (n > 0 && n <= 10000) {
      const result = iterativeSquareSum(n);
      setIterativeResult(result);
      setIsComparing(false);
    }
  };

  const handleRecursive = () => {
    if (n > 0 && n <= 5000) {
      const result = recursiveSquareSum(n);
      setRecursiveResult(result);
      setIsComparing(false);
    }
  };

  const handleCompare = () => {
    if (n > 0 && n <= 5000) {
      const iter = iterativeSquareSum(n);
      const rec = recursiveSquareSum(n);
      setIterativeResult(iter);
      setRecursiveResult(rec);
      setIsComparing(true);
    }
  };

  return (
    <section id="calculation" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Perhitungan Deret Bilangan Kuadrat</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Masukkan nilai n untuk menghitung jumlah deret bilangan kuadrat 1² + 2² + ... + n²
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="glass-card p-8">
            <label className="block text-mist mb-3 font-medium">Masukkan nilai n:</label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Math.max(1, Math.min(10000, parseInt(e.target.value) || 1)))}
              className="w-full bg-emerald/50 border border-mist/20 rounded-xl px-5 py-4 text-foreground text-lg font-mono focus:outline-none focus:border-blush transition-colors"
              min="1"
              max="10000"
            />
            <p className="text-mist/60 text-sm mt-2">
              Nilai maksimum: 10000
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={handleIterative} className="btn-pill flex-1 min-w-[140px]">
                <Play className="w-4 h-4 mr-2" />
                Jalankan Iteratif
              </button>
              <button onClick={handleRecursive} className="btn-pill flex-1 min-w-[140px]">
                <Repeat className="w-4 h-4 mr-2" />
                Jalankan Rekursif
              </button>
              <button onClick={handleCompare} className="btn-pill-accent w-full">
                <GitCompare className="w-4 h-4 mr-2" />
                Bandingkan Keduanya
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {(iterativeResult || recursiveResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`grid gap-6 ${isComparing ? "md:grid-cols-2" : "max-w-xl mx-auto"}`}
          >
            {iterativeResult && (
              <div className="result-panel">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blush/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-blush" />
                  </div>
                  <h3 className="text-xl font-semibold text-blush">Hasil Iteratif</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-mist mt-1" />
                    <div>
                      <p className="text-mist/70 text-sm">Deret Bilangan Kuadrat</p>
                      <p className="text-foreground font-mono text-sm mt-1">
                        [{iterativeResult.sequence.slice(0, 5).join(", ")}
                        {iterativeResult.sequence.length > 5 ? `, ... , ${iterativeResult.sequence.slice(-1)}` : ""}]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-mist" />
                    <div>
                      <p className="text-mist/70 text-sm">Jumlah Total</p>
                      <p className="result-value text-2xl font-bold">{iterativeResult.sum.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-mist/10">
                    <div>
                      <p className="text-mist/70 text-sm">Jumlah Operasi</p>
                      <p className="text-foreground font-semibold">{iterativeResult.operations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-mist/70 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Waktu Eksekusi
                      </p>
                      <p className="text-foreground font-semibold">{iterativeResult.executionTime.toFixed(4)} ms</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recursiveResult && (
              <div className="result-panel">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blush/20 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-blush" />
                  </div>
                  <h3 className="text-xl font-semibold text-blush">Hasil Rekursif</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-mist mt-1" />
                    <div>
                      <p className="text-mist/70 text-sm">Deret Bilangan Kuadrat</p>
                      <p className="text-foreground font-mono text-sm mt-1">
                        [{recursiveResult.sequence.slice(0, 5).join(", ")}
                        {recursiveResult.sequence.length > 5 ? `, ... , ${recursiveResult.sequence.slice(-1)}` : ""}]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-mist" />
                    <div>
                      <p className="text-mist/70 text-sm">Jumlah Total</p>
                      <p className="result-value text-2xl font-bold">{recursiveResult.sum.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-mist/10">
                    <div>
                      <p className="text-mist/70 text-sm">Jumlah Operasi</p>
                      <p className="text-foreground font-semibold">{recursiveResult.operations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-mist/70 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Waktu Eksekusi
                      </p>
                      <p className="text-foreground font-semibold">{recursiveResult.executionTime.toFixed(4)} ms</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {isComparing && iterativeResult && recursiveResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 glass-card p-6 max-w-xl mx-auto text-center"
          >
            <h4 className="text-blush font-semibold mb-3">Perbandingan</h4>
            <p className="text-mist">
              Algoritma <span className="text-blush font-semibold">
                {iterativeResult.executionTime < recursiveResult.executionTime ? "Iteratif" : "Rekursif"}
              </span> lebih cepat sebesar{" "}
              <span className="text-blush font-semibold">
                {Math.abs(((recursiveResult.executionTime - iterativeResult.executionTime) / Math.max(iterativeResult.executionTime, recursiveResult.executionTime)) * 100).toFixed(1)}%
              </span>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CalculationSection;
