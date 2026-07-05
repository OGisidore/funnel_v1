import RevealText from "@/components/ui/RevealText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { stage1Content } from "@/lib/mock-data";

export default function StageArrivee() {
  const { headline, subline } = stage1Content;

  // Durée estimée de l'animation headline (nb_mots × 100ms + 300ms base)
  const wordCount = headline.split(" ").length;
  const sublineDelay = 300 + wordCount * 100 + 400;

  return (
    <section
      id="stage-arrivee"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-paper"
      aria-label="Arrivée"
    >
      {/* Zone de contenu centré — max 640px pour respirer */}
      <div className="max-w-[640px] w-full flex flex-col items-center text-center gap-8">
        {/* Headline — police éditoriale, fine, grande */}
        <h1 className="font-display font-light text-[2.6rem] leading-[1.2] tracking-[-0.01em] text-ink sm:text-[3.25rem]">
          <RevealText
            text={headline}
            baseDelay={300}
            wordDelay={100}
          />
        </h1>

        {/* Subline — Geist, muted, taille modérée */}
        <p className="font-sans text-lg leading-relaxed text-muted max-w-sm">
          <RevealText
            text={subline}
            baseDelay={sublineDelay}
            wordDelay={70}
          />
        </p>
      </div>

      {/* Scroll indicator — ancré en bas de la section */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <ScrollIndicator delay={3500} />
      </div>
    </section>
  );
}
