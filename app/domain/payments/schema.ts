import z from "zod";
import { validateCPF } from "validations-br";
import type { Merge } from "type-fest";
import type { Base } from "~/types/common/base";
import type { Modality } from "../modalities/schema";
import { Plan } from "../plans/schema";

export const PaymentSchema = z.object({
  student_id: z.string().min(1, "Preencha o aluno"),
  plan_id: z.string().min(1, "Preencha o plano"),
  organization_id: z.string().min(1,  "Preencha a organização"),
  paid_at: z.string().min(1, 'Preencha a data do pagamento'),
});

type Relations = {
  plan?: Pick<Plan, "id" | "name" | "price">;
};

export type PaymentForm = Partial<z.infer<typeof PaymentSchema>>;
export type Payment = Merge<Merge<PaymentForm, Base>, Relations>;
