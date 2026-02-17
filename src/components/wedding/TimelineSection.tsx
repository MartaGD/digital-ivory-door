import ScrollReveal from "./ScrollReveal";
import { Users, Church, Wine, UtensilsCrossed, Music, PartyPopper, HeartHandshake, Blend, Moon } from "lucide-react";

const events = [
  { time: "17:00h", title: "Llegada de invitados", icon: Users },
  { time: "17:30h", title: "Ceremonia", icon: Blend }, // HeartHandshake o Blend
  { time: "18:30h", title: "Aperitivo", icon: Wine },
  { time: "21:00h", title: "Banquete", icon: UtensilsCrossed },
  { time: "23:00h", title: "Baile", icon: Music },
  { time: "02:00h", title: "Fin de Fiesta", icon: Moon }, // PartyPopper o Bus o Moon
];

const TimelineSection = () => {
  return (
    <section
      className="wedding-section"
      style={{ background: "hsl(var(--secondary))" }}
    >
      <ScrollReveal className="w-full max-w-2xl mx-auto text-center">
        <p className="wedding-text mb-4">Programa</p>
        <h2 className="wedding-heading mb-2">Horario del día</h2>
        <div className="wedding-divider" />

        <div className="relative mt-12">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "hsl(var(--wedding-gold-light))" }}
          />

          <div className="space-y-10">
            {events.map((event, i) => {
              const Icon = event.icon;
              return (
                <div key={i} className="relative flex items-center">
                  {/* Dot with icon */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full z-10 flex items-center justify-center"
                    style={{
                      background: "hsl(var(--secondary))",
                      border: "2px solid hsl(var(--wedding-gold))",
                    }}
                  >
                    <Icon size={18} style={{ color: "hsl(var(--wedding-gold))" }} />
                  </div>

                  {/* Alternating layout */}
                  {i % 2 === 0 ? (
                    <>
                      <div className="w-1/2 pr-14 text-right">
                        <span
                          className="font-display text-xl md:text-2xl font-light italic"
                          style={{ color: "hsl(var(--foreground))" }}
                        >
                          {event.time}
                        </span>
                      </div>
                      <div className="w-1/2 pl-14 text-left">
                        <span
                          className="font-display text-xl md:text-xl font-semibold"
                          style={{ color: "hsl(var(--foreground))" }}
                        >
                          {event.title}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-14 text-right">
                        <span
                          className="font-display text-xl md:text-xl font-semibold"
                          style={{ color: "hsl(var(--foreground))" }}
                        >
                          {event.title}
                        </span>
                      </div>
                      <div className="w-1/2 pl-14 text-left">
                        <span
                          className="font-display text-xl md:text-2xl font-light italic"
                          style={{ color: "hsl(var(--foreground))" }}
                        >
                          {event.time}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TimelineSection;
