import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react";
import { generateSteps, StepData } from "@/lib/algorithms";

const VisualizationSection = () => {
  const [n, setN] = useState(8);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [steps, setSteps] = useState<StepData[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSteps(generateSteps(n));
    setCurrentStep(-1);
    setIsPlaying(false);
  }, [n]);

  const stopAnimation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    stopAnimation();
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          stopAnimation();
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);
  }, [steps.length, speed, stopAnimation]);

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return stopAnimation;
  }, [isPlaying, speed, startAnimation, stopAnimation]);

  const handlePlayPause = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(-1);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <section id="visualization" className="py-24 relative overflow-hidden">
      <div className="gradient-orb-1 -right-32 top-1/4" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Visualisasi Step-by-Step</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Lihat proses perhitungan deret bilangan kuadrat secara visual
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Controls */}
            <div className="glass-card p-6 md:col-span-1">
              <h3 className="text-blush font-semibold mb-4">Kontrol Animasi</h3>
              
              <div className="space-y-4">
              <div>
                  <label className="text-mist/70 text-sm block mb-2">Nilai n:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={n}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val >= 1 && val <= 20) {
                        setN(val);
                      }
                    }}
                    disabled={isPlaying}
                    className="w-full px-4 py-2 rounded-xl bg-emerald/50 border border-mist/20 text-foreground font-mono text-center focus:outline-none focus:border-blush"
                  />
                  <p className="text-mist/50 text-xs mt-1">Min: 1, Max: 20</p>
                </div>

                <div>
                  <label className="text-mist/70 text-sm block mb-2">Kecepatan:</label>
                  <div className="flex gap-2">
                    {[0.5, 1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          speed === s
                            ? "bg-blush text-emerald"
                            : "bg-mist/10 text-mist hover:bg-mist/20"
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button onClick={handlePlayPause} className="anim-control flex-1">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button onClick={handleStepForward} className="anim-control flex-1" disabled={isPlaying}>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button onClick={handleReset} className="anim-control flex-1">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Current calculation */}
              <AnimatePresence mode="wait">
                {currentStepData && (
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 rounded-xl bg-forest/50"
                  >
                    <p className="text-mist/70 text-sm">Langkah {currentStepData.step}:</p>
                    <p className="text-foreground font-mono text-lg mt-1">
                      {currentStepData.value}² = <span className="text-blush">{currentStepData.squared}</span>
                    </p>
                    <p className="text-mist/70 text-sm mt-2">Total sementara:</p>
                    <p className="text-blush font-bold text-xl">{currentStepData.currentSum}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Visualization */}
            <div className="glass-card p-6 md:col-span-2">
              <h3 className="text-blush font-semibold mb-6">Deret Angka 1..{n}</h3>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {steps.map((step, idx) => (
                  <motion.div
                    key={step.step}
                    className={`vis-box ${idx <= currentStep ? "active" : ""}`}
                    animate={
                      idx === currentStep
                        ? { scale: [1, 1.15, 1.15], boxShadow: ["0 0 0px hsla(0 36% 81% / 0)", "0 0 30px hsla(0 36% 81% / 0.5)", "0 0 30px hsla(0 36% 81% / 0.5)"] }
                        : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {step.value}
                  </motion.div>
                ))}
              </div>

              {/* Process visualization */}
              <div className="border-t border-mist/10 pt-6">
                <h4 className="text-mist/70 text-sm mb-4">Proses Perhitungan:</h4>
                <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
                  {steps.map((step, idx) => (
                    <span
                      key={step.step}
                      className={`transition-all duration-300 ${
                        idx <= currentStep ? "text-blush" : "text-mist/30"
                      }`}
                    >
                      {step.value}²{idx < steps.length - 1 && <span className="text-mist/50"> + </span>}
                    </span>
                  ))}
                  <span className="text-mist/50 mx-2">=</span>
                  <span className="text-blush font-bold text-lg">
                    {currentStepData?.currentSum || 0}
                  </span>
                </div>
              </div>

              {/* Sequence display */}
              <div className="mt-6 p-4 rounded-xl bg-emerald/30">
                <h4 className="text-mist/70 text-sm mb-2">Deret Bilangan Kuadrat:</h4>
                <div className="flex flex-wrap gap-2 font-mono text-sm">
                  {steps.slice(0, currentStep + 1).map((step, idx) => (
                    <motion.span
                      key={step.step}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 rounded-lg bg-blush/20 text-blush"
                    >
                      {step.squared}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisualizationSection;
