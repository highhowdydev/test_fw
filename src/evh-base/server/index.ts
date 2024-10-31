import Events from "@/utils/shared/events";
import { db, establishDatabaseConnection } from "./database";

onNet(Events.Fivem.OnResourceStop, async (name: string) => {
    if (name !== GetCurrentResourceName()) return;
    db.$disconnect();
})

establishDatabaseConnection();

onNet(Events.Fivem.PlayerConnecting, async (playerName: string) => {
    console.log(`Player ${playerName} is connecting`);
})

globalThis.exports("db", () => db);