import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

export const db = new PrismaClient();

export async function establishDatabaseConnection() {
    console.log("Establishing database connection...");

    try {
        await db.$connect();
        console.log("Database connection established!");
    } catch (error) {
        console.error("Failed to establish database connection:", error);
    }
}