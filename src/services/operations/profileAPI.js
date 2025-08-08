import { setUser } from "../../Redux/Slices/profileSlice";
import { apiConnector } from "../apiConnector"; // make sure this exists
import { toast } from "react-hot-toast";

const PROFILE_API = {
  GET_USER_PROFILE_API: "/api/v1/profile/getAllUserDetails",
};

export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", PROFILE_API.GET_USER_PROFILE_API);

      if (!response.data.success) {
        throw new Error("Failed to fetch profile");
      }

      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("GET_USER_PROFILE_API Error:", error);
      toast.error("Could not load user profile");
    }
  };
};
