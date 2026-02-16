import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DoorAnimationProps {
  onOpen: () => void;
}

const DoorAnimation = ({ onOpen }: DoorAnimationProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "hsl(var(--wedding-cream))" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {/* Left door */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-end"
            style={{
              background: "linear-gradient(135deg, hsl(var(--wedding-cream)), hsl(var(--wedding-blush)))",
              borderRight: "1px solid hsl(var(--wedding-gold-light))",
            }}
            initial={{ x: 0 }}
            animate={isOpening ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pr-1 md:pr-2 text-right">
              <p className="font-display text-lg md:text-2xl font-light italic" style={{ color: "hsl(var(--wedding-gold))", paddingBottom: "150px" }}>
              ¡Estas
              </p>
            </div>
          </motion.div>

          {/* Right door */}
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-start"
            style={{
              background: "linear-gradient(225deg, hsl(var(--wedding-cream)), hsl(var(--wedding-blush)))",
              borderLeft: "1px solid hsl(var(--wedding-gold-light))",
            }}
            initial={{ x: 0 }}
            animate={isOpening ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pl-1 md:pl-2 text-left">
              <p className="font-display text-lg md:text-2xl font-light italic" style={{ color: "hsl(var(--wedding-gold))", paddingBottom: "150px" }}>
              invitado!
              </p>
            </div>
          </motion.div>

          {/* Center button */}
          <motion.button
            onClick={handleOpen}
            className="relative z-10 flex flex-col items-center gap-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
              style={{
                border: "2px solid hsl(var(--wedding-gold))",
                background: "hsl(var(--wedding-cream))",
              }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(var(--wedding-gold))"
                strokeWidth="1.5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </motion.svg>
            </div>
            <p className="wedding-text text-xs">Abrir invitación</p>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {/* Doors opening animation continues */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2"
            style={{
              background: "linear-gradient(135deg, hsl(var(--wedding-cream)), hsl(var(--wedding-blush)))",
            }}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2"
            style={{
              background: "linear-gradient(225deg, hsl(var(--wedding-cream)), hsl(var(--wedding-blush)))",
            }}
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DoorAnimation;
