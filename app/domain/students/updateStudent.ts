import { InputError, makeDomainFunction } from "remix-domains";
import { updateStudent as updateStudentData } from "~/models/students.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { StudentSchema } from "./schema";

export const updateStudent = (id: string) =>
  makeDomainFunction(
    StudentSchema,
    EnvironmentSchema
  )(async (values, env) => {
    const result = await updateStudentData(id, {
      ...values,
      organization_id: env.organization_id,
    });

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
