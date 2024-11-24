import { ApiServiceResponse } from "../../@types/apiServiceResponse";

export default interface AuthService {
  login: (body: any) => Promise<ApiServiceResponse>;
  register: (body: any) => Promise<ApiServiceResponse>;
<<<<<<< HEAD
  validateOTP: (body) => Promise<ApiServiceResponse>;
=======
  validateOTP: (body, user_id) => Promise<ApiServiceResponse>;
>>>>>>> staging
}
