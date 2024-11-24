import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
  projectId: "copycatcapstone",
  keyFilename: "service_account.json",
});

export default db;
