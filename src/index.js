import React from "react";
import ReactDOM from "react-dom";

import WorkflowApp from "frinx-workflow-ui/lib/App";
import WorkflowServiceApp from "frinx-workflow-ui/lib/ServiceUiApp";
import { HttpClient as http } from "frinx-workflow-ui/lib/common/HttpClient";

const conductorApiUrlPrefix = "/workflow";
const conductorRbacApiUrlPrefix = conductorApiUrlPrefix + "/rbac";
const frontendUrlPrefix = "/workflow/frontend";

// TODO invoke /editableworkflows and return WorkflowServiceApp in case of "false"
// just like in magma/symphony/app/fbcnms-projects/hub/app/components/Main.js
ReactDOM.render(
  <WorkflowApp
    backendApiUrlPrefix={conductorApiUrlPrefix}
    frontendUrlPrefix={frontendUrlPrefix}
    enableScheduling={true}
  />,
  document.getElementById("root")
);
