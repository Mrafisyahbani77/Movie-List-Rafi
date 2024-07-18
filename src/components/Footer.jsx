import Ig from "../assets/Ig.png";
import Gm from "../assets/gmail.png";
import Yt from "../assets/youtube.png";
import Git from "../assets/git.png";
import Logo from "../assets/Rapi.png";

const socialMediaLinks = [
  { name: "GitHub", url: "https://www.github.com/Mrafisyahbani77", icon: Git },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@rafiofficial958",
    icon: Yt,
  },
  { name: "Gmail", url: "mailto:mrafi.syahbani@gmail.com", icon: Gm },
  { name: "Instagram", url: "https://www.instagram.com/rafyxz77/", icon: Ig },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:items-start">
        <div className="mb-8 md:flex md:mb-0 md:text-left hidden md:w-1/3">
          <img
            className="mx-3 w-16 h-16 md:min-w-52 md:h-32"
            src={Logo}
            alt="Rafi"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="flex flex-col items-center md:flex-r md:justify-between border-b border-gray-700 pb-4 mb-8">
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 mb-4 md:mb-0">
              
                {/* <a href="#home" className="hover:text-gray-400">
                  Home
                </a>
                <a href="#about" className="hover:text-gray-400">
                  About
                </a>
                <a href="#skils" className="hover:text-gray-400">
                  Skills
                </a>
                <a href="#project" className="hover:text-gray-400">
                  Project
                </a>
                <a href="#contact" className="hover:text-gray-400">
                  Contact
                </a>
                <a href="#serti" className="hover:text-gray-400">
                  Certificate
                </a>
                <a href="#Edukasi" className="hover:text-gray-400">
                  Education
                </a> */}
              </div>
            
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            {socialMediaLinks.map((link, index) => (
              <a key={index} href={link.url} className="p-2">
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-7 h-7 bg-black rounded-full py-1 px-1"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-4">
        Created By @Muhammad Rafi Syahbani
      </p>
    </footer>
  );
};

export default Footer;
