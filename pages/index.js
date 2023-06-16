import Content from "@/components/body/Content";
import Card from "@/components/body/Card";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Guest from "@/components/Guest";

export default function Home() {
  return (
    <>
      <div
        id="home"
        className="mt-20 flex flex-col md:flex-row justify-center items-start md:items-center space-x-0 md:space-x-4 w-full mx-auto"
      >
        <Content />
        <Card />
      </div>
      <div id="about" className="flex justify-center">
        <About />
      </div>
      <div id="roadmap" className="flex  justify-center">
        <Roadmap />
      </div>
      <div id="team" className="flex  justify-center">
        <Team />
      </div>
      <div id="guest" className="flex justify-center">
        <Guest />
      </div>
    </>
  );
}
