import Header from "~/modules/dashboard/ui/components/header";

const AllTrips = () => {
  return (
    <main className="all-users wrapper">
      <Header title="Trips" description="View and edit AI-generated travel plans" buttonText="Create a trip" buttonLink="/trips/create" />
    </main>
  )
}

export default AllTrips