import { serial, varchar,pgTable, timestamp, text } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id:serial('id').primaryKey(),
    name:text('name').notNull(),
    email:text('email').notNull(),
    imageUrl:text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
});