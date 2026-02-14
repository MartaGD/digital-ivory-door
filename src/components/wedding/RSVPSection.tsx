import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";

const dietaryOptions = [
  "Vegetariano",
  "Vegano",
  "Sin gluten",
  "Sin lactosa",
  "Alergia a frutos secos",
  "Otra",
];

const RSVPSection = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dietas, setDietas] = useState<string[]>([]);
  const [otraDieta, setOtraDieta] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleDieta = (d: string) => {
    setDietas((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      toast.error("Por favor, completa nombre y apellido.");
      return;
    }
    setSubmitted(true);
    toast.success("¡Gracias por confirmar tu asistencia!");
  };

  if (submitted) {
    return (
      <section className="wedding-section">
        <ScrollReveal className="text-center">
          <p className="wedding-text mb-4">Confirmado</p>
          <h2 className="wedding-heading mb-2">¡Gracias!</h2>
          <div className="wedding-divider" />
          <p className="font-display text-xl font-light italic" style={{ color: "hsl(var(--muted-foreground))" }}>
            {nombre} {apellido}, te esperamos con mucha ilusión.
          </p>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section className="wedding-section">
      <ScrollReveal className="w-full max-w-lg mx-auto text-center">
        <p className="wedding-text mb-4">Confirma tu asistencia</p>
        <h2 className="wedding-heading mb-2">¿Nos acompañas?</h2>
        <div className="wedding-divider" />

        <form onSubmit={handleSubmit} className="wedding-card space-y-5 text-left">
          <div>
            <label className="wedding-text text-xs block mb-2">Nombre</label>
            <input
              type="text"
              className="wedding-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="wedding-text text-xs block mb-2">Apellido</label>
            <input
              type="text"
              className="wedding-input"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Tu apellido"
            />
          </div>

          <div>
            <label className="wedding-text text-xs block mb-3">Dietas especiales</label>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className="w-4 h-4 rounded-sm border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: dietas.includes(option)
                        ? "hsl(var(--wedding-gold))"
                        : "hsl(var(--border))",
                      background: dietas.includes(option)
                        ? "hsl(var(--wedding-gold))"
                        : "transparent",
                    }}
                    onClick={() => toggleDieta(option)}
                  >
                    {dietas.includes(option) && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-sm font-light"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--foreground))" }}
                    onClick={() => toggleDieta(option)}
                  >
                    {option}
                  </span>
                </label>
              ))}
            </div>
            {dietas.includes("Otra") && (
              <input
                type="text"
                className="wedding-input mt-3"
                value={otraDieta}
                onChange={(e) => setOtraDieta(e.target.value)}
                placeholder="Especifica tu dieta"
              />
            )}
          </div>

          <button type="submit" className="wedding-button w-full">
            Confirmar asistencia
          </button>
        </form>
      </ScrollReveal>
    </section>
  );
};

export default RSVPSection;
