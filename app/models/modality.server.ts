import type { Modality, ModalityForm } from "~/domain/modalities/schema";
import type { OrganizationIdParams } from "./organization.server";
import { supabase } from "./user.server";

export async function getModalities({ organization_id }: OrganizationIdParams) {
  const { data } = await supabase
    .from("modalities")
    .select("id,name")
    .eq("organization_id", organization_id);

  return data;
}

export async function createModality(modality: ModalityForm) {
  const { data, error } = await supabase
    .from("modalities")
    .insert(modality)
    .single();

  if (!error) {
    return data;
  } else {
    throw error;
  }
}

export async function deleteModality({
  id,
  organization_id,
}: Pick<Modality, "id"> & OrganizationIdParams) {
  const { error } = await supabase
    .from("modalities")
    .delete({ returning: "minimal" })
    .match({ id, organization_id });

  if (!error) {
    console.log(error);
    return {};
  }

  return null;
}

export async function getModality({
  id,
  organization_id,
}: Pick<Modality, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from("modalities")
    .select("*")
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Modality;
  }

  return null;
}

export async function updateModality(id: string, modality: ModalityForm) {
  const { data, error } = await supabase
    .from("modalities")
    .update(modality)
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  return null;
}
