import React from "react";
import ReactDOM from "react-dom";

import WorkflowApp from "frinx-workflow-ui/lib/App";
import WorkflowServiceApp from "frinx-workflow-ui/lib/ServiceUiApp";
import { HttpClient as http } from "frinx-workflow-ui/lib/common/HttpClient";

// This is used to determine whether a user has admin rights
const conductorRbacApiUrlPrefix = "/workflow/proxy/rbac/editableworkflows";
// This is used to make calls in case user is not an admin
const conductorApiRbacProxyUrlPrefix = "/workflow/proxy/rbac";
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
            backendApiUrlPrefix={conductorApiRbacProxyUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={enableScheduling}
        />,
        elementToRenderInto
    );
  }
});


