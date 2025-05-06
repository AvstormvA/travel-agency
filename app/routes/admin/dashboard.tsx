import Header from "~/modules/dashboard/ui/components/header";

const DashboardPage = () => {
  const user = {
    name: "Test",
    email: "test@gmail.com",
    imageUrl: "/assets/images/david.webp"
  }

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name || "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />
    </main>
  )
}

export default DashboardPage