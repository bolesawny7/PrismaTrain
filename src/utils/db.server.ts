import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

//if a global db instance doesn't exist, create one for hot reloading in dev mode
if (!global.__db) {
    global.__db = new PrismaClient();
}

db = global.__db;

export { db }
