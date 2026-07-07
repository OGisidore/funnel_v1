"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { Crown, Magnet, ShieldCheck, Sparkles, Target } from "lucide-react";

interface StageDecisionProps {
  dict: DictShape;
}

export default function StageDecision({ dict }: StageDecisionProps) {
  const icons = [ShieldCheck, Crown, Magnet, Target, Sparkles];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-neutral-50 text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-display font-light leading-tight tracking-tight text-neutral-900 mb-6 uppercase text-balance">
            {dict.decisionStart.title}
          </h2>
          <p className="text-xl sm:text-2xl text-neutral-500 font-light">
            <RevealText text={dict.decisionStart.subtitle} baseDelay={100} wordDelay={50} />
          </p>
        </div>

        {/* 5 Items Grid (3 on top, 2 centered on bottom for large screens) */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {dict.decisionStart.shapes.map((shape, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index}
                className="group relative flex items-center gap-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center group-hover:bg-brand transition-colors duration-300">
                  <Icon className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-lg font-medium text-neutral-800">
                  {shape}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
