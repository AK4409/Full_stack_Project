import { FaBolt } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  animated?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

function Button({
  text,
  onClick,
  animated = true,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group
        inline-flex items-center justify-center gap-3
        rounded-full
        bg-gradient-to-r from-emerald-700 via-green-500 to-emerald-800
        px-8 py-4
        font-bold text-white
        cursor-pointer
        shadow-[0_12px_25px_rgba(0,0,0,0.18)]
        transition-all duration-300 ease-in-out
        ${animated
          ? "hover:-translate-y-1 hover:scale-105 hover:shadow-[0_18px_30px_rgba(0,0,0,0.25)] active:scale-95"
          : ""
        }
        ${className}
      `}
    >
      <FaBolt
        className={`
          text-yellow-400
          ${animated ? "transition-transform duration-300 group-hover:rotate-12" : ""}
        `}
      />

      <span>{text}</span>
    </button>
  );
}

export default Button;