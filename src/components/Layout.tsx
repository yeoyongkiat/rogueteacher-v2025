import Navigation from "./Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <Navigation />
      <main>{children}</main>
    </div>
  );
}