import Footer from "@/components/Footer";
import Logo from "@/components/logo/Logomark";

export default function Play() {
  return (
    <main className="relative flex h-screen w-full items-center justify-center">
      <Logo className="h-full w-full" />
      <p className="absolute top-0 left-0 flex flex-col gap-4 px-8 pt-40 md:px-12">
        coming soon:
        <span className="italic">under construction</span>
      </p>
      <Footer />
    </main>
  );
}
