import z from "zod";
import type { Merge } from "type-fest";
import type { Base } from "~/types/common/base";
import { Modality } from "../modalities/schema";

export const PlanSchema = z.object({
  name: z.string().min(1, `Preencha o nome do plano`),
  modalities: z.preprocess((arg) => {
    if (arg === "") {
      return [];
    }

    return !Array.isArray(arg) ? [arg] : arg;
  }, z.array(z.string()).nonempty("Selecione pelo menos um modalidade")),
  shifts: z
    .array(
      z.object({
        name: z.string().min(1, "Preencha o nome do turno"),
        value: z.preprocess(
          (val) => Number(val),
          z.number().min(1, "Preencha o preço").default(0)
        ),
      })
    )
    .min(1, `Selecione pelo menos um turno`)
    .default([]),
  organization_id: z.string().optional(),
});

export type Plan = Merge<
  {
    shift: string;
    name: string;
    price: number;
    plans_modalities?: PlansModality[];
  },
  Base
>;

export type PlansModality = {
  modality: Pick<Modality, "name" | "id">;
};

export type PlanForm = z.infer<typeof PlanSchema>;
