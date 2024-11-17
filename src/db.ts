import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "secret-helper-407221",
  keyFilename: "./service_account.json",
});

export default db;
