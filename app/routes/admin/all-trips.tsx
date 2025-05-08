import { useState } from "react";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { PagerComponent } from "@syncfusion/ej2-react-grids";

import type { Route } from "./+types/all-trips";
import { TRIPS_PER_PAGE } from "~/modules/trips/constants";
import { parseTripData } from "lib/utils";
import { getAllTrips } from "~/modules/appwrite/trips";
import Header from "~/modules/dashboard/ui/components/header";
import TripCard from "~/modules/dashboard/ui/charts/trip-card";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = TRIPS_PER_PAGE;
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const offset = (page - 1) * limit;

  try {
    const { allTrips, total } = await getAllTrips(limit, offset);

    return {
      allTrips: allTrips.map((trip) => ({
        id: trip.$id,
        ...parseTripData(trip.tripDetails),
        imageUrls: trip.imageUrls ?? []
      })) || [],
      total
    };
  } catch (error) {
    console.error("Failed to load all trip details:", error);
    throw new Response("Failed to load all trip details", { status: 500 });
  }
};

const AllTrips = ({ loaderData }: Route.ComponentProps) => {
  const allTrips = loaderData?.allTrips as Trip[] | [];
  const [searchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.location.search = `?page=${page}`;
  }

  return (
    <main className="all-users wrapper">
      <Header title="Trips" description="View and edit AI-generated travel plans" buttonText="Create a trip" buttonLink="/trips/create" />
      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4">Manage Created Trips</h1>
        <div className="trip-grid mb-4">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              location={trip.itinerary?.[0]?.location ?? "Unknown location"}
              imageUrl={trip.imageUrls?.[0] ?? "/assets/images/placeholder.jpg"}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
        {/* <PagerComponent
          totalRecordsCount={loaderData.total}
          pageSize={TRIPS_PER_PAGE}
          currentPage={currentPage}
          click={(args) => handlePageChange(args.currentPage)}
          cssClass="!mb-4 "
        /> */}
      </section>
    </main>
  )
}

export default AllTrips