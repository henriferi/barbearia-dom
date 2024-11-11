import { FC, ButtonHTMLAttributes } from "react";

interface ButtonConsultarProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonConsultar: FC<ButtonConsultarProps> = ({ label, ...props }) => {
  return (
    <button
      className="bg-green-600 text-white py-2 px-6 rounded-lg w-50 hover:bg-green-800 transition duration-300"
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonConsultar;
