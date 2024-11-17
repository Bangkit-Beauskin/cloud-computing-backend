"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const db = new firestore_1.Firestore({
    projectId: "secret-helper-407221",
    keyFilename: "./secret-helper-407221-8405a70edcc3.json",
});
exports.default = db;
//# sourceMappingURL=db.js.map