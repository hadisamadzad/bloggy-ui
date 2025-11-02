import { ReactElement } from "react";

export interface HeroProps {
  title: string;
  subtitle: ReactElement<"span">;
}

export default async function Hero({ title, subtitle }: HeroProps) {
  return (
    <section>
      <div className="w-full flex flex-col text-center gap-4 px-4 sm:px-6 lg:px-24 py-16 sm:py-20 lg:py-28">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold md:font-bold font-mono">
          {title}
        </h1>
        <p className="text-body-lg text-base-content/50 font-mono">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
