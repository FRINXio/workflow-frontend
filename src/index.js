import React from "react";
import ReactDOM from "react-dom";

import WorkflowApp from "frinx-workflow-ui/lib/App";
import {globalConstants} from "frinx-workflow-ui/lib/common/GlobalContext";
import WorkflowServiceApp from "frinx-workflow-ui/lib/ServiceUiApp";
import {HttpClient as http} from "frinx-workflow-ui/lib/common/HttpClient";

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
    // FIXME this is redundant since the same is propagated via WorkflowApp.props
    // However, if we don't override the globalConstants, there is an issue in workflow-ui
    // where: After executing a workflow from def view, and clicking on the executed workflow ID
    // the UI redirects you to the exec tab, but all of a sudden uses backendApiUrlPrefix from globalConstants
    // instead of the one passed via properties into ContextProvider
    globalConstants.backendApiUrlPrefix = conductorApiUrlPrefix;
    globalConstants.frontendUrlPrefix = frontendUrlPrefix;
    globalConstants.disabledTasks = disabledTasks;
    globalConstants.enableScheduling = enableScheduling;
    globalConstants.prefixHttpTask = prefixHttpTask;

    ReactDOM.render(
        <WorkflowApp
            backendApiUrlPrefix={conductorApiUrlPrefix}
            frontendUrlPrefix={frontendUrlPrefix}
            enableScheduling={enableScheduling}
            disabledTasks={disabledTasks}
            prefixHttpTask={prefixHttpTask}>
        </WorkflowApp>,
        elementToRenderInto
    );
  } else {
      // FIXME redundant, same as above
    globalConstants.backendApiUrlPrefix = conductorApiRbacProxyUrlPrefix;
    globalConstants.frontendUrlPrefix = frontendUrlPrefix;
    globalConstants.disabledTasks = disabledTasks;
    globalConstants.enableScheduling = false;
    globalConstants.prefixHttpTask = prefixHttpTask;

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


