"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { BrainCircuit, Fingerprint, Gauge, LineChart, MessageSquareText, Presentation } from "lucide-react";

interface StageMethodologyProps {
  dict: DictShape;
}

export default function StageMethodology({ dict }: StageMethodologyProps) {
  const featureIcons = [BrainCircuit, Fingerprint, MessageSquareText, Presentation, Gauge, LineChart];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-neutral-50 text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-20 text-center sm:text-left mx-auto sm:mx-0">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight mb-8 uppercase">
            {dict.whyIsidore.title}
          </h2>
          <div className="text-xl sm:text-3xl text-neutral-500 font-light leading-relaxed space-y-4">
            <p>{dict.whyIsidore.dontTeach}</p>
            <p className="text-neutral-800 font-medium">{dict.whyIsidore.buildAssets}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-5xl">
          <h3 className="text-xl sm:text-2xl font-light text-neutral-500 mb-10">
            <RevealText text={dict.whyIsidore.poweredBy + " :"} baseDelay={100} wordDelay={50} />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.whyIsidore.features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div 
                  key={index}
                  className="group flex flex-col p-8 rounded-3xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6 group-hover:bg-brand transition-colors duration-300">
                    <Icon className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-medium text-neutral-800 group-hover:text-brand transition-colors">
                    {feature}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
