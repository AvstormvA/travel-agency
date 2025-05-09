import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import NavItems from "./nav-items";

const MobileSidebar = () => {
  let sidebar: SidebarComponent;

  const handleToggleSidebar = () => {
    sidebar.toggle();
  }

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/" className="link-logo">
          <img src="/assets/icons/logo.svg" alt="Travel" className="size-[30px]" />
          <h1>Tourvisto</h1>
        </Link>
        <button onClick={handleToggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent width={270} ref={(Sidebar) => sidebar = Sidebar} created={() => sidebar.hide()} closeOnDocumentClick={true} showBackdrop={true} type="over">
        <NavItems handleClick={handleToggleSidebar} />
      </SidebarComponent>
    </div>
  )
}

export default MobileSidebar