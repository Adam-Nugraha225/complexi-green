import { motion } from "framer-motion";
import { Calculator, GitBranch, ArrowRight } from "lucide-react";

const AnalysisSection = () => {
  return (
    <section id="analysis" className="py-24 relative bg-midnight/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Analisis Perbandingan Kedua Algoritma</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Analisis teoretis kompleksitas waktu algoritma iteratif dan rekursif
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Analisis Algoritma Iteratif */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sage/20 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-sage" />
              </div>
              <h3 className="text-xl font-semibold text-blush">5.1 Analisis Teoretis: Algoritma Iteratif</h3>
            </div>

            <div className="space-y-4 text-mist leading-relaxed">
              <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm">
                <p>Ukuran masukan (input size) = n</p>
                <p className="mt-2">Operasi dasar = perkalian dan penjumlahan di dalam perulangan</p>
                <p className="text-blush/80 mt-1">(sum = sum + (i * i))</p>
              </div>

              <p>
                Algoritma iteratif pada kasus ini tidak memiliki percabangan yang memengaruhi jumlah operasi, 
                sehingga tidak terdapat kasus (best case, worst case, dan average case). Algoritma iteratif 
                melakukan perulangan dari i = 1 hingga i = n, sehingga jumlah iterasi yang dilakukan adalah 
                sebanyak n kali.
              </p>

              {/* Formula */}
              <div className="bg-midnight/70 rounded-xl p-6 text-center space-y-4">
                <div className="text-lg">
                  <span className="text-blush font-semibold">T(n) = </span>
                  <span className="text-mist">Σ</span>
                  <sub className="text-sage">i=1</sub>
                  <sup className="text-sage">n</sup>
                  <span className="text-mist ml-2">1</span>
                </div>

                <div className="space-y-2">
                  <p><span className="text-blush">T(n)</span> = n − 1 + 1</p>
                  <p className="text-xl font-semibold">
                    <span className="text-blush">= n</span>
                    <span className="text-sage ml-2">∈ O(n)</span>
                  </p>
                </div>
              </div>

              <p>
                Oleh karena itu, kompleksitas waktu pada algoritma iteratif dapat dinyatakan sebagai:
              </p>

              <div className="bg-sage/20 rounded-xl p-4 text-center">
                <span className="text-xl font-bold text-sage">T(n) ∈ O(n)</span>
              </div>
            </div>
          </motion.div>

          {/* Analisis Algoritma Rekursif */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blush/20 flex items-center justify-center">
                <GitBranch className="w-6 h-6 text-blush" />
              </div>
              <h3 className="text-xl font-semibold text-blush">5.2 Analisis Teoretis: Algoritma Rekursif</h3>
            </div>

            <div className="space-y-4 text-mist leading-relaxed">
              {/* 5.2.1 Metode Non-Homogen */}
              <h4 className="text-lg font-semibold text-sage">5.2.1 Metode Non-Homogen</h4>
              
              <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2">
                <p>T(n) = {"{"} 0 , n = 0</p>
                <p className="ml-8">{"{"} T(n − 1) + 1 , n {">"} 0</p>
                <p className="mt-3 pt-3 border-t border-mist/20">T(n) = T(n − 1) + 1</p>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">Identifikasi bentuk:</p>
                <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-1">
                  <p>t<sub>n</sub> − t<sub>n-1</sub> = 1</p>
                  <p>b = 1, k = 1, p(n) = 1 → d = 0</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">Bentuk persamaan karakteristik:</p>
                <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2 text-center">
                  <p>(a<sub>0</sub>r<sup>k</sup> + ...)(r − b)<sup>d+1</sup> = 0</p>
                  <p>(r − 1)(r − 1) = 0</p>
                  <p className="text-sage">r1 = r2 = 1</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">Solusi umum:</p>
                <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2">
                  <p>t<sub>n</sub> = C1·r1<sup>n</sup> + C2·n·r2<sup>n</sup></p>
                  <p className="mt-2">T(n) = T(n − 1) + 1</p>
                  <p>T(0) = T(0 − 1) + 1 = 0</p>
                  <p>T(1) = T(1 − 1) + 1 = 1</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continuation - Substitution */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
          {/* Substitusi nilai n */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blush/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-blush" />
              </div>
              <h4 className="text-lg font-semibold text-blush">Substitusi nilai n ke solusi umum:</h4>
            </div>

            <div className="space-y-4 text-mist">
              <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2">
                <p>n = 0 → C1(1)<sup>0</sup> + C2·1(1)<sup>0</sup> = 0 → C1 + C2 = 0</p>
                <p>n = 1 → C1(1)<sup>1</sup> + C2·1(1)<sup>1</sup> = 1 → C1 + C2 = 1</p>
                <div className="mt-3 pt-3 border-t border-mist/20">
                  <p>t0 = C1 = 0</p>
                  <p>t1 = 1 = C1 + C2 = 1 → 0 + C2 = 1</p>
                  <p className="text-sage ml-20">→ C2 = 1 − 0</p>
                  <p className="text-sage ml-20">→ C2 = 1</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">Solusi khusus:</p>
                <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2">
                  <p>t<sub>n</sub> = C1·r1<sup>n</sup> + C2·n·r2<sup>n</sup></p>
                  <p>t<sub>n</sub> = 0(1)<sup>n</sup> + 1(1)(1)<sup>n</sup></p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">B. Metode Substitusi</p>
                <p className="font-semibold text-sage mb-2">Relasi rekurens:</p>
                <div className="bg-midnight/70 rounded-xl p-4 text-center">
                  <p className="text-lg">C(n) = C(n − 1) + 1, C(0) = 0</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-blush mb-2">Cara 1:</p>
                <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-1">
                  <p>C(0) = 0</p>
                  <p>C(1) = C(0) + 1 = 1</p>
                  <p>C(2) = C(1) + 1 = 2</p>
                  <p>C(3) = C(2) + 1 = 3</p>
                  <p className="text-mist/50">.</p>
                  <p className="text-mist/50">.</p>
                  <p className="text-mist/50">.</p>
                  <p className="text-sage font-semibold">C(n) = n</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cara 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sage/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-sage" />
              </div>
              <h4 className="text-lg font-semibold text-blush">Cara 2:</h4>
            </div>

            <div className="space-y-4 text-mist">
              <div className="bg-midnight/50 rounded-xl p-4 font-mono text-sm space-y-2">
                <p>C(n) = C(n−1) + 1</p>
                <p className="ml-6">= (C(n − 2) + 1) + 1</p>
                <p className="ml-6">= C(n − 2) + 2</p>
                <p className="ml-10">= C(n − 3) + 1 + 2</p>
                <p className="ml-10">= C(n − 3) + 3</p>
                <p className="text-mist/50 ml-6">.</p>
                <p className="text-mist/50 ml-6">.</p>
                <p className="text-mist/50 ml-6">.</p>
                <p className="ml-6">= C(n − i) + i</p>
                <p className="ml-6">= C(n − n)</p>
                <p className="ml-6">= C(0) + n</p>
                <p className="text-sage font-semibold ml-6">= n</p>
                <p className="text-sage font-bold text-lg ml-6">Big-O(n)</p>
              </div>

              <div className="bg-midnight/70 rounded-xl p-6">
                <p className="text-mist leading-relaxed">
                  Pada perhitungan metode substitusi ini kita mendapatkan bahwa operasi dasar C(n) 
                  dan T(n) waktu eksekusinya mendapatkan hasilnya yaitu termasuk dalam kompleksitas waktu 
                  <span className="text-sage font-bold"> Big-O(n)</span>.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Kesimpulan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 glass-card p-8 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-blush mb-6">Kesimpulan Analisis</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-sage/10 rounded-xl p-6">
              <h4 className="text-sage font-semibold mb-2">Algoritma Iteratif</h4>
              <p className="text-3xl font-bold text-sage">O(n)</p>
              <p className="text-mist/70 mt-2 text-sm">Kompleksitas waktu linear</p>
            </div>
            <div className="bg-blush/10 rounded-xl p-6">
              <h4 className="text-blush font-semibold mb-2">Algoritma Rekursif</h4>
              <p className="text-3xl font-bold text-blush">O(n)</p>
              <p className="text-mist/70 mt-2 text-sm">Kompleksitas waktu linear</p>
            </div>
          </div>
          <p className="text-mist mt-6 leading-relaxed">
            Kedua algoritma memiliki kompleksitas waktu yang sama yaitu <span className="text-sage font-semibold">O(n)</span>, 
            yang berarti waktu eksekusi bertambah secara linear seiring bertambahnya nilai n. 
            Namun, algoritma rekursif memiliki overhead tambahan berupa call stack management yang dapat memengaruhi performa praktis.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalysisSection;
