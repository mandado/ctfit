import { makeDomainFunction } from "remix-domains";
import { createModality } from "~/models/modality.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { ModalitySchema } from "./schema";

export const createNewModality = makeDomainFunction(
  ModalitySchema,
  EnvironmentSchema
)(async (values, env) =>
  createModality({ ...values, organization_id: env.organization_id as string })
);
