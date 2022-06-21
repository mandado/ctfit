import { InputError, makeDomainFunction } from "remix-domains";
import { updateStudent as updateStudentData } from "~/models/student.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { StudentForm, StudentSchema } from "./schema";

export const updateStudent = (id: string, filled_at?: Date) =>
  makeDomainFunction(
    StudentSchema,
    EnvironmentSchema
  )(async (values, env) => {
    const payload = {
      ...values,
      organization_id: env.organization_id,
    } as StudentForm;

    const result = await updateStudentData(id, payload);

    if (result?.error?.message?.includes("unique_document_number_user")) {
      throw new InputError(
        "Já existe um cadastro com este cpf.",
        "document_number"
      );
    }

    if (result?.error?.message?.includes("unique_email_user")) {
      throw new InputError("Já existe um cadastro com este email.", "email");
    }

    return result;
  });
