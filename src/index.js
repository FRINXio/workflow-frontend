import React from "react";
import ReactDOM from "react-dom";

import WorkflowApp from "frinx-workflow-ui/lib/App";
import WorkflowServiceApp from "frinx-workflow-ui/lib/ServiceUiApp";
import { HttpClient as http } from "frinx-workflow-ui/lib/common/HttpClient";

const conductorRbacApiUrlPrefix = "/workflow/proxy/rbac/editableworkflows";
const conductorApiUrlPrefix = "/workflow/proxy";
const frontendUrlPrefix = "/workflow/frontend";
const enableScheduling = true;
const disabledTasks = ['lambda'];
const prefixHttpTask = 'GLOBAL___';

http.get(conductorRbacApiUrlPrefix).then(isPrivileged => {
  let elementToRenderInto = document.getElementById("root");

  if (isPrivileged) {
    ReactDOM.render(
        <WorkflowApp
            backendApiUrlPrefix={conductorApiUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={enableScheduling}
            disabledTasks={disabledTasks}
            prefixHttpTask={prefixHttpTask}
        />,
        elementToRenderInto
    );
  } else {
    ReactDOM.render(
        <WorkflowServiceApp
            backendApiUrlPrefix={conductorApiUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={enableScheduling}
        />,
        elementToRenderInto
    );
  }
});


