import Footer from "@/components/Footer";
import Logo from "@/components/logo/Logo";

export default function Play() {
  return (
    <>
    <main className="flex relative justify-center stroke-background dark:stroke-foreground text-background mix-blend-difference dark:text-foreground items-center w-full h-screen">
      <Logo className="w-full h-full" />
      <p className="absolute top-0 left-0 px-8 pt-40 md:px-12 flex flex-col gap-4">
        coming soon:
        <span className="italic">under construction</span>
      </p>
      <Footer />
    </main>
    </>
  );
}
