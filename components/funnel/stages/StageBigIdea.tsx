"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";
import { ArrowRight, Calendar } from "lucide-react";

interface StageBigIdeaProps {
  dict: DictShape;
}

export default function StageBigIdea({ dict }: StageBigIdeaProps) {
  return (
    <section className="relative w-full pt-24 lg:pt-32 pb-12 bg-neutral-950 text-white overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* La Grande Idée (Page 20) */}
        <div className="mb-32">
          <p className="text-xl sm:text-2xl text-brand font-medium tracking-wide mb-8 uppercase text-center sm:text-left">
            {dict.bigIdea.title}
          </p>
          
          <div className="max-w-4xl mx-auto sm:mx-0 text-3xl sm:text-4xl lg:text-5xl font-display font-light leading-tight mb-16 text-center sm:text-left text-balance">
            {dict.bigIdea.decideBefore}
            <span className="block mt-2 text-brand-light font-medium italic">
              {dict.bigIdea.longBefore}
            </span>
          </div>

          <div className="max-w-4xl mx-auto sm:mx-0 mb-16 text-xl sm:text-2xl text-neutral-400 font-light text-center sm:text-left">
            <RevealText text={dict.bigIdea.communicationCreates} baseDelay={100} wordDelay={50} />
          </div>

          <div className="max-w-4xl mx-auto sm:mx-0 mb-20 text-center sm:text-left">
            <p className="text-xl text-neutral-500 mb-6">{dict.bigIdea.perceptionInfluences}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              {dict.bigIdea.influences.map((item, index) => (
                <div key={index} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-lg text-neutral-200">
                  {item.replace(',', '')}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto sm:mx-0 text-center sm:text-left border-l-2 border-brand pl-6 sm:pl-10 py-2">
            <p className="text-2xl sm:text-3xl font-light text-neutral-300 mb-8">
              {dict.bigIdea.whenCommunicationReflects}
            </p>
            <div className="space-y-4">
              {dict.bigIdea.changes.map((change, index) => (
                <div key={index} className="text-3xl sm:text-4xl lg:text-5xl font-display text-white">
                  {change}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA (Page 21) */}
        <div className="max-w-4xl mx-auto text-center mb-32 pt-16 border-t border-white/10">
          <h2 className="text-sm font-medium tracking-[0.2em] text-neutral-500 uppercase mb-12">
            CTA Final
          </h2>
          
          <div className="flex flex-col items-center justify-center gap-8">
            <button className="group relative inline-flex items-center justify-center px-10 sm:px-14 py-6 text-xl sm:text-2xl font-bold text-white bg-brand rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-[0_0_50px_rgba(255,165,0,0.4)] w-full sm:w-auto">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center gap-3">
                {dict.ctas.primary1}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <div className="text-neutral-500 font-light italic">ou</div>
            
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-neutral-300 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:text-white transition-colors duration-300 w-full sm:w-auto">
              <span className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-neutral-400 group-hover:text-brand-light transition-colors" />
                {dict.ctas.reserveMasterclass}
              </span>
            </button>
          </div>
        </div>

        {/* Footer (Page 22) */}
        <div className="text-center pt-16 border-t border-white/10">
          <h3 className="text-2xl sm:text-3xl font-display text-white mb-2 tracking-wide">
            {dict.footer.title}
          </h3>
          <p className="text-brand-light font-medium mb-6">
            {dict.footer.subtitle}
          </p>
          <p className="text-sm text-neutral-500 tracking-widest uppercase">
            {dict.footer.tagline}
          </p>
        </div>

      </div>
    </section>
  );
}
