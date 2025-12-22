import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, BarChart3, Table2 } from "lucide-react";
import { iterativeSquareSum, recursiveSquareSum } from "@/lib/algorithms";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ExperimentResult {
  n: number;
  iterativeTime: number;
  recursiveTime: number;
  iterativeOps: number;
  recursiveOps: number;
}

interface ExperimentsSectionProps {
  n: number;
}

const ExperimentsSection = ({ n }: ExperimentsSectionProps) => {
  const [results, setResults] = useState<ExperimentResult[]>([]);
  const [view, setView] = useState<"table" | "chart">("chart");
  const [hasRun, setHasRun] = useState(false);
  const [cachedN, setCachedN] = useState<number | null>(null);

  // Generate test sizes based on n
  const getTestSizes = (maxN: number): number[] => {
    const sizes: number[] = [];
    const step = Math.max(1, Math.floor(maxN / 10));
    
    for (let i = step; i <= maxN; i += step) {
      sizes.push(i);
    }
    
    // Always include n itself if not already included
    if (!sizes.includes(maxN) && maxN > 0) {
      sizes.push(maxN);
    }
    
    return sizes.sort((a, b) => a - b);
  };

  // Run algorithm multiple times and get average time for consistency
  const getAverageTime = (algorithm: (size: number) => void, size: number, runs: number = 5): number => {
    const times: number[] = [];
    
    // Warm-up run to stabilize JIT compilation
    algorithm(size);
    
    for (let i = 0; i < runs; i++) {
      const start = performance.now();
      algorithm(size);
      const end = performance.now();
      times.push(end - start);
    }
    
    // Remove outliers (min and max) and average the rest for more consistent results
    if (times.length >= 3) {
      times.sort((a, b) => a - b);
      const trimmedTimes = times.slice(1, -1); // Remove first and last (outliers)
      return trimmedTimes.reduce((sum, t) => sum + t, 0) / trimmedTimes.length;
    }
    
    return times.reduce((sum, t) => sum + t, 0) / times.length;
  };

  const runExperiments = () => {
    // If we already ran experiments for this n, don't re-run (keep cached results)
    if (cachedN === n && hasRun && results.length > 0) {
      return;
    }

    const testSizes = getTestSizes(n);
    const newResults: ExperimentResult[] = [];

    for (const size of testSizes) {
      // Iterative - run multiple times and average
      const iterativeTime = getAverageTime(() => iterativeSquareSum(size), size, 5);

      // Recursive - run multiple times and average
      let recursiveTime = 0;
      if (size <= 10000) {
        recursiveTime = getAverageTime(() => recursiveSquareSum(size), size, 5);
      }

      newResults.push({
        n: size,
        iterativeTime,
        recursiveTime,
        iterativeOps: size,
        recursiveOps: size + 1, // +1 for base case call
      });
    }

    setResults(newResults);
    setHasRun(true);
    setCachedN(n);
  };

  const chartData = results.map((r) => ({
    n: r.n.toLocaleString(),
    Iteratif: parseFloat(r.iterativeTime.toFixed(4)),
    Rekursif: parseFloat(r.recursiveTime.toFixed(4)),
  }));

  // Dynamic conclusion based on results
  const conclusion = useMemo(() => {
    if (results.length === 0) return null;

    const maxN = results[results.length - 1].n;
    const minN = results[0].n;
    const iterativeWins = results.filter((r) => r.iterativeTime < r.recursiveTime).length;
    const recursiveWins = results.filter((r) => r.recursiveTime < r.iterativeTime).length;
    const avgIterativeTime = results.reduce((sum, r) => sum + r.iterativeTime, 0) / results.length;
    const avgRecursiveTime = results.reduce((sum, r) => sum + r.recursiveTime, 0) / results.length;

    const isIterativeFaster = avgIterativeTime < avgRecursiveTime;
    const timeDiffPercent = isIterativeFaster
      ? avgRecursiveTime > 0 ? ((avgRecursiveTime - avgIterativeTime) / avgRecursiveTime) * 100 : 0
      : avgIterativeTime > 0 ? ((avgIterativeTime - avgRecursiveTime) / avgIterativeTime) * 100 : 0;

    const winner = iterativeWins > recursiveWins ? "Iteratif" : recursiveWins > iterativeWins ? "Rekursif" : "Seimbang";
    const winnerCount = winner === "Iteratif" ? iterativeWins : recursiveWins;

    const getExplanation = () => {
      if (winner === "Iteratif") {
        return "Algoritma Iteratif lebih efisien karena tidak membutuhkan overhead call stack seperti pada rekursi.";
      } else if (winner === "Rekursif") {
        return "Algoritma Rekursif menunjukkan performa lebih baik pada kondisi pengujian ini, kemungkinan karena optimisasi compiler atau cache.";
      }
      return "Kedua algoritma menunjukkan performa yang setara pada kondisi pengujian ini.";
    };

    return {
      minN,
      maxN,
      winner,
      winnerCount,
      totalTests: results.length,
      avgIterativeTime,
      avgRecursiveTime,
      timeDiffPercent,
      isIterativeFaster,
      explanation: getExplanation(),
    };
  }, [results]);

  return (
    <section id="experiments" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Eksperimen Otomatis</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Pengujian perbandingan running time algoritma iteratif dan rekursif berdasarkan nilai n = {n.toLocaleString()}
          </p>
        </motion.div>

        {/* Run Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <button onClick={runExperiments} className="btn-pill-accent text-lg px-8 py-4">
            <Play className="w-5 h-5 mr-2" />
            Jalankan Eksperimen (n = {n.toLocaleString()})
          </button>
        </motion.div>

        {hasRun && results.length > 0 && (
          <>
            {/* View Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center mb-8"
            >
              <div className="tab-switch">
                <button
                  onClick={() => setView("chart")}
                  className={view === "chart" ? "active" : ""}
                >
                  <BarChart3 className="w-4 h-4 inline mr-1" />
                  Grafik
                </button>
                <button
                  onClick={() => setView("table")}
                  className={view === "table" ? "active" : ""}
                >
                  <Table2 className="w-4 h-4 inline mr-1" />
                  Tabel
                </button>
              </div>
            </motion.div>

            {view === "chart" ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                {/* Running Time Chart */}
                <div className="glass-card p-8">
                  <h3 className="text-blush font-semibold mb-2 text-center text-xl">
                    Perbandingan Running Time
                  </h3>
                  <p className="text-mist/70 text-center text-sm mb-8">
                    Grafik perbandingan waktu eksekusi algoritma Iteratif vs Rekursif (dalam milidetik)
                  </p>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(189,205,207,0.2)" />
                      <XAxis
                        dataKey="n"
                        stroke="hsl(189 16% 78%)"
                        fontSize={12}
                        label={{ value: "Nilai n", position: "insideBottom", offset: -10, fill: "hsl(189 16% 78%)" }}
                      />
                      <YAxis
                        stroke="hsl(189 16% 78%)"
                        fontSize={12}
                        label={{ value: "Waktu (ms)", angle: -90, position: "insideLeft", fill: "hsl(189 16% 78%)" }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(180 100% 10%)",
                          border: "1px solid hsla(189 16% 78% / 0.3)",
                          borderRadius: "16px",
                          padding: "12px 16px",
                          color: "hsl(189 16% 78%)",
                        }}
                        formatter={(value: number, name: string) => [
                          `${value.toFixed(4)} ms`,
                          name,
                        ]}
                        labelFormatter={(label) => `n = ${label}`}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                      />
                      <Line
                        type="monotone"
                        dataKey="Iteratif"
                        stroke="#5FB094"
                        strokeWidth={4}
                        dot={{ fill: "#5FB094", r: 6, strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 10, fill: "#5FB094", stroke: "#fff", strokeWidth: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Rekursif"
                        stroke="#F5D0D0"
                        strokeWidth={4}
                        dot={{ fill: "#F5D0D0", r: 6, strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 10, fill: "#F5D0D0", stroke: "#fff", strokeWidth: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                  {/* Legend explanation */}
                  <div className="flex justify-center gap-8 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#5FB094" }}></div>
                      <span className="text-mist text-sm">Iteratif (O(n))</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "#F5D0D0" }}></div>
                      <span className="text-mist text-sm">Rekursif (O(n))</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="overflow-x-auto"
              >
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Input Size (n)</th>
                      <th>Iteratif Time (ms)</th>
                      <th>Rekursif Time (ms)</th>
                      <th>Selisih (ms)</th>
                      <th>Lebih Cepat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => {
                      const diff = Math.abs(r.iterativeTime - r.recursiveTime);
                      const winner =
                        r.iterativeTime < r.recursiveTime
                          ? "Iteratif"
                          : r.recursiveTime < r.iterativeTime
                          ? "Rekursif"
                          : "Sama";
                      return (
                        <tr key={r.n}>
                          <td className="font-mono font-semibold">{r.n.toLocaleString()}</td>
                          <td>{r.iterativeTime.toFixed(4)}</td>
                          <td>{r.recursiveTime.toFixed(4)}</td>
                          <td>{diff.toFixed(4)}</td>
                          <td className="highlight">{winner}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Conclusion */}
            {conclusion && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 glass-card p-8 text-center max-w-3xl mx-auto"
              >
                <h3 className="text-blush font-semibold text-xl mb-4">Kesimpulan Eksperimen</h3>
                <p className="text-mist leading-relaxed">
                  Berdasarkan hasil eksperimen pada{" "}
                  <span className="text-blush font-semibold">{conclusion.totalTests} ukuran input</span> dari{" "}
                  <span className="text-blush font-semibold">{conclusion.minN.toLocaleString()}</span> hingga{" "}
                  <span className="text-blush font-semibold">{conclusion.maxN.toLocaleString()}</span>, algoritma{" "}
                  <span className="text-blush font-semibold">{conclusion.winner}</span>
                  {conclusion.winner !== "Seimbang" && (
                    <>
                      {" "}memenangkan <span className="text-blush font-semibold">{conclusion.winnerCount}</span> dari{" "}
                      <span className="text-blush font-semibold">{conclusion.totalTests}</span> pengujian
                    </>
                  )}
                  {conclusion.winner === "Seimbang" && " dengan kedua algoritma memiliki jumlah kemenangan sama"}.
                  {" "}Rata-rata running time Iteratif adalah{" "}
                  <span className="text-blush font-semibold">{conclusion.avgIterativeTime.toFixed(4)} ms</span> vs Rekursif{" "}
                  <span className="text-blush font-semibold">{conclusion.avgRecursiveTime.toFixed(4)} ms</span>
                  {conclusion.timeDiffPercent > 0.01 && (
                    <>
                      , dengan {conclusion.isIterativeFaster ? "Iteratif" : "Rekursif"}{" "}
                      <span className="text-blush font-semibold">{conclusion.timeDiffPercent.toFixed(1)}%</span> lebih cepat
                    </>
                  )}
                  {conclusion.timeDiffPercent <= 0.01 && ", dengan perbedaan waktu yang tidak signifikan"}.
                  {" "}{conclusion.explanation}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ExperimentsSection;
