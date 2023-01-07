import App from "./App.js";
import express from "express";
const application = new App();
const app = express();

application.init("../src/SweartL.glb", "webgl");
