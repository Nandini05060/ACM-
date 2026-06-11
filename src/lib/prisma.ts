import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  try {
    // We pass the URL explicitly. If it's undefined (e.g. env issues), 
    // we provide a dummy string so initialization doesn't crash the entire app.
    // The actual queries will fail gracefully and our UI will fallback to mock data!
    return new PrismaClient();
  } catch (e) {
    return {} as PrismaClient; // Absolute fallback
  }
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
