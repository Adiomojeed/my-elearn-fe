import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <About />
    </main>
  );
}
