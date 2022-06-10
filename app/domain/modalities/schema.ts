import z from "zod";
import type { Merge } from "type-fest";
import type { Base } from "~/types/common/base";

export const ModalitySchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  organization_id: z.string().optional(),
});

export type Modality = Merge<ModalityForm, Base>;
export type ModalityForm = z.infer<typeof ModalitySchema>;
