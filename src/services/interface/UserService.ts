import { ApiServiceResponse } from "../../@types/apiServiceResponse";

export default interface UserService {
  updateProfile: (body, file, id) => Promise<ApiServiceResponse>;
}
