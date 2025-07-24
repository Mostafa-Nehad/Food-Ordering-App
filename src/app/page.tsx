import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";
import About from "@/components/About";
import Contact from "@/components/Contact";



export default function Home() {
  return (
  <main>
  <Hero/>
  <BestSellers/>
  <About/>
  <Contact/>
  </main>
  );
}
