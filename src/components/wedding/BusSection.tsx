import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { Bus, Frown } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

type BusOption = "ida" | "vuelta" | "ambos" | null;

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzo4YFFrg3ZNi6bAOur16H7tqX_mJrSRyu6ySkoygs9D59rXRMZpXC5XTkDEDHWIcRg/exec";

const BusSection = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [busOption, setBusOption] = useState<BusOption>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [busError, setBusError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !apellido || !busOption) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true);
    setBusError("");

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          formType: "bus",
          nombre,
          apellido,
          trayecto: busOption,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        if (result.error === "DUPLICATED DATA") {
          setSubmitted(true);
          setBusError("Tus datos ya han sido guardados con anterioridad. Contacta con los anfitriones. Disculpa las molestias");
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
      toast.success("¡Plaza reservada con éxito!");
    } catch (error) {
      toast.error("Hubo un error. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="wedding-section" style={{ background: "hsl(var(--card))" }}>
      <ScrollReveal className="w-full max-w-lg mx-auto text-center">
        <p className="wedding-text mb-4">Transporte</p>
        <h2 className="wedding-heading mb-2">Servicio de Bus</h2>
        <div className="wedding-divider" />
        <p
          className="font-display text-xl font-light italic mb-8"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Pondremos un autobús a vuestra disposición.
          <br></br>
          Indicadnos si lo necesitaréis.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="wedding-card text-left space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-s tracking-widest uppercase mb-2"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}
                >
                  Nombre*
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="wedding-input"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-s tracking-widest uppercase mb-2"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}
                >
                  Apellido*
                </label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="wedding-input"
                  required
                />
              </div>
            </div>

            <div>
              <label
                className="block text-s tracking-widest uppercase mb-3"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}
              >
                ¿Qué trayecto necesitas?*
              </label>
              <div className="space-y-3">
                {([
                  { value: "ida", label: "Solo ida" },
                  { value: "vuelta", label: "Solo vuelta" },
                  { value: "ambos", label: "Ida y vuelta" },
                ] as const).map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-5 h-5 rounded border flex items-center justify-center transition-colors"
                      style={{
                        borderColor: busOption === option.value
                          ? "hsl(var(--wedding-gold))"
                          : "hsl(var(--border))",
                        background: busOption === option.value
                          ? "hsl(var(--wedding-gold))"
                          : "transparent",
                      }}
                      onClick={() =>
                        setBusOption(busOption === option.value ? null : option.value)
                      }
                    >
                      {busOption === option.value && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-s font-light"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--foreground))" }}
                      onClick={() =>
                        setBusOption(busOption === option.value ? null : option.value)
                      }
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className={`wedding-button w-full ${(!nombre.trim() || !apellido.trim() || !busOption) && !isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-none' : ''}`}
              disabled={isLoading || !nombre.trim() || !apellido.trim() || !busOption}
            >
              <Bus className="w-4 h-4 mr-2 inline" />
              {isLoading ? "Reservando..." : "Reservar plaza"}
            </button>
          </form>
        ) : (
          <><div className="wedding-card text-center">
              {!busError && (
              <><Bus className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />
              <p className="font-display text-xl font-medium mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  ¡Plaza reservada!
                </p><p className="text-s font-light" style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}>
                    Hemos registrado tu reserva de bus. ¡Gracias!
                  </p></>
              )}
              {busError && (
                <><Frown className="w-8 h-8 mx-auto mb-4" style={{ color: "hsl(var(--wedding-gold))" }} />
                <p className="font-display text-xl font-medium mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  ¡Ups!
                </p><p className="text-s font-light" style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}>
                    {busError}
                  </p></>
              )}
            </div><motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}>

                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="hsl(var(--wedding-gold))"
                  strokeWidth="1"
                  className="mx-auto"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}>
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </motion.svg>

              </motion.div></>
        )}
      </ScrollReveal>
    </section>
  );
};

export default BusSection;
