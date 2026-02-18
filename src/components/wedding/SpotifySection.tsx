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
        {/* Google Maps placeholder 
        <a
          href="https://open.spotify.com/playlist/0HUG2onSFHYNkfETzW7KOn?si=51bb33f498a84cd7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-s tracking-wider uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: "hsl(var(--wedding-gold))",
            color: "#fff",
          }}
        >
          *
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Abrir Playlist
        </a>
        /*/}
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-s tracking-wider uppercase transition-all duration-300 hover:scale-105"
          disabled 
          style={{
            background: "hsl(var(--wedding-gold))",
            color: "#fff",
          }}>Próximamente...</button>
      </div>

      </ScrollReveal>
    </section>
  );

};

export default SpotifySection;
