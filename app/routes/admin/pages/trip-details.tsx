import type { LoaderFunctionArgs } from "react-router";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";

import type { Route } from "./+types/trip-details";
import { cn, parseTripData } from "lib/utils";
import { getAllTrips, getTripById } from "~/modules/trips/lib/procedures";
import Header from "~/modules/dashboard/ui/components/header";
import InfoPill from "~/modules/trips/ui/components/info-pill";
import TripCard from "~/modules/dashboard/ui/charts/trip-card";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tripId = params.tripId;
  if (!tripId) throw new Error("Trip ID is required");

  try {
    const [trip, allTrips] = await Promise.all([
      getTripById(tripId),
      getAllTrips(4, 0)
    ]);
    if (!trip) throw new Error(`Trip with ID ${tripId} not found`);

    return {
      trip,
      allTrips: allTrips?.allTrips?.map((trip) => ({
        id: trip.$id,
        ...parseTripData(trip.tripDetails),
        imageUrls: trip.imageUrls ?? []
      })) || []
    };
  } catch (error) {
    console.error("Failed to load trip details:", error);
    throw new Response("Failed to load trip details", { status: 500 });
  }
};

const TripDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const allTrips = loaderData?.allTrips as Trip[] | [];
  const tripData = parseTripData(loaderData?.trip?.tripDetails) as Trip;
  const tripImages = loaderData?.trip?.imageUrls || [];
  const pillItems = [
    { text: tripData.travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: tripData.groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: tripData.budget, bg: "!bg-success-50 !text-success-700" },
    { text: tripData.interests, bg: "!bg-navy-50 !text-navy-500" }
  ];
  const visitTimeAndWeatherInfo = [
    { title: "Best Time to Visit", items: tripData.bestTimeToVisit },
    { title: "Weather:", items: tripData.weatherInfo }
  ]

  return (
    <main className="travel-detail wrapper">
      <Header title="Trip Details" description="View and edit AI-generated travel plans" />
      <section className="container wrapper">
        <header className="w-full">
          <h1 className="p-40-semibold text-dark-100">{tripData.name}</h1>
          <div className="flex items-center gap-5 overflow-hidden w-full">
            <InfoPill
              text={`${tripData.duration} ${tripData.duration > 1 ? "days" : "day"} plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={tripData?.itinerary ? [...new Set(tripData.itinerary.map((item) => item.location))].join(", ") : "No locations"}
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>
        <section className="gallery">
          {tripImages.map((image: string, index: number) => (
            <img src={image} alt="Trip" key={index} className={cn("w-full rounded-xl object-cover md:row-span-1 h-[150px]", index === 0 && "md:row-span-2 md:col-span-2 h-[330px]")} />
          ))}
        </section>
        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems.map((pill, index) => (
                <ChipDirective key={index} text={pill.text} cssClass={`${pill.bg} !text-base !font-medium !px-4`} />
              ))}
            </ChipsDirective>
          </ChipListComponent>
          <ul className="flex items-center gap-1">
            {Array(5).fill("null").map((_, index) => (
              <li key={index}>
                <img src="/assets/icons/star.svg" alt="Star" className="size-[18px]" />
              </li>
            ))}
            <li className="ml-1">
              <ChipListComponent id="travel-chip">
                <ChipsDirective>
                  <ChipDirective text="4.9/5" cssClass="!bg-yellow-50 !text-yellow-700" />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>
        <section className="title">
          <article>
            <h3>{tripData.duration}-{tripData.duration > 1 ? "Days" : "Day"} {tripData.country} {tripData.travelStyle} Trip</h3>
            <p>{tripData.budget}, {tripData.groupType} and {tripData.interests}</p>
          </article>
          <h2>{tripData.estimatedPrice}</h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">{tripData.description}</p>
        <ul className="itinerary">
          {tripData.itinerary.map((dayPlan: DayPlan, index: number) => (
            <li key={index} className="w-full">
              <h3 className="text-xl">Day {dayPlan.day}: {dayPlan.location}</h3>
              <ul>
                {dayPlan.activities.map((activity, index) => (
                  <li key={index}>
                    <h1 className="flex-shrink-0 p-18-semibold min-w-[100px]">{activity.time}</h1>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div className="w-full">
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
        <section className="flex flex-col gap-6">
          <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
          <div className="trip-grid">
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
        </section>
      </section>
    </main>
  )
}

export default TripDetailsPage