import { ActionFunction, json } from "@remix-run/node"; // or "@remix-run/cloudflare"
import { setupModalities } from "~/domain/modalities/setupModality";
import { updateOrganization } from "~/models/organization.server";
import { requireOrganizationId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const { organizationId } = await requireOrganizationId(request);
  
  const result = await setupModalities({ organization_id: organizationId });

  if (!result.success) {
    console.log(result.errors);

    return json(
      {
        error: true,
        message: "Erro ao fazer setup das modalidades.",
      },
      400
    );
  }

    await updateOrganization(organizationId, { configurations: { populated_modalities: true } });


  return json({
    error: false,
    message: "Setup das modalidades feita com sucesso.",
  });
};
