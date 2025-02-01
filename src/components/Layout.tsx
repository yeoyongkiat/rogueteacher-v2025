import { ReactNode } from "react";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">{children}</main>
    </div>
  );
}