/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://neondb_owner:n3wYxA9tUBqk@ep-aged-heart-a1av8y0y.ap-southeast-1.aws.neon.tech/Ai-content-generator?sslmode=require' 
    }
  };