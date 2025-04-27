import React, { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <div
        className={cn(
          "relative flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-300 to-blue-500 text-slate-950 dark:from-zinc-800 dark:via-zinc-900 dark:to-black transition-colors",
          className
        )}
        {...props}
      >
        {/* Fondo Aurora simplificado */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent dark:from-white/10 pointer-events-none" />
        )}

        {/* Contenido principal */}
        <div className="relative z-10 w-full px-4">{children}</div>
      </div>
    </main>
  );
};
