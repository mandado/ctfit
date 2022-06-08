import z from "zod";
import { Merge } from "type-fest";
import { Base } from "~/types/common/base";

export const OrganizationSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  user_id: z.string().optional(),
});

export type OrganizationForm = z.infer<typeof OrganizationSchema>;
export type Organization = Merge<OrganizationForm, Base>;
