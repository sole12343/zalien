import Content from "@/components/body/Content";
import Card from "@/components/body/Card";
import About from "@/components/About";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Guest from "@/components/Guest";

export default function Home() {
  return (
    <>
      <div id="home" className="mt-14 flex flex-col md:flex-row justify-center items-start md:items-center space-x-0 md:space-x-4 w-full mx-auto">
        <Content />
        <Card />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="roadmap">
        <Roadmap />
      </div>
      <div id="team">
        <Team />
      </div>
      <Guest />
    </>
  );
}
