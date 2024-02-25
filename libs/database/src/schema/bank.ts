import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const bankAccountsTable = pgTable("bank_accounts", {
    id: uuid("id").primaryKey().defaultRandom(),
    discordId: varchar("discord_id")
        .references(() => usersTable.discordId, {
            onDelete: "cascade",
            onUpdate: "cascade",
        })
        .unique(),
    balance: integer("balance").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
