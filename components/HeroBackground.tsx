import { NeuralField } from "./NeuralField";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-space-radial" />
      <div className="absolute left-1/2 top-[-18%] h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-avnox-accent/20 blur-[140px] animate-drift" />
      <div className="absolute bottom-[-30%] left-[10%] h-[45%] w-[50%] rounded-full bg-avnox-hot/15 blur-[130px] animate-pulse-soft" />
      <NeuralField />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-avnox-ink to-transparent" />
    </div>
  );
}
