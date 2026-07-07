"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import { Check, ArrowRight } from "lucide-react";

interface StageTransformationProps {
  dict: DictShape;
}

export default function StageTransformation({ dict }: StageTransformationProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-neutral-900 text-white overflow-hidden z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand/10 opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 z-10 flex flex-col items-center text-center">
        
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-light text-sm tracking-widest uppercase mb-8">
          7 Jours
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-light leading-tight tracking-tight mb-16 max-w-4xl text-balance">
          {dict.transformation.title.replace("en seulement 7 jours.", "")}
          <span className="text-brand font-medium"> en seulement 7 jours.</span>
        </h2>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-20">
          {dict.transformation.points.map((point, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-lg font-light backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-brand-light" />
              </div>
              <span className="text-neutral-200">{point}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,165,0,0.3)]">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              {dict.ctas.primary1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="px-8 py-4 text-lg font-medium text-neutral-300 hover:text-white transition-colors underline-offset-4 hover:underline">
            {dict.ctas.secondary1}
          </button>
        </div>

      </div>
    </section>
  );
}
