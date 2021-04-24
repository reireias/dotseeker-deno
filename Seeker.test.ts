import Seeker from "./Seeker.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("example", () => {
  const seeker = new Seeker("dummy");
  assertEquals(seeker.options.page, 1);
});
