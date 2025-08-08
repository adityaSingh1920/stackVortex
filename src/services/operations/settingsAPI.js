import { apiConnector } from "../apiConnector";
import { settingsapi } from "../apis";
import { setUser } from "../../Redux/Slices/profileSlice";
import { setTokens } from "../../Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { resetCart } from "../../Redux/Slices/cartSlice";

const {
  UPDATE_PROFILE_API,
  UPDATE_PROFILE_PICTURE_API,
  DELETE_PROFILE_API,
} = settingsapi;

export function updateProfile(data, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        { Authorization: `Bearer ${token}` },
        data
      );

      if (response?.data?.success) {
        toast.success("Profile updated successfully");
        dispatch(setUser(response.data.updatedUser));
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
}

export function updateProfilePicture(formData, setLoading) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_PICTURE_API,
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        formData
      );

      if (response?.data?.success) {
        toast.success("Profile picture updated");
        dispatch(setUser(response.data.updatedUser));
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update picture");
    } finally {
      setLoading(false);
    }
  };
}

export function deleteAccount(navigate) {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API,
        { Authorization: `Bearer ${token}` }
      );

      if (response?.data?.success) {
        toast.success("Account deleted successfully");
        dispatch(setTokens(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    }
  };
}
