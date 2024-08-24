import { create } from "domain";
import { varchar } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";
import { text, pgTable } from "drizzle-orm/pg-core";

export const AIOutput=pgTable('aioutput',{
    id: serial('id').primaryKey(),
    formData:varchar('formData'),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy:varchar('createdBy'),
    createdAt:varchar('createdAt')
})