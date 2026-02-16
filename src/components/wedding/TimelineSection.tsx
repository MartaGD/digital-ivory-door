import ScrollReveal from "./ScrollReveal";

const events = [
  { time: "17:00h", title: "Llegada de invitados" },
  { time: "17:30h", title: "Ceremonia" },
  { time: "18:30h", title: "Aperitivo" },
  { time: "21:00h", title: "Banquete" },
  { time: "23:00h", title: "Baile" },
  { time: "02:00h", title: "Fin de Fiesta" },
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
            {events.map((event, i) => (
              <div key={i} className="relative flex items-center">
                {/* Dot */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                  style={{
                    background: "hsl(var(--wedding-gold))",
                    boxShadow: "0 0 0 4px hsl(var(--secondary))",
                  }}
                />

                {/* Alternating layout */}
                {i % 2 === 0 ? (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <span
                        className="font-display text-xl md:text-2xl font-light"
                        style={{ color: "hsl(var(--wedding-gold))" }}
                      >
                        {event.time}
                      </span>
                    </div>
                    <div className="w-1/2 pl-8 text-left">
                      <span
                        className="font-display text-lg md:text-xl font-light italic"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {event.title}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-8 text-right">
                      <span
                        className="font-display text-lg md:text-xl font-light italic"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {event.title}
                      </span>
                    </div>
                    <div className="w-1/2 pl-8 text-left">
                      <span
                        className="font-display text-xl md:text-2xl font-light"
                        style={{ color: "hsl(var(--wedding-gold))" }}
                      >
                        {event.time}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TimelineSection;
