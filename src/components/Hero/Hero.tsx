export interface HeroProps {
  title: string;
  subtitle: string;
}

export default async function Hero({ title, subtitle }: HeroProps) {
  return (
    <section>
      <div className="w-full flex flex-col text-center gap-4 px-24 py-28">
        <h1 className="text-display-lg">{title}</h1>
        <h3 className="text-body-lg text-base-content/50">{subtitle}</h3>
      </div>
    </section>
  );
}
