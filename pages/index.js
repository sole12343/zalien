import Content from "@/components/body/Content";
import Card from "@/components/body/Card";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start md:items-center space-x-0 md:space-x-4 w-full mx-auto">
      <Content />
      <Card />
    </div>
  );
}
