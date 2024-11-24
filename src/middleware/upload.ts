import Multer from "multer";
import util from "util";

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");

const processFileMiddleware = (req, res, next) => {
  processFile(req, res, (err) => {
    if (err) {
      console.log(err);
      // If there's an error (e.g., file too large), return an error response
      return res.status(400).send(`Error processing file: ${err.message}`);
    }

    // If no errors, call next() to continue with the next middleware/handler
    next();
  });
};

export default processFileMiddleware;
