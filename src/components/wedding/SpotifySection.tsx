import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Music } from "lucide-react";

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
          className="font-display text-xl font-light italic mb-8"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
        Cada canción cuenta: ¡sube la tuya y celebremos juntos!
        </p>

      <div className="wedding-card text-center">
        <Music className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />

        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-s tracking-wider uppercase transition-all duration-300 hover:scale-105 bg-gray-300 text-gray-500 border-none"
          disabled
          /*style={{
            background: "hsl(var(--wedding-gold))",
            color: "#fff",
          }}*/>{/*<a href="https://open.spotify.com/playlist/0HUG2onSFHYNkfETzW7KOn?si=51bb33f498a84cd7" target="_blank" rel="noopener noreferrer" >*/}
            Próximamente...
            {/*</a>*/}</button>
      </div>

      </ScrollReveal>
    </section>
  );

};

export default SpotifySection;
