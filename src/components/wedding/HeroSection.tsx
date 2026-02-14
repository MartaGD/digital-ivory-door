import { motion } from "framer-motion";
import weddingFloral from "@/assets/wedding-floral.jpg";

const HeroSection = () => {
  return (
    <section className="wedding-section relative overflow-hidden min-h-screen">
      {/* Background floral */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${weddingFloral})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 text-center">
        <motion.p
          className="wedding-text mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Nos casamos
        </motion.p>

        <motion.h1
          className="font-display text-5xl md:text-8xl font-light mb-2"
          style={{ color: "hsl(var(--primary))" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Ana & Marc
        </motion.h1>

        <motion.div
          className="wedding-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />

        <motion.p
          className="font-display text-xl md:text-3xl font-light italic"
          style={{ color: "hsl(var(--muted-foreground))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          21 de Junio de 2025
        </motion.p>

        <motion.p
          className="wedding-text mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          Barcelona, España
        </motion.p>

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
    </section>
  );
};

export default HeroSection;
