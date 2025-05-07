import { Outlet, redirect } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";

import { account } from "~/modules/appwrite/client";
import { getExistingUser, storeUserData } from "~/modules/appwrite/auth";
import NavItems from "~/modules/dashboard/ui/components/nav-items";
import MobileSidebar from "~/modules/dashboard/ui/components/mobile-sidebar";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    if (existingUser?.status === "user") return redirect("/");

    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error in clientLoader", error)
    return redirect("/sign-in")
  }
}

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  )
}

export default AdminLayout