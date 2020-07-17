import React from "react";
import ReactDOM from "react-dom";

import WorkflowApp from "frinx-workflow-ui/lib/App";
import WorkflowServiceApp from "frinx-workflow-ui/lib/ServiceUiApp";
import { HttpClient as http } from "frinx-workflow-ui/lib/common/HttpClient";

const conductorApiUrlPrefix = "/workflow/proxy";
const conductorRbacApiUrlPrefix = "/workflow/proxy/rbac/editableworkflows";
const frontendUrlPrefix = "/workflow/frontend";

http.get(conductorRbacApiUrlPrefix).then(isPrivileged => {
  let elementToRenderInto = document.getElementById("root");

  if (isPrivileged) {
    ReactDOM.render(
        <WorkflowApp
            backendApiUrlPrefix={conductorApiUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={true}
        />,
        elementToRenderInto
    );
  } else {
    ReactDOM.render(
        <WorkflowServiceApp
            backendApiUrlPrefix={conductorApiUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={true}
        />,
        elementToRenderInto
    );
  }
});


