"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { ArrowRight, Play } from "lucide-react";

interface StagePreparationProps {
  dict: DictShape;
}

export default function StagePreparation({ dict }: StagePreparationProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Worth Section (Page 6) */}
        <div className="max-w-5xl mx-auto text-center mb-32">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight mb-6">
            {dict.worth.title}
          </h2>
          <p className="text-2xl sm:text-4xl text-neutral-500 font-light max-w-3xl mx-auto">
            <RevealText text={dict.worth.subtitle} baseDelay={100} wordDelay={50} />
          </p>
        </div>

        {/* Preparation Grid (Page 7) */}
        <div className="max-w-5xl mx-auto bg-neutral-50 rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-neutral-200/60 shadow-sm relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <h3 className="text-3xl sm:text-4xl font-display font-light text-neutral-900 mb-12 uppercase tracking-wide">
            À quoi vous préparez-vous ?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 relative z-10">
            {dict.preparingFor.options.map((option, index) => (
              <div 
                key={index}
                className="group flex items-center p-5 rounded-2xl bg-white border border-neutral-200 hover:border-brand/30 hover:shadow-[0_8px_30px_rgba(255,165,0,0.1)] transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center mr-4 group-hover:bg-brand/10 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-3 h-3 text-neutral-400 group-hover:text-brand fill-current" />
                </div>
                <span className="text-lg font-light text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  {option}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center relative z-10">
            <button className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-lg font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center gap-3">
                {dict.ctas.nextExecutiveMoment}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
