"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("@google-cloud/firestore");
const db = new firestore_1.Firestore({
    projectId: "copycatcapstone",
    keyFilename: "service_account.json",
});
exports.default = db;
//# sourceMappingURL=db.js.map