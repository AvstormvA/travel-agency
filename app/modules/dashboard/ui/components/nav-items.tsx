import { Link, NavLink } from "react-router";

import { cn } from "lib/utils";
import { sidebarItems } from "~/constants";

interface NavItemsProps {
  handleClick?: () => void;
}

const NavItems = ({ handleClick }: NavItemsProps) => {
  const user = {
    name: "Test",
    email: "test@gmail.com",
    imageUrl: "/assets/images/david.webp"
  }

  const handleLogout = () => {

  }

  return (
    <section className="nav-items">
      <Link to="/" className="link-logo">
        <img src="/assets/icons/logo.svg" alt="Travel" className="size-[30px]" />
        <h1>Tourvisto</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map((item) => (
            <NavLink to={item.href} key={item.id} className="a">
              {({ isActive }: { isActive: boolean }) => (
                <div className={cn("group nav-item", isActive && "bg-primary-100 !text-white")} onClick={handleClick}>
                  <img src={item.icon} alt={item.label} className={cn("group-hover:brightness-0 size-5 group-hover:invert", isActive ? "brightness-0 invert" : "text-dark-200")} />
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
        <footer className="nav-footer">
          <div className="flex items-center gap-2">
            <img src={user?.imageUrl || "/assets/images/david.webp"} alt={user?.name || "David"} />
            <article>
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
            </article>
          </div>
          <button onClick={handleLogout} className="cursor-pointer">
            <img src="/assets/icons/logout.svg" alt="Logout" className="size-6" />
          </button>
        </footer>
      </div>
    </section>
  )
}

export default NavItems