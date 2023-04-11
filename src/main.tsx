import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/app";
const rootNode = document.getElementById("app");
if (rootNode) {
  createRoot(rootNode).render(<App />);
}
