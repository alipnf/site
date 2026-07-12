import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative h-dvh overflow-hidden bg-bg-primary text-text-primary">
      <div className="bg-grid" />
      <div className="bg-noise" />
      <section className="relative z-[2] mx-auto flex h-full w-full max-w-[1280px] flex-col justify-center px-5 py-6 sm:px-8 sm:py-10">
        <div className="max-w-2xl border-y border-border-soft py-8 sm:py-12">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">404 / Not Found</p>
          <h1 className="text-balance text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.88] tracking-[-0.075em]">Page not found.</h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary md:text-lg">
            The page you are looking for may have moved, been removed, or never existed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link className="border border-text-primary bg-text-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] !text-[#050505] transition-colors duration-300 ease-out hover:bg-transparent hover:!text-text-primary" href="/">
              Back Home
            </Link>
            <Link className="border border-border-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300 ease-out hover:border-text-primary hover:bg-text-primary hover:!text-[#050505]" href="/notes">
              Explore Notes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
