import ScrollReveal from "./ScrollReveal";
import { MapPin, Clock, Calendar } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="wedding-section" style={{ background: "hsl(var(--card))" }}>
      <ScrollReveal className="w-full max-w-3xl mx-auto text-center">
        <p className="wedding-text mb-4">Celebración</p>
        <h2 className="wedding-heading mb-2">La Ceremonia</h2>
        <div className="wedding-divider" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />
            <p className="wedding-text text-xs">21 de Junio de 2025</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />
            <p className="wedding-text text-xs">17:00 horas</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />
            <p className="wedding-text text-xs">Masía Can Riera</p>
          </div>
        </div>

        <p className="font-display text-lg md:text-xl font-light italic mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
          Masía Can Riera, Carrer de la Font, s/n, 08391 Tiana, Barcelona
        </p>

        {/* Google Maps placeholder */}
        <div
          className="w-full aspect-video rounded-lg overflow-hidden"
          style={{ border: "1px solid hsl(var(--wedding-gold-light))" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.6!2d2.2!3d41.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDI0JzAwLjAiTiAywrAxMicwMC4wIkU!5e0!3m2!1ses!2ses!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de la boda"
          />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default LocationSection;
