"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const error_1 = require("./utils/error");
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./config/passport");
exports.app = (0, express_1.default)();
exports.app.use(
  (0, cors_1.default)({
    origin: "*",
  }),
);
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(express_1.default.json());
passport_1.default.use("jwt", passport_2.jwtStrategy);
exports.app.use(passport_1.default.initialize());
exports.app.use("/api/version", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("v1.0.0");
  }),
);
exports.app.use("/api/v1", routes_1.default);
exports.app.use((req, res, next) => {
  next(new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not found"));
});
exports.app.use(error_1.errorConverter);
exports.app.use(error_1.errorHandler);
//# sourceMappingURL=app.js.map
