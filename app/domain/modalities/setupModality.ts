import { makeDomainFunction } from "remix-domains";
import { z } from "zod";
import { createModality } from "~/models/modality.server";

export const modalityList = [
  "Jiu-jitsu",
  "Defesa Pessoal",
  "Capoeira",
  "Karatê",
  "Judô",
  "Luta Livre",
  "MMA",
  "Muay Thai",
  "Taekwondo",
  "Krav Maga",
  "Boxe",
];

export const setupModalities = makeDomainFunction(
  z.object({ organization_id: z.string() })
)(async ({ organization_id }, env) => {
  const modalitiesPromises = modalityList.map((name) =>
    createModality({ name, organization_id })
  );

  return await Promise.all(modalitiesPromises);
});
