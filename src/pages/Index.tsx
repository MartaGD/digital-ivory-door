import { useState } from "react";
import DoorAnimation from "@/components/wedding/DoorAnimation";
import HeroSection from "@/components/wedding/HeroSection";
import LocationSection from "@/components/wedding/LocationSection";
import RSVPSection from "@/components/wedding/RSVPSection";
import BusSection from "@/components/wedding/BusSection";
import FooterSection from "@/components/wedding/FooterSection";
import SpotifySection from "@/components/wedding/SpotifySection";
import TimelineSection from "@/components/wedding/TimelineSection";

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
          <BusSection />
          <SpotifySection />
          <TimelineSection />
          <FooterSection />
        </>
      )}
    </div>
  );
};

export default Index;
