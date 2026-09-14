import { BsInstagram } from "react-icons/bs";
import { TbBrandFacebook } from "react-icons/tb";
import { LuLinkedin } from "react-icons/lu";

interface SocialLinksProps {
  className?: string;
}

function SocialLinks({ className = "" }: SocialLinksProps) {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/cloudsnepal_web",
      icon: <BsInstagram />,
      hoverColor: "hover:text-pink-300",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Clouds-Nepal-Web",
      
      icon: <TbBrandFacebook />,
      hoverColor: "hover:text-blue-300",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
     
      icon: <LuLinkedin />,
      hoverColor: "hover:text-blue-300",
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`transition-all duration-200 hover:scale-110 ${social.hoverColor}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;