import { FC, ButtonHTMLAttributes } from "react";

interface ButtonAgendarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonAgendar: FC<ButtonAgendarProps> = ({ label, ...props }) => {
  return (
    <button
      className="bg-zinc-800 text-white py-2 px-6 rounded-lg w-50 hover:bg-zinc-900 transition duration-300"
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonAgendar;
