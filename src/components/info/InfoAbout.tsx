export default function InfoAbout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
      {children}
    </div>
  );
}
