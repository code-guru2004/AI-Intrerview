import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_vQ8MESZ5umdP@ep-quiet-snow-a8osl2zo-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  },
});
