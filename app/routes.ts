import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("api/create-trip", "routes/api/create-trip.ts"),
  route("sign-in", "routes/auth/sign-in.tsx"),
  layout("routes/admin/admin-layout.tsx", [
    route("dashboard", "routes/admin/dashboard.tsx"),
    route("all-users", "routes/admin/all-users.tsx"),
    route("trips", "routes/admin/all-trips.tsx"),
    route("trips/create", "routes/admin/create-trip.tsx")
  ])
] satisfies RouteConfig;