import axios from "./axios";

export const handleUser = (data: any) =>
  axios
    .post("/add-user", data)
    .then((response) => response?.data)
    .catch((error) => {
      throw error;
    });

export const GetAllUsers = () =>
  axios
    .get("/users")
    .then((response) => response?.data)
    .catch((error) => {
      throw error;
    });

export const deleteUser = (id: string) => {
  axios
    .delete(`/user/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export const updateUser = (id: string, data: any) => {
  axios
    .put(`/user/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export const getUserById = (id: any) => {
  axios
    .get(`/user/${id}`)
    .then((response) => response.data.user)
    .catch((error) => {
      throw error;
    });
}

export const ActivateAdmins = (email: any) => {
  console.log("activate admins email: ", email);

  axios
    .post("/auth/superadmin/activate", { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const DeActivateAdmins = (email: any) => {
  console.log("activate admins email: ", email);

  axios
    .post("/auth/superadmin/deactivate", { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

