import { makeDomainFunction } from "remix-domains";
import { createStudent } from "~/models/student.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { StudentSchema } from "./schema";

export const createNewStudent = makeDomainFunction(
  StudentSchema,
  EnvironmentSchema
)(async (values, { organization_id }) =>
  createStudent({ ...values, organization_id })
);
