import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route("api/create-trip", "routes/api/create-trip.ts"),
  route("sign-in", "routes/auth/pages/sign-in.tsx"),
  layout("routes/home/layout/main-layout.tsx", [
    index("routes/home/pages/landing.tsx")
  ]),
  layout("routes/admin/layout/admin-layout.tsx", [
    route("dashboard", "routes/admin/pages/dashboard.tsx"),
    route("all-users", "routes/admin/pages/all-users.tsx"),
    route("trips", "routes/admin/pages/all-trips.tsx"),
    route("trips/create", "routes/admin/pages/create-trip.tsx"),
    route("trips/:tripId", "routes/admin/pages/trip-details.tsx")
  ])
] satisfies RouteConfig;