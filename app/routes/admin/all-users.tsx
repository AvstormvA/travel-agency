import Header from "~/modules/dashboard/ui/components/header";

const AllUsers = () => {
  const user = {
    name: "Test",
    email: "test@gmail.com",
    imageUrl: "/assets/images/david.webp"
  }

  return (
    <main className="dashboard wrapper">
      <Header
        title="Trips Page"
        description="Checkout our current users in real time"
      />
    </main>
  )
}

export default AllUsers