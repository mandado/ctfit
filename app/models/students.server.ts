import type { Student, StudentForm } from "~/domain/students/schema";
import type { OrganizationIdParams } from "./organization.server";
import { supabase } from "./user.server";

export async function getStudents({ organization_id }: OrganizationIdParams) {
  const { data } = await supabase
    .from("students")
    .select(
      `*,     
      modalities (
        id,
        name
      )
      `
    )
    .eq("organization_id", organization_id);

  return data;
}

export async function createStudent(student: StudentForm) {
  const { data, error } = await supabase
    .from("students")
    .insert(student)
    .single();

  if (!error) {
    return data;
  }

  return null;
}
export async function updateStudent(id: string, student: StudentForm) {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function deleteStudent({
  id,
  organization_id,
}: Pick<Student, "id"> & OrganizationIdParams) {
  const { error } = await supabase
    .from("students")
    .delete({ returning: "minimal" })
    .match({ id, organization_id: organization_id });

  if (!error) {
    return {};
  }

  return null;
}

export async function getStudent({
  id,
  organization_id,
}: Pick<Student, "id"> & OrganizationIdParams) {
  const { data, error } = await supabase
    .from("students")
    .select(
      `*, 
      modality:modalities (
        id, name
      )
    `
    )
    .eq("organization_id", organization_id)
    .eq("id", id)
    .single();

  if (!error) {
    return data as Student;
  }

  return null;
}
