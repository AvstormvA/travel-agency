import { Outlet, redirect } from "react-router";

import { account } from "~/modules/appwrite/client";
import { getExistingUser, storeUserData } from "~/modules/appwrite/auth";
import RootNavbar from "~/modules/main/ui/components/root-navbar";

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect("/sign-in");

    const existingUser = await getExistingUser(user.$id);
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
    console.log("Error fetching user", error);
    return redirect("/sign-in");
  }
}

const MainLayout = () => {
  return (
    <div className="bg-light-200">
      <RootNavbar />
      <Outlet />
    </div>
  )
}
export default MainLayout