import Image from "next/image";

function About() {
  const milestones = [
    {
      description: "4,200 unique NFTs crafted by diverse artists.",
    },
    {
      description: "Own a Zalien for exclusive benefits, club activities.",
    },
    {
      description: "A fusion of tradition, future, and social commentary.",
    },
    {
      description: "Uncover secrets and unleash high-tech power.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white mt-40">
      <div className="text-center mt-20">
        <h2 className="text-4xl md:text-6xl font-almendra">
          Discover{" "}
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text font-black">
            Zalien
          </span>
          <br />
          Your{" "}
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text leading-[106px] font-black">
            Passport
          </span>{" "}
          to a Parallel Universe
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center mt-10 md:mt-20 px-4 md:px-20">
        <div className="md:w-1/2 pr-4 ml-48 mt-10">
          <ul className="text-lg font-ibm-plex-sans">
            {milestones.map((milestone, index) => (
              <li key={index} className="mb-4 flex items-center">
                <span className="ml-2">{milestone.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 relative mt-8 md:mt-0 mr-48">
          <div className="rounded-xl shadow-xl overflow-hidden">
            <Image
              src="/images/about.jpg"
              alt="Zalien"
              width={475}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-16">
        <p className="text-xl md:text-2xl font-inter text-gray-400">
          Notice: 333 exclusive Zaliens reserved for community rewards, not for
          sale.
        </p>
      </div>
    </div>
  );
}

export default About;
