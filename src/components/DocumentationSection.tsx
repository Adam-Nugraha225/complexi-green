import { motion } from "framer-motion";
import { BookOpen, Code, Zap, TrendingUp, Scale, Lightbulb } from "lucide-react";

const DocumentationSection = () => {
  const sections = [
    {
      icon: BookOpen,
      title: "Konsep Bilangan Kuadrat",
      content: `Bilangan kuadrat adalah hasil perkalian suatu bilangan bulat dengan dirinya sendiri. 
      Deret bilangan kuadrat: 1², 2², 3², ..., n² = 1, 4, 9, 16, 25, ...
      
      Rumus tertutup: Σ i² = n(n+1)(2n+1)/6
      
      Deret ini memiliki banyak aplikasi dalam matematika, fisika, dan ilmu komputer.`,
    },
    {
      icon: Code,
      title: "Algoritma Iteratif",
      content: `Pendekatan iteratif menggunakan loop untuk menghitung setiap elemen deret:
      
      • Inisialisasi sum = 0
      • Untuk setiap i dari 1 hingga n:
        - Hitung kuadrat: squared = i × i
        - Tambahkan ke total: sum = sum + squared
      • Kembalikan sum
      
      Keuntungan: Efisien dalam penggunaan memori (O(1) space complexity)`,
    },
    {
      icon: Zap,
      title: "Algoritma Rekursif",
      content: `Pendekatan rekursif membagi masalah menjadi sub-masalah lebih kecil:
      
      • Base case: jika n = 0, kembalikan 0
      • Recursive case: kembalikan n² + f(n-1)
      
      Proses:
      f(4) = 16 + f(3)
      f(3) = 9 + f(2)
      f(2) = 4 + f(1)
      f(1) = 1 + f(0)
      f(0) = 0
      
      Kekurangan: Membutuhkan call stack O(n)`,
    },
    {
      icon: TrendingUp,
      title: "Kompleksitas Waktu O(n)",
      content: `Kedua algoritma memiliki kompleksitas waktu yang sama:
      
      • Time Complexity: O(n)
        - Iteratif: n iterasi loop
        - Rekursif: n pemanggilan fungsi
      
      • Space Complexity:
        - Iteratif: O(1) - hanya variabel konstan
        - Rekursif: O(n) - karena call stack
      
      Untuk n yang sangat besar, overhead call stack pada rekursif dapat menyebabkan stack overflow.`,
    },
    {
      icon: Scale,
      title: "Perbandingan Analisis",
      content: `Faktor-faktor yang mempengaruhi performa:
      
      1. Overhead function call (rekursif lebih lambat)
      2. Memory allocation untuk call stack
      3. Cache efficiency (iteratif lebih baik)
      4. Compiler optimization
      
      Rekomendasi:
      • Gunakan iteratif untuk production code
      • Rekursif berguna untuk pemahaman konsep
      • Tail recursion dapat dioptimasi oleh compiler tertentu`,
    },
    {
      icon: Lightbulb,
      title: "Interpretasi Grafik",
      content: `Dari grafik perbandingan running time:
      
      • Kedua kurva menunjukkan pertumbuhan linear O(n)
      • Algoritma iteratif konsisten lebih cepat
      • Gap semakin besar seiring bertambahnya n
      • Pada n = 10000, perbedaan signifikan terlihat jelas
      
      Kesimpulan:
      Untuk aplikasi praktis yang membutuhkan performa optimal, algoritma iteratif adalah pilihan yang lebih baik.`,
    },
  ];

  return (
    <section id="documentation" className="py-24 relative">
      <div className="gradient-orb-2 -left-32 bottom-1/4" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Dokumentasi</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Penjelasan lengkap tentang konsep, algoritma, dan analisis kompleksitas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover:border-blush/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-forest/50 flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-blush" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>
              <p className="text-mist/80 text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Formula Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card p-8 max-w-3xl mx-auto text-center"
        >
          <h3 className="text-blush font-semibold text-xl mb-6">Referensi Formula</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-forest/30">
              <p className="text-mist/70 text-sm mb-2">Rumus Deret Kuadrat</p>
              <p className="text-foreground font-mono text-lg">
                Σ i² = n(n+1)(2n+1) / 6
              </p>
            </div>
            <div className="p-4 rounded-xl bg-forest/30">
              <p className="text-mist/70 text-sm mb-2">Kompleksitas Waktu</p>
              <p className="text-foreground font-mono text-lg">
                T(n) = O(n)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationSection;
