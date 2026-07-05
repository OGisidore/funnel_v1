import RevealText from "@/components/ui/RevealText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper p-8 gap-16">
      <RevealText
        text="Certaines conversations changent le destin d'une entreprise."
        className="text-4xl font-display font-light text-ink max-w-xl text-center"
        baseDelay={300}
        wordDelay={100}
      />
      <ScrollIndicator delay={2000} />
    </div>
  );
}
