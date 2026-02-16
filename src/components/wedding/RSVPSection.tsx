import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const dietaryOptions = [
  "Vegetariano",
  "Vegano",
  "Otra/Alergias(lactosa, gluten, frutos secos, etc.)",
];

// Reemplaza esto con la URL de tu Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxSrIuBUNFX2N01z9TLt--YiipALv7zeK5Y29T_pousOerA63vkWQkkpIIhav6B0wGt/exec";

const RSVPSection = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dietas, setDietas] = useState<string[]>([]);
  const [otraDieta, setOtraDieta] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDieta = (d: string) => {
    setDietas((prev) => {
      if (prev.includes(d)) {
        // Si ya está seleccionado, lo quitamos
        return prev.filter((x) => x !== d);
      } else {
        // Si no está seleccionado, lo añadimos
        // Si es Vegano y Vegetariano está seleccionado, lo quitamos
        if (d === "Vegano" && prev.includes("Vegetariano")) {
          return prev.filter((x) => x !== "Vegetariano").concat(d);
        }
        // Si es Vegetariano y Vegano está seleccionado, lo quitamos
        if (d === "Vegetariano" && prev.includes("Vegano")) {
          return prev.filter((x) => x !== "Vegano").concat(d);
        }
        return [...prev, d];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      toast.error("Por favor, completa nombre y apellido.");
      return;
    }

    setIsLoading(true);

    try {
      // Preparar los datos - transformar "Otra/Alergias(...)" a solo "Otra/Alergias"
      const dietasText = dietas
        .map((d) => d.includes("Otra/Alergias") ? "Otra/Alergias" : d)
        .join(", ");

      // Enviar a Google Apps Script
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          nombre: nombre,
          apellido: apellido,
          dietas: dietasText,
          alergias: otraDieta,
        }),
      });

      // Con no-cors no podemos leer la respuesta, así que asumimos éxito si el fetch se completa
      setSubmitted(true);
      toast.success("¡Gracias por confirmar tu asistencia!");
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="wedding-section">
      <ScrollReveal className="text-center">
        <p className="wedding-text mb-4">Confirma tu asistencia</p>
        <h2 className="wedding-heading mb-2">¿Nos acompañas?</h2>
        <div className="wedding-divider" />
        <p
          className="font-display text-lg font-light italic mb-8"
          style={{ color: "hsl(var(--muted-foreground))" }}         >
          Tu respuesta nos ayuda a preparar la celebración perfecta.
        </p>

      {!submitted ? (
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
            {dietas.some((d) => d.includes("Otra/Alergias")) && (
              <input
                type="text"
                className="wedding-input mt-3"
                value={otraDieta}
                onChange={(e) => setOtraDieta(e.target.value)}
                placeholder="Especifica tu alergia o dieta especial"
              />
            )}
          </div>

          <button type="submit" className="wedding-button w-full" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Confirmar asistencia"}
          </button>
        </form>
      ) : (
          <><div className="wedding-card text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />
              <p className="wedding-heading mb-2">¡Gracias!</p>
              <div className="wedding-divider" />
              <p className="font-display text-xl font-light italic" style={{ color: "hsl(var(--muted-foreground))" }}>
                {nombre} {apellido}, te esperamos con mucha ilusión.
              </p>
            </div><motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(var(--wedding-gold))"
                  strokeWidth="1"
                  className="mx-auto"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </motion.svg>
              </motion.div></>
        )}
        
      </ScrollReveal>
    </section>
  );
};

export default RSVPSection;
