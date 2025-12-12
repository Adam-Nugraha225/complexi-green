import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, BarChart3, Table2 } from "lucide-react";
import { runExperiments, ExperimentResult } from "@/lib/algorithms";
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

const ExperimentsSection = () => {
  const [results, setResults] = useState<ExperimentResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [view, setView] = useState<"table" | "chart">("chart");

  const handleRunExperiments = () => {
    setIsRunning(true);
    setTimeout(() => {
      const data = runExperiments();
      setResults(data);
      setIsRunning(false);
    }, 500);
  };

  useEffect(() => {
    handleRunExperiments();
  }, []);

  const chartData = results.map((r) => ({
    n: r.n,
    Iteratif: r.iterativeTime,
    Rekursif: r.recursiveTime,
  }));

  const opsChartData = results.map((r) => ({
    n: r.n,
    Iteratif: r.iterativeOps,
    Rekursif: r.recursiveOps,
  }));

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
            Pengujian algoritma pada berbagai ukuran input sesuai ketentuan TUBES TEL-U
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={handleRunExperiments}
            disabled={isRunning}
            className="btn-pill-accent"
          >
            <Play className={`w-4 h-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Menjalankan..." : "Jalankan Ulang Eksperimen"}
          </button>

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

        {results.length > 0 && (
          <>
            {view === "chart" ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Time Chart */}
                <div className="glass-card p-6">
                  <h3 className="text-blush font-semibold mb-6 text-center">Running Time (ms)</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(189,205,207,0.15)" />
                      <XAxis dataKey="n" stroke="hsl(189 16% 78%)" fontSize={12} />
                      <YAxis stroke="hsl(189 16% 78%)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(180 100% 10%)",
                          border: "1px solid hsla(189 16% 78% / 0.2)",
                          borderRadius: "12px",
                          color: "hsl(189 16% 78%)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Iteratif"
                        stroke="#034C36"
                        strokeWidth={3}
                        dot={{ fill: "#034C36", r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Rekursif"
                        stroke="#E3B8B8"
                        strokeWidth={3}
                        dot={{ fill: "#E3B8B8", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Operations Chart */}
                <div className="glass-card p-6">
                  <h3 className="text-blush font-semibold mb-6 text-center">Jumlah Operasi</h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={opsChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(189,205,207,0.15)" />
                      <XAxis dataKey="n" stroke="hsl(189 16% 78%)" fontSize={12} />
                      <YAxis stroke="hsl(189 16% 78%)" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(180 100% 10%)",
                          border: "1px solid hsla(189 16% 78% / 0.2)",
                          borderRadius: "12px",
                          color: "hsl(189 16% 78%)",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Iteratif"
                        stroke="#034C36"
                        strokeWidth={3}
                        dot={{ fill: "#034C36", r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="Rekursif"
                        stroke="#E3B8B8"
                        strokeWidth={3}
                        dot={{ fill: "#E3B8B8", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
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
                      <th>Iteratif Ops</th>
                      <th>Rekursif Ops</th>
                      <th>Lebih Cepat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.n}>
                        <td className="font-mono font-semibold">{r.n.toLocaleString()}</td>
                        <td>{r.iterativeTime.toFixed(4)}</td>
                        <td>{r.recursiveTime.toFixed(4)}</td>
                        <td>{r.iterativeOps.toLocaleString()}</td>
                        <td>{r.recursiveOps.toLocaleString()}</td>
                        <td className="highlight">
                          {r.iterativeTime < r.recursiveTime ? "Iteratif" : "Rekursif"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 glass-card p-8 text-center max-w-3xl mx-auto"
            >
              <h3 className="text-blush font-semibold text-xl mb-4">Kesimpulan Eksperimen</h3>
              {(() => {
                const maxN = results.length > 0 ? results[results.length - 1].n : 0;
                const minN = results.length > 0 ? results[0].n : 0;
                const iterativeWins = results.filter(r => r.iterativeTime < r.recursiveTime).length;
                const recursiveWins = results.filter(r => r.recursiveTime < r.iterativeTime).length;
                const ties = results.length - iterativeWins - recursiveWins;
                const avgIterativeTime = results.length > 0 ? results.reduce((sum, r) => sum + r.iterativeTime, 0) / results.length : 0;
                const avgRecursiveTime = results.length > 0 ? results.reduce((sum, r) => sum + r.recursiveTime, 0) / results.length : 0;
                
                const isIterativeFaster = avgIterativeTime < avgRecursiveTime;
                const timeDiffPercent = isIterativeFaster
                  ? (avgRecursiveTime > 0 ? ((avgRecursiveTime - avgIterativeTime) / avgRecursiveTime * 100) : 0)
                  : (avgIterativeTime > 0 ? ((avgIterativeTime - avgRecursiveTime) / avgIterativeTime * 100) : 0);
                
                const winner = iterativeWins > recursiveWins ? "Iteratif" : recursiveWins > iterativeWins ? "Rekursif" : "Seimbang";
                const winnerCount = winner === "Iteratif" ? iterativeWins : winner === "Rekursif" ? recursiveWins : ties;
                
                const getConclusion = () => {
                  if (winner === "Iteratif") {
                    return "Algoritma Iteratif lebih efisien karena tidak membutuhkan overhead call stack seperti pada rekursi.";
                  } else if (winner === "Rekursif") {
                    return "Algoritma Rekursif menunjukkan performa lebih baik pada kondisi pengujian ini, kemungkinan karena optimisasi compiler atau cache.";
                  } else {
                    return "Kedua algoritma menunjukkan performa yang setara pada kondisi pengujian ini.";
                  }
                };
                
                return (
                  <p className="text-mist leading-relaxed">
                    Berdasarkan hasil eksperimen pada <span className="text-blush font-semibold">{results.length} input size</span> dari{" "}
                    <span className="text-blush font-semibold">{minN.toLocaleString()}</span> hingga{" "}
                    <span className="text-blush font-semibold">{maxN.toLocaleString()}</span>, algoritma{" "}
                    <span className="text-blush font-semibold">{winner}</span>
                    {winner !== "Seimbang" && (
                      <> memenangkan <span className="text-blush font-semibold">{winnerCount}</span> dari{" "}
                      <span className="text-blush font-semibold">{results.length}</span> pengujian</>
                    )}
                    {winner === "Seimbang" && <> dengan kedua algoritma memiliki jumlah kemenangan sama</>}. 
                    Rata-rata running time Iteratif adalah{" "}
                    <span className="text-blush font-semibold">{avgIterativeTime.toFixed(4)} ms</span> vs Rekursif{" "}
                    <span className="text-blush font-semibold">{avgRecursiveTime.toFixed(4)} ms</span>
                    {timeDiffPercent > 0.01 && (
                      <>, dengan {isIterativeFaster ? "Iteratif" : "Rekursif"}{" "}
                      <span className="text-blush font-semibold">{timeDiffPercent.toFixed(1)}%</span> lebih cepat</>
                    )}
                    {timeDiffPercent <= 0.01 && <>, dengan perbedaan waktu yang tidak signifikan</>}. 
                    {getConclusion()}
                  </p>
                );
              })()}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default ExperimentsSection;
