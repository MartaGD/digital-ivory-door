import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Bus } from "lucide-react";

type BusOption = "ida" | "vuelta" | "ambos" | null;

const SpotifySection = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [busOption, setBusOption] = useState<BusOption>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !apellido || !busOption) return;
    console.log({ nombre, apellido, busOption });
    setSubmitted(true);
  };

  return (
    <section className="wedding-section" style={{ background: "hsl(var(--background))" }}>
      <ScrollReveal className="w-full max-w-lg mx-auto text-center">
        <p className="wedding-text mb-4">Música</p>
        <h2 className="wedding-heading mb-2">Lista de Spotify</h2>
        <div className="wedding-divider" />
        <p
          className="font-display text-lg font-light italic mb-8"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
        Cada canción cuenta: ¡sube la tuya y celebremos juntos!
        </p>

      </ScrollReveal>
    </section>
  );

};

export default SpotifySection;
