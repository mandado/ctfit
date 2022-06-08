import { z } from "zod";

export const EnvironmentSchema = z.object({
  organization_id: z.string().min(1, "organização obrigatória").optional(),
  user_id: z.string().min(1, "organização obrigatória").optional(),
});
