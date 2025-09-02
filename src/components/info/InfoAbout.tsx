export default function InfoAbout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-4 md:w-72 md:items-end">
      {children}
    </div>
  );
}
