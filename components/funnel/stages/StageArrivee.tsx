import { DictShape } from "@/app/i18n/dictionaries/fr";
import { StarsBackground } from "@/components/reusable/background/star";
import RevealText from "@/components/ui/RevealText";

interface StageArriveeProps {
  dict: DictShape;
}

export default function StageArrivee({ dict }: StageArriveeProps) {
  const { title, subtitle, question, roles } = dict.hero;

  // Words to highlight based on language (supports both EN and FR)
  const highlightWords = ["perçoit-elle", "votre", "expertise", "perceive", "your"];

  return (
    <section
      id="stage-arrivee"
      className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 overflow-hidden"
      aria-label="Arrivée"
    >
      <StarsBackground className="absolute inset-0 z-0" />

      <div className="max-w-8xl w-full h-[80vh] flex flex-col  justify-center text-center gap-12 relative z-10">

        {/* Header / Top Left */}
        <div className="absolute top-8 left-6 sm:left-12 flex flex-col items-start gap-1 z-20">
          <div className="text-brand font-medium tracking-widest uppercase text-sm sm:text-base">
            {title}
          </div>
          <div className="text-muted-foreground font-light tracking-[0.15em] uppercase text-xs sm:text-sm">
            {subtitle}
          </div>
        </div>
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Hook */}
          <h1 className="font-display! font-light! text-[2.5rem]! leading-[1.2]! tracking-[-0.02em]! sm:text-[4rem]!">
          <RevealText
              text={question}
            baseDelay={300}
            wordDelay={100}
              highlightWords={highlightWords}
              highlightClassName="text-brand font-medium"
          />
          </h1>        

          {/* Roles */}
          <div className="flex flex-wrap justify-center gap-6 text-muted-foreground font-light text-lg sm:text-xl mt-4">
            <RevealText
              text={roles.join("  •  ")}
              baseDelay={1000}
              wordDelay={100}
            />
          </div>
        </div>


      </div>
    </section>
  );
}
