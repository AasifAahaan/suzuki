"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Maininputfield from "../../components/Maininputfield";
import Button from "../../components/Button";
import { handleUser } from "../../network-request/api";

function AddUser() {
  const [user, setUser] = useState({
    user: "",
    email: "",
    mobile: "",
    age: ""
  });
  const [errors, setErrors] = useState({
    user: "",
    email: "",
    mobile: "",
    age: ""
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {
      user: "",
      email: "",
      mobile: "",
      age: ""
    };

    if (!user.user.match(/^[a-zA-Z ]+$/)) {
      newErrors.user = "Name should not contain numbers or special characters";
      isValid = false;
    }
    if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!user.mobile.match(/^[0-9]{10}$/)) {
      newErrors.mobile = "Mobile number should be 10 digits long and contain only numbers";
      isValid = false;
    }
    if (!user.age.match(/^[0-9]+$/)) {
      newErrors.age = "Age should contain only numbers";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const signupHandler = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await handleUser(user);
      console.log("response", response);
      toast.success("User created successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("Signup failed: ", error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Add User
          </h1>
          <div className="space-y-4 md:space-y-6">
            <div>
              <Maininputfield
                label="Name"
                placeholder="Enter your name"
                className="w-full"
                onChange={(e: any) => handleChange("user", e.target.value)}
                value={user.user}
              />
              {errors.user && <p className="text-xs text-red-500">{errors.user}</p>}
            </div>

            <div>
              <Maininputfield
                label="Email"
                placeholder="Enter your email address"
                value={user.email}
                className="w-full"
                onChange={(e: any) => handleChange("email", e.target.value)}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <Maininputfield
                label="Mobile"
                placeholder="Enter your mobile number"
                value={user.mobile}
                className="w-full"
                onChange={(e: any) => handleChange("mobile", e.target.value)}
              />
              {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
            </div>

            <div>
              <Maininputfield
                label="Age"
                placeholder="Enter your age"
                value={user.age}
                className="w-full"
                onChange={(e: any) => handleChange("age", e.target.value)}
              />
              {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
            </div>

            {/* <Button onClick={signupHandler} loading={loading}>
              Add User
            </Button> */}
            <Button
              onClick={signupHandler}
              className="rounded-md"
              text={loading ? "Processing..." : "Add User"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
