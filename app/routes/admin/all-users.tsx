import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";

import type { Route } from "./+types/all-users";
import { cn, formatDate } from "lib/utils";
import { getAllUsers } from "~/modules/appwrite/auth";
import Header from "~/modules/dashboard/ui/components/header";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);

  return { users, total };
}

const AllUsersPage = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;

  return (
    <main className="all-users wrapper">
      <Header title="Manage Users" description="Filter, sort and access detailed user profiles" />
      <GridComponent dataSource={users} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img src={props.imageUrl} alt={props.name} className="size-8 rounded-full" />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective field="email" headerText="Email" textAlign="Left" />
          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            textAlign="Left"
            template={({ joinedAt }: { joinedAt: string }) => formatDate(joinedAt)}
          />
          <ColumnDirective
            field="status"
            headerText="Type"
            textAlign="Left"
            template={({ status }: UserData) => (
              <article className={cn("status-column", status === "user" ? "bg-success-50" : "bg-light-300")}>
                <div className={cn("size-1.5 rounded-full", status === "user" ? "bg-success-500" : "bg-gray-500")} />
                <h3 className={cn("font-inter text-xs font-medium", status === "user" ? "text-success-700" : "text-gray-500")}>{status}</h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main >
  )
}

export default AllUsersPage