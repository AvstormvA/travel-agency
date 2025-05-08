import { Link, useLocation } from "react-router";

import { cn } from "lib/utils";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

interface HeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const Header = ({ title, description, buttonText, buttonLink }: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="header">
      <article>
        <h1 className={cn("text-dark-100 text-xl md:text-2xl font-semibold", location.pathname === "/" && "text-2xl md:text-4xl font-bold")}>{title}</h1>
        <p className={cn("text-gray-100 text-sm md:text-base font-normal", location.pathname === "/" && "text-base md:text-lg")}>{description}</p>
      </article>
      {buttonText && buttonLink && (
        <Link to={buttonLink}>
          <ButtonComponent type="button" className="button-class !h-11 !w-full md:w-[240px]">
            <img src="/assets/icons/plus.svg" alt="Create Trip" className="size-5" />
            <span className="p-16-semibold text-white">{buttonText}</span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  )
}

export default Header