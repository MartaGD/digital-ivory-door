import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CheckCircle, Frown } from "lucide-react";

const dietaryOptions = [
  "Vegetariano",
  "Vegano",
  "Otra/Alergias(lactosa, gluten, frutos secos, etc.)",
];

// Reemplaza esto con la URL de tu Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzo4YFFrg3ZNi6bAOur16H7tqX_mJrSRyu6ySkoygs9D59rXRMZpXC5XTkDEDHWIcRg/exec";

const RSVPSection = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dietas, setDietas] = useState<string[]>([]);
  const [otraDieta, setOtraDieta] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

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
    setRsvpError("");

    try {
      const dietasText = dietas
        .map((d) => d.includes("Otra/Alergias") ? "Otra/Alergias" : d)
        .join(", ");

      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          nombre,
          apellido,
          dietas: dietasText,
          alergias: otraDieta,
          formType: "rsvp",
        }),
      });

      const result = await response.json();
      if (!result.success) {
        if (result.error === "DUPLICATED DATA") {
          setSubmitted(true);
          setRsvpError("Tus datos ya han sido guardados con anterioridad. Contacta con los anfitriones. Disculpa las molestias");
          setIsLoading(false);
          return;
        }
        // Solo mostrar toast si el error no es el mensaje personalizado
        if (
          result.error &&
          result.error !== "DUPLICATED DATA") {
          toast.error(result.error || "Hubo un error. Intenta de nuevo.");
        }
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
      toast.success("¡Gracias por confirmar tu asistencia!");
    } catch (error) {
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
            <label className="wedding-text text-xs block mb-2">Nombre*</label>
            <input
              type="text"
              className="wedding-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="wedding-text text-xs block mb-2">Apellido*</label>
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

          <button
            type="submit"
            className={`wedding-button w-full ${(!nombre.trim() || !apellido.trim()) && !isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-none' : ''}`}
            disabled={isLoading || !nombre.trim() || !apellido.trim()}
          >
            {isLoading ? "Enviando..." : "Confirmar asistencia"}
          </button>
        </form>
      ) : (
        <div className="wedding-card text-center">
          {rsvpError ? (
            <>
              <Frown className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />
              <p className="font-display text-xl font-medium mb-2" style={{ color: "hsl(var(--foreground))" }}>
                ¡Ups!
              </p>
              <p className="text-sm font-light" style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}>
                {rsvpError}
              </p>
            </>
          ) : (
            <>
              <CheckCircle className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />
              <p className="wedding-heading mb-2">¡Gracias!</p>
              <div className="wedding-divider" />
              <p className="font-display text-xl font-light italic" style={{ color: "hsl(var(--muted-foreground))" }}>
                {nombre} {apellido}, te esperamos con mucha ilusión.
              </p>
            </>
          )}
          <motion.div
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
          </motion.div>
        </div>
      )}
        
      </ScrollReveal>
    </section>
  );
};

export default RSVPSection;
