import Image from "next/image";

const members = [
  {
    name: "BJC.ETH",
    role: "Founder, Chief, 100% Stoner",
    image: "/images/team/1.png",
  },
  {
    name: "MSMaryJane.ETH",
    role: "CO-Founder, CEO",
    image: "/images/team/2.png",
  },
  {
    name: "Char",
    role: "Community Manager",
    image: "/images/team/3.png",
  },
  {
    name: "BetterChill.ETH",
    role: "Director of Vibes",
    image: "/images/team/4.png",
  },
  {
    name: "OkeyFu.ETH",
    role: "Program Engineer",
    image: "/images/team/5.png",
  },
  {
    name: "Titan",
    role: "Solidity Developer",
    image: "/images/team/6.png",
  },
  {
    name: "LeonChen.ETH",
    role: "Ambassador(Chinese)",
    image: "/images/team/7.png",
  },
  { name: "Buddy", role: "Cultural Promotion", image: "/images/team/8.png" },
  {
    name: "AlbertHofmann.ETH",
    role: "Pharmacist, Party Crasher",
    image: "/images/team/9.png",
  },
];

const Team = () => {
  return (
    <div className="text-center mt-40">
      <div className="text-6xl font-ibm-plex-sans text-white">
        Our{" "}
        <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text font-black">
          Team
        </span>
      </div>
      <div className="mt-0">
        <p className="text-inter text-gray-400 text-center text-2xl">
          Learn more about the psychedelic part of this team.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 mx-4 md:mx-48">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={member.image}
              alt={`Team Member ${index + 1}`}
              className="w-24 h-24 rounded-full"
            />
            <p className="text-inter text-white text-medium18 mt-4">
              {member.name}
            </p>
            <p className="text-inter text-gray-400 text-regular20">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
