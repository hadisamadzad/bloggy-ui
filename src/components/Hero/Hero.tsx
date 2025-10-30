import { ReactElement } from "react";

export interface HeroProps {
  title: string;
  subtitle: ReactElement<"span">;
}

export default async function Hero({ title, subtitle }: HeroProps) {
  return (
    <section>
      <div className="w-full flex flex-col text-center gap-4 px-24 py-28">
        <h1 className="text-display-lg font-mono">{title}</h1>
        <h3 className="text-body-lg text-base-content/50 font-mono">
          {subtitle}
        </h3>
      </div>
    </section>
  );
}
