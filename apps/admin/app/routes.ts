import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route("partners","routes/partners.tsx"),
route("brands","routes/brands.tsx"),
route("nonprofits","routes/nonprofits.tsx"),
route("items","routes/items.tsx"),
route("coupons","routes/coupons.tsx"),
route("clients","routes/clients.tsx")] satisfies RouteConfig;
