"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { ArrowRight, Check, X } from "lucide-react";

interface StageSprintProps {
  dict: DictShape;
}

export default function StageSprint({ dict }: StageSprintProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Sprint Intro (Page 14) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight mb-8">
              {dict.sprint.title}
            </h2>
            <div className="text-3xl sm:text-4xl font-light text-neutral-800 mb-8">
              <span className="font-medium">{dict.sprint.days}</span> {dict.sprint.objective}
            </div>
            <p className="text-xl sm:text-2xl text-neutral-500 font-light mb-12">
              <RevealText text={dict.sprint.increase} baseDelay={100} wordDelay={50} />
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-lg text-neutral-400">
                <X className="w-6 h-6" /> {dict.sprint.notCoaching}
              </div>
              <div className="flex items-center gap-4 text-lg text-neutral-400">
                <X className="w-6 h-6" /> {dict.sprint.notTraining}
              </div>
              <div className="flex items-center gap-4 text-xl font-medium text-brand mt-6">
                <Check className="w-6 h-6" /> {dict.sprint.transformation}
              </div>
            </div>
          </div>
          
          {/* Deliverables (Page 15) */}
          <div className="w-full lg:w-1/2 bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200">
            <h3 className="text-2xl sm:text-3xl font-display text-neutral-800 mb-8">
              {dict.sprint.leaveWith} :
            </h3>
            <div className="space-y-5">
              {dict.sprint.deliverables.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3.5 h-3.5 text-brand" />
                  </div>
                  <span className="text-lg sm:text-xl font-light text-neutral-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment (Page 16) */}
        <div className="max-w-4xl mx-auto bg-brand text-white rounded-[3rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
            
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl sm:text-3xl font-light mb-6 opacity-90 uppercase tracking-widest">
                {dict.investment.title}
              </h3>
              <div className="text-4xl sm:text-5xl font-display line-through opacity-60 mb-10">
                {dict.investment.fullPrice}
              </div>
              
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-xl font-medium text-[#FFD700] mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  {dict.investment.bonusTitle}
                </h4>
                <p className="text-white/80 font-light mb-4">
                  {dict.investment.bonusText}
                </p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  {dict.investment.receiveCredit}
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
              <div className="mb-4 text-lg font-light opacity-90">
                {dict.investment.yourInvestmentLabel} :
              </div>
              <div className="text-6xl sm:text-7xl font-display font-medium mb-12">
                {dict.investment.yourInvestmentPrice}
              </div>
              
              <button className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-5 text-lg sm:text-xl font-bold text-brand bg-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-brand/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative z-10 flex items-center gap-3">
                  {dict.ctas.applySprint}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
