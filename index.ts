import { config } from "https://deno.land/x/dotenv/mod.ts";
import Seeker from "./Seeker.ts";

config();
const token = Deno.env.get("GITHUB_API_TOKEN");
if (!token) {
  console.error("Set GITHUB_API_TOKEN in .env file or environment.");
} else {
  new Seeker(token).seek().catch((e) => console.error(e));
}
