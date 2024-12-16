import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "@/configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://shoai_owner:sQwGbJ6Coh1l@ep-young-mud-a27yocs9.eu-central-1.aws.neon.tech/shoai?sslmode=require",
  },
});
