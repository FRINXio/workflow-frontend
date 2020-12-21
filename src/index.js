import React from "react";
import ReactDOM from "react-dom";
import { ServiceUIApp, WorkflowApp } from "frinx-workflow-ui/dist";
// This is used to determine whether a user has admin rights
const conductorRbacApiUrlPrefix = "/workflow/proxy/rbac/editableworkflows";
// This is used to make calls in case user is not an admin
const conductorApiRbacProxyUrlPrefix = "/workflow/proxy/rbac";
const conductorApiUrlPrefix = "/workflow/proxy";
const frontendUrlPrefix = "/workflow/frontend";
const disabledTasks = ["lambda"];
const prefixHttpTask = "GLOBAL___";

const elementToRenderInto = document.getElementById("root");

fetch(conductorRbacApiUrlPrefix, {
  headers: { "content-type": "application/json" },
})
  .then((res) => res.json())
  .then((isPrivileged) => {
    if (isPrivileged) {
      ReactDOM.render(
        <WorkflowApp
          backendApiUrlPrefix={conductorApiUrlPrefix}
          frontendUrlPrefix={frontendUrlPrefix}
          enableScheduling
          disabledTasks={disabledTasks}
          prefixHttpTask={prefixHttpTask}
        ></WorkflowApp>,
        elementToRenderInto
      );
    } else {
      ReactDOM.render(
        <ServiceUIApp
          backendApiUrlPrefix={conductorApiRbacProxyUrlPrefix}
          frontendUrlPrefix={frontendUrlPrefix}
          enableScheduling={false}
        />,
        elementToRenderInto
      );
    }
  });
