"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { Activity, BarChart, ChevronRight, Crown, Lightbulb, MessageSquare, Mic, Star, TrendingUp, User } from "lucide-react";

interface StageAssessmentProps {
  dict: DictShape;
}

export default function StageAssessment({ dict }: StageAssessmentProps) {
  const stepIcons = [Mic, Activity, TrendingUp];
  const deliverableIcons = [Star, User, Crown, MessageSquare, BarChart, Lightbulb];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-white text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight mb-8 uppercase">
            Executive Communication Assessment™
          </h2>
          <div className="text-xl sm:text-3xl text-neutral-500 font-light leading-relaxed">
            <p className="mb-2">{dict.assessment.subtitle}</p>
            <p>avant même que vous terminiez votre présentation.</p>
          </div>
        </div>

        {/* Steps (Enregistrer, Analyser, Améliorer) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mb-32 relative">
          {/* Connecting line for desktop */}
          <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-0.5 bg-neutral-200 -z-10" />

          {dict.assessment.steps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={index} className="flex flex-col items-center relative z-10 sm:w-1/3">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-[3px] border-brand flex items-center justify-center shadow-lg mb-6 group hover:bg-brand transition-colors duration-500 cursor-pointer">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-brand group-hover:text-white transition-colors duration-500" />
                </div>
                <span className="text-xl sm:text-2xl font-display text-neutral-800">
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Deliverables Bento Grid */}
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-light text-neutral-800 mb-10">
            <RevealText text={dict.assessment.receiveInstantly + " :"} baseDelay={100} wordDelay={50} />
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {dict.assessment.deliverables.map((deliverable, index) => {
              const Icon = deliverableIcons[index];
              return (
                <div 
                  key={index}
                  className="flex items-center p-6 sm:p-8 rounded-2xl bg-neutral-100/50 hover:bg-neutral-100 transition-colors border border-transparent hover:border-neutral-200"
                >
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mr-6 shrink-0">
                    <Icon className="w-6 h-6 text-brand" />
                  </div>
                  <span className="text-lg sm:text-xl font-light text-neutral-800">
                    {deliverable}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex">
          <button className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-lg font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative z-10 flex items-center gap-3">
              {dict.ctas.discoverScore}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
