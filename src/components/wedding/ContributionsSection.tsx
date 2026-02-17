import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown, Gift, Heart, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContributionItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
}

const ContributionItem = ({ icon, title, description, details }: ContributionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="wedding-card mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "hsl(var(--wedding-blush))" }}
          >
            {icon}
          </div>
          <div className="text-left">
            <p className="font-display text-lg md:text-xl font-medium" style={{ color: "hsl(var(--foreground))" }}>
              {title}
            </p>
            <p className="text-xs font-light" style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}>
              {description}
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <p className="text-s font-light leading-relaxed" style={{ fontFamily: "var(--font-body)", color: "hsl(var(--muted-foreground))" }}>
                {details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContributionsSection = () => {
  return (
    <section className="wedding-section" style={{ background: "hsl(var(--card))" }}>
      <ScrollReveal className="w-full max-w-lg mx-auto text-center">
        <p className="wedding-text mb-4">Un detalle</p>
        <h2 className="wedding-heading mb-2">Lista de Bodas</h2>
        <div className="wedding-divider" />
        <p className="font-display text-lg font-light italic mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
          Vuestra presencia es el mejor regalo, pero si deseáis tener un detalle con nosotros...
        </p>

        <ContributionItem
          icon={<Plane className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />}
          title="Luna de Miel"
          description="Ayúdanos a vivir la aventura"
          details="Podéis contribuir a nuestra luna de miel a través de Bizum al número 612 345 678 o mediante transferencia bancaria al IBAN: ES12 3456 7890 1234 5678 9012. Concepto: Luna de miel + vuestro nombre."
        />

        <ContributionItem
          icon={<Heart className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />}
          title="Nuestro Hogar"
          description="Para empezar nuestra nueva vida juntos"
          details="Si preferís contribuir a nuestro nuevo hogar, podéis hacerlo mediante Bizum al número 612 345 678 o transferencia bancaria al IBAN: ES12 3456 7890 1234 5678 9012. Concepto: Hogar + vuestro nombre."
        />

        <ContributionItem
          icon={<Gift className="w-5 h-5" style={{ color: "hsl(var(--wedding-gold))" }} />}
          title="Regalo Libre"
          description="Sorpréndenos a vuestra manera"
          details="Cualquier detalle será recibido con mucho cariño. Podéis contactarnos para más información o hacer vuestra aportación por Bizum al 612 345 678. Concepto: Regalo + vuestro nombre."
        />
      </ScrollReveal>
    </section>
  );
};

export default ContributionsSection;
