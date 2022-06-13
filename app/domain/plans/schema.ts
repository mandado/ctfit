import z from "zod";
import type { Merge } from "type-fest";
import type { Base } from "~/types/common/base";

export const PlanSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  price: z.number().min(1, "Preencha o preço"),
  organization_id: z.string().optional(),
});

export type Plan = Merge<PlanForm, Base>;
export type PlanForm = z.infer<typeof PlanSchema>;
