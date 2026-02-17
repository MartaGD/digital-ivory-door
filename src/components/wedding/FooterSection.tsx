import ScrollReveal from "./ScrollReveal";

const FooterSection = () => {
  return (
    <footer className="py-20 px-6 text-center" style={{ background: "hsl(var(--primary))" }}>
      <ScrollReveal>
        <p
          className="text-s tracking-widest uppercase mb-6"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--wedding-gold-light))" }}
        >
          Nos vemos pronto
        </p>

        <h2
          className="font-display text-4xl md:text-6xl font-light mb-4"
          style={{ color: "hsl(var(--primary-foreground))" }}
        >
          Claudia & Arturo
        </h2>

        <div className="w-24 h-px mx-auto my-6" style={{ background: "hsl(var(--wedding-gold))" }} />

        <p
          className="font-display text-xl md:text-xl font-light italic mb-8"
          style={{ color: "hsl(var(--wedding-gold-light))" }}
        >
          19 de Septiembre de 2026
        </p>

        <p
          className="text-s font-light max-w-md mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--primary-foreground) / 0.7)" }}
        >
          Gracias por formar parte de este día tan especial. Vuestra presencia llenará de alegría uno de los momentos más bonitos de nuestras vidas.
        </p>

        <div className="mt-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="hsl(var(--wedding-gold))"
            className="mx-auto opacity-60"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default FooterSection;
