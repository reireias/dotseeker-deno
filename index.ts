import { config } from "https://deno.land/x/dotenv/mod.ts";
// import Seeker from "./Seeker.ts";

config();
if (!Deno.env.get("GITHUB_API_TOKEN")) {
  console.error("Set GITHUB_API_TOKEN in .env file or environment.");
} else {
  // new Seeker().seek().catch((e) => console.error(e));
}
