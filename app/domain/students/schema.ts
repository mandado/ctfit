import z from "zod";
import { validateCPF } from "validations-br";
import { Merge } from "type-fest";
import { Base } from "~/types/common/base";
import { Modality } from "~/models/modality.server";

export const StudentSchema = z.object({
  name: z.string().min(1, "Preencha o nome"),
  email: z.string().min(1, "Preencha o email").email("Email inválido"),
  phone: z.string().min(1, "Preencha o telefone"),
  graduation: z.string().min(1, "Preencha a graduação"),
  document_number: z
    .string()
    .min(1, "Preencha o cpf")
    .refine((value) => validateCPF(value), { message: "Cpf inválido" }),
  weight: z.string().min(1, "Preencha o peso"),
  modality_id: z.string().min(1, "Selecione a modalidade"),
  organization_id: z.string().optional(),
  monthly_payment: z.string().min(1, "Preencha o pagamento mensal"),
});

type Relations = {
  modality?: Pick<Modality, "id" | "name">;
};

export type StudentForm = z.infer<typeof StudentSchema>;
export type Student = Merge<Merge<StudentForm, Base>, Relations>;
