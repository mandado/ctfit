import { makeDomainFunction } from "remix-domains";
import { updateStudent as updateStudentData } from "~/models/students.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { StudentSchema } from "./schema";

export const updateStudent = (id: string) =>
  makeDomainFunction(
    StudentSchema,
    EnvironmentSchema
  )(async (values, env) =>
    updateStudentData(id, { ...values, organization_id: env.organizationId })
  );
