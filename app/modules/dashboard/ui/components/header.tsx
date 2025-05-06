import { useLocation } from "react-router";

import { cn } from "lib/utils";

interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="header">
      <article>
        <h1 className={cn("text-dark-100 text-xl md:text-2xl font-semibold", location.pathname === "/" && "text-2xl md:text-4xl font-bold")}>{title}</h1>
        <p className={cn("text-gray-100 text-sm md:text-base font-normal", location.pathname === "/" && "text-base md:text-lg")}>{description}</p>
      </article>
    </header>
  )
}

export default Header