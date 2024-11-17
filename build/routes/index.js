"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const router = (0, express_1.Router)();
const routes = [
    {
        path: "/auth",
        routes: AuthRoutes_1.default,
    },
];
routes.forEach((route) => {
    router.use(route.path, route.routes);
});
exports.default = router;
//# sourceMappingURL=index.js.map