"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { ProcessStep } from "@/lib/strapi/types";

interface ProcessProps {
  data?: ProcessStep[];
}

const defaultProcessSteps = [
  {
    id: 1,
    stepNumber: "01",
    title: "Paddy Inspection & Cleaning",
    description: "Raw paddy is carefully inspected for moisture content, grain integrity, and foreign materials. It is then cleaned using modern equipment to remove dust, husks, stones, and impurities before entering the milling stage.",
    order: 1,
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Milling & Polishing",
    description: "The cleaned paddy undergoes de-husking and whitening processes. Multiple polishing stages ensure consistent grain appearance and remove bran layers to meet export specifications.",
    order: 2,
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Grading & Sorting",
    description: "Advanced color sorters and grading machines separate rice by size, color, and quality. This ensures only premium grains meeting international standards proceed to packaging.",
    order: 3,
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Packaging & Export",
    description: "Final products are packaged in food-grade materials with proper labeling for traceability. Containers are loaded following international shipping protocols for global delivery.",
    order: 4,
  },
];

export function Process({ data }: ProcessProps = {}) {
  const [activeStep, setActiveStep] = useState(0);
  // Use fallback if data is undefined, null, or empty array
  const displaySteps = data && data.length > 0 ? data : defaultProcessSteps;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/process-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-white/30 text-sm text-white/70 mb-4">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Our Rice Processing System
            </h2>
            <p className="text-white/80 leading-relaxed">
              Our rice processing system follows structured and controlled
              stages to ensure consistent quality from paddy intake to final
              packaged export products.
            </p>
          </motion.div>

          {/* Right Side - Steps */}
          <div className="space-y-4">
            {displaySteps.map((step, index) => (
              <motion.div
                key={step.id || step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeStep === index
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-white/5 hover:bg-white/10"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-sm font-mono px-3 py-1 rounded-lg ${
                      activeStep === index
                        ? "bg-[#F5A623] text-foreground"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        activeStep === index ? "text-[#F5A623]" : "text-white/80"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <motion.p
                      initial={false}
                      animate={{
                        height: activeStep === index ? "auto" : 0,
                        opacity: activeStep === index ? 1 : 0,
                      }}
                      className="text-white/70 text-sm leading-relaxed overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
