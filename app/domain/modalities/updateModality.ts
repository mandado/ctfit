import { makeDomainFunction } from "remix-domains";
import { updateModality as updateModalityData } from "~/models/modality.server";
import { EnvironmentSchema } from "~/shared/schemas/environment";
import { ModalitySchema } from "./schema";

export const updateModality = (id: string) =>
  makeDomainFunction(
    ModalitySchema,
    EnvironmentSchema
  )(async (values, env) =>
    updateModalityData(id, { ...values, organization_id: env.organization_id })
  );
