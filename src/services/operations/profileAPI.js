import { setUser } from "../../Redux/Slices/profileSlice";
import { apiConnector } from "../apiConnector"; // make sure this exists
import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis"; // adjust path to where profileEndpoints is exported
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;


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



export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}
