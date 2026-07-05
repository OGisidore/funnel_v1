import RevealText from "@/components/ui/RevealText";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper p-8">
      <RevealText
        text="Certaines conversations changent le destin d'une entreprise."
        className="text-4xl font-display font-light text-ink"
        baseDelay={300}
        wordDelay={100}
      />
    </div>
  );
}
