import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "beauskin",
  keyFilename: "service_account.json",
});

export default db;
