import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-primary text-text-primary">
      <div className="bg-grid" />
      <div className="bg-noise" />
      <section className="relative z-[2] mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-center px-5 py-20 sm:px-8">
        <div className="max-w-3xl border-y border-border-soft py-12">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">404 / Not Found</p>
          <h1 className="text-[clamp(4rem,14vw,11rem)] font-bold leading-[0.82] tracking-[-0.085em]">Page slipped away.</h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-text-secondary md:text-lg">
            Halaman yang kamu cari tidak ditemukan, sudah dipindah, atau memang belum pernah dibuat.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <Link className="border border-text-primary bg-text-primary px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] !text-[#050505] transition-colors duration-300 ease-out hover:bg-transparent hover:!text-text-primary" href="/">
              Back Home
            </Link>
            <Link className="border border-border-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.1em] transition-colors duration-300 ease-out hover:border-text-primary hover:bg-text-primary hover:!text-[#050505]" href="/notes">
              Explore Notes
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
          <span>alipnf</span>
          <span>/</span>
          <span>frontend developer</span>
          <span>/</span>
          <span>technical notes</span>
        </div>
      </section>
    </main>
  );
}
