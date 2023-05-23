import Image from "next/image";

function Roadmap() {
  const milestones = [
    {
      percent: "20%",
      description: "Appreciating our loyal community builders.",
    },
    {
      percent: "40%",
      description: "Exciting Pop Up events, parties, and meetings.",
    },
    {
      percent: "60%",
      description: "Zalien farm and green plants in the metaverse.",
    },
    {
      percent: "80%",
      description: "Unleash the boundless power of your Zalien.",
    },
    {
      percent: "100%",
      description: "Discover new dimensions and receive airdrops.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white mt-40">
      <div className="text-center mt-20">
        <h2 className="text-4xl md:text-6xl font-almendra">
          The{" "}
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text leading-[106px] font-black">
            Roadmap
          </span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center mt-10 md:mt-20 px-4 md:px-20">
        <div className="md:w-1/2 pr-4 ml-48">
          <ul className="text-lg font-ibm-plex-sans">
            {milestones.map((milestone, index) => (
              <li key={index} className="mb-4 flex items-center">
                <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text  font-black">
                  {milestone.percent}
                </span>
                <span className="ml-2">{milestone.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 relative mt-8 md:mt-0 mr-48">
          <div className="rounded-xl shadow-xl overflow-hidden">
            <Image
              src="/images/roadmap.png"
              alt="Zalien"
              width={475}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <p className="text-xl md:text-2xl font-inter text-gray-400">
          Expect weird surprises, meet interesting people, and immerse yourself
          in the unique experience.
        </p>
      </div>
    </div>
  );
}

export default Roadmap;
