import { InputError, makeDomainFunction } from "remix-domains";
import { createStudent } from "~/models/student.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { StudentSchema } from "./schema";

export const createNewStudent = makeDomainFunction(
  StudentSchema,
  EnvironmentSchema
)(async (values, env) => {
  const organization_id = values.organization_id || env.organization_id;

  const result = await createStudent({ ...values, organization_id });

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
