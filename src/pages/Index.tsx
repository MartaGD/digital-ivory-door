import { useState } from "react";
import DoorAnimation from "@/components/wedding/DoorAnimation";
import HeroSection from "@/components/wedding/HeroSection";
import LocationSection from "@/components/wedding/LocationSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import ContributionsSection from "@/components/wedding/ContributionsSection";
import FooterSection from "@/components/wedding/FooterSection";

const Index = () => {
  const [doorOpened, setDoorOpened] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {!doorOpened && <DoorAnimation onOpen={() => setDoorOpened(true)} />}

      {doorOpened && (
        <>
          <HeroSection />
          <LocationSection />
          <RSVPSection />
          <ContributionsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
};

export default Index;
