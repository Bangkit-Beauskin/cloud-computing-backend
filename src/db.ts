import { Firestore } from "@google-cloud/firestore";

const db = new Firestore({
<<<<<<< HEAD
  projectId: "secret-helper-407221",
  keyFilename: "./service_account.json",
=======
  projectId: "copycatcapstone",
  keyFilename: "service_account.json",
>>>>>>> staging
});

export default db;
