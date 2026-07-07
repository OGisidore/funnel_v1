"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { AlertCircle, ArrowUpRight, MessageCircleQuestion } from "lucide-react";

interface StagePainPointsProps {
  dict: DictShape;
}

export default function StagePainPoints({ dict }: StagePainPointsProps) {
  const icons = [MessageCircleQuestion, AlertCircle, ArrowUpRight];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Intro */}
        <div className="mb-16 text-center sm:text-left">
          <h2 className="text-3xl! sm:text-5xl! text-brand! font-bold! tracking-wide! mb-4!">
            {dict.painPoints.intro}
          </h2>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {dict.painPoints.points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="group relative bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Subtle gradient hover effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
                
                <Icon className="w-10 h-10 text-brand mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                
                <h3 className="text-xl sm:text-2xl font-light leading-snug text-neutral-800 group-hover:text-neutral-950 transition-colors">
                  {point}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Communication Asset Section (Page 3) */}
        <div className="mt-32 lg:mt-48 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1] tracking-tight mb-12">
            <RevealText text={dict.communicationAsset.text1} baseDelay={100} wordDelay={50} />
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-xl sm:text-2xl text-neutral-500 font-light">
            <p className="relative pl-6 border-l border-brand/30">
              {dict.communicationAsset.text2}
            </p>
            <p className="relative pl-6 border-l-2 border-brand text-neutral-900 font-medium">
              {dict.communicationAsset.text3}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
