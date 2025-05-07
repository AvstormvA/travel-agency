import { getUser } from "~/modules/appwrite/auth";
import StatsCard from "~/modules/dashboard/ui/charts/stats-card";
import TripCard from "~/modules/dashboard/ui/charts/trip-card";
import Header from "~/modules/dashboard/ui/components/header";
import type { Route } from "./+types/dashboard";

const dashboardStats = {
  users: {
    total: 12450,
    currentMonth: 218,
    lastMonth: 176
  },
  trips: {
    total: 3210,
    currentMonth: 150,
    lastMonth: 250
  },
  activeUser: {
    total: 62,
    currentMonth: 25,
    lastMonth: 15
  }
}
const allTrips = [
  {
    id: 1,
    name: "Tropical Rewind",
    imageUrls: ["/assets/images/sample1.jpg"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000"
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: ["/assets/images/sample2.jpg"],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary"],
    travelStyle: "Family",
    estimatedPrice: "$2,000"
  },
  {
    id: 3,
    name: "Zen Break",
    imageUrls: ["/assets/images/sample3.jpg"],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000"
  },
  {
    id: 4,
    name: "Adventure in Westeros",
    imageUrls: ["/assets/images/sample4.jpg"],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000"
  }
];

export async function clientLoader() {
  const user = await getUser();

  return user;
}

const DashboardPage = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name || "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.users.total}
            currentMonthCount={dashboardStats.users.currentMonth}
            lastMonthCount={dashboardStats.users.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.trips.total}
            currentMonthCount={dashboardStats.trips.currentMonth}
            lastMonthCount={dashboardStats.trips.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.activeUser.total}
            currentMonthCount={dashboardStats.activeUser.currentMonth}
            lastMonthCount={dashboardStats.activeUser.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Create Trips</h1>
        <div className="trip-grid">
          {allTrips.slice(0, 4).map((trip) => (
            <TripCard
              key={trip.id}
              id={`${trip.id}`}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={trip.tags}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default DashboardPage