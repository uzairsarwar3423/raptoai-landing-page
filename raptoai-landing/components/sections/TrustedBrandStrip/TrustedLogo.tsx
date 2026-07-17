import Image from "next/image";
import type { IntegrationLogo } from "./trusted-brand.content";

export function TrustedLogo({ logo, ariaHidden = false }: { logo: IntegrationLogo, ariaHidden?: boolean }) {
  return (
    <div 
      className="trusted-logo h-8 sm:h-10 w-auto flex-shrink-0 transition-all duration-300 ease-out flex items-center justify-center grayscale opacity-45 hover:grayscale-0 hover:opacity-90 px-4"
      aria-hidden={ariaHidden}
    >
      <Image 
        src={logo.svgPath} 
        alt={ariaHidden ? "" : `${logo.name} logo`} 
        width={140} 
        height={40} 
        className="h-full w-auto object-contain"
      />
    </div>
  );
}
