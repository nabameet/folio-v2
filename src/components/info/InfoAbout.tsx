export default function InfoAbout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex md:items-end flex-col gap-4 w-full md:w-72">
      {children}
    </div>
  );
}
