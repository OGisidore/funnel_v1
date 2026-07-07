"use client";

import { DictShape } from "@/app/i18n/dictionaries/fr";
import RevealText from "@/components/ui/RevealText";

interface StageProblemProps {
  dict: DictShape;
}

export default function StageProblem({ dict }: StageProblemProps) {
  const steps = [
    { title: dict.confidence.confidenceTitle, desc: dict.confidence.confidenceText },
    { title: dict.confidence.influenceTitle, desc: dict.confidence.influenceText },
    { title: dict.confidence.decisionTitle, desc: dict.confidence.decisionText },
  ];

  return (
    <section className="relative w-full py-24 lg:py-32 bg-neutral-50 text-neutral-900 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Le Vrai Problème (Page 11) */}
        <div className="max-w-4xl mb-32">
          <p className="text-xl sm:text-2xl text-brand font-medium tracking-wide mb-6 uppercase">
            Le Vrai Problème
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-light text-neutral-900 leading-tight tracking-tight mb-10">
            {dict.confidence.title}
          </h2>
          <p className="text-2xl sm:text-4xl text-neutral-500 font-light max-w-2xl">
            <RevealText text={dict.confidence.subtitle} baseDelay={200} wordDelay={50} />
          </p>
        </div>

        {/* Path / Timeline (Page 12) */}
        <div className="relative max-w-5xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center w-full md:w-1/3 relative group">
                {/* Visual Node */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border border-brand/20 shadow-md flex items-center justify-center mb-6 relative z-20 group-hover:bg-brand transition-colors duration-500">
                  <span className="text-xl sm:text-2xl font-light text-brand group-hover:text-white transition-colors duration-500">
                    0{index + 1}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-display text-neutral-800 mb-4 group-hover:text-brand transition-colors">
                  {step.title}
                </h3>
                <p className="text-lg text-neutral-500 font-light max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand/10 via-brand/50 to-brand/10 z-0" />
        </div>

        {/* Footer Statement (Page 13) */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-brand leading-tight tracking-tight">
            <RevealText text={dict.confidence.footer} baseDelay={300} wordDelay={80} />
          </h2>
        </div>

      </div>
    </section>
  );
}
