import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { CodeSandbox } from "@/components/CodeSandbox";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <CodeSandbox />
      <Contact />
    </>
  );
}
