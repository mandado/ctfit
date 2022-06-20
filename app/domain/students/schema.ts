import z from "zod";
import { validateCPF } from "validations-br";
import type { Merge } from "type-fest";
import type { Base } from "~/types/common/base";
import type { Plan } from "../plans/schema";

export const StudentSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  email: z.string().min(1, "Preencha o email").email("Email inválido"),
  phone: z.string().min(1, "Preencha o telefone"),
  graduation: z.string().min(1, "Preencha a graduação"),
  document_number: z
    .string()
    .min(1, "Preencha o cpf")
    .refine((value) => validateCPF(value), { message: "Cpf inválido" }),
  weight: z.number().min(1, "O peso de ser maior que zero").default(0),
  plan_id: z.string().min(1, "Selecione o plano"),
  organization_id: z.string().optional(),
});

type Relations = {
  plan?: Plan;
};

export type StudentForm = Partial<z.infer<typeof StudentSchema>> & {
  filled_at?: Date;
};
export type Student = Merge<Merge<StudentForm, Base>, Relations>;
