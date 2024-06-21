import Head from 'next/head';
import React from 'react';
import { deleteUser, GetAllUsers } from '../network-request/api';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

const UsersPage = () => {
  const [user, setUser] = React.useState([]);
  const router = useRouter();

  const getAllUsers = React.useCallback(async () => {
    try {
      const response = await GetAllUsers();
      // console.log({ response });
      const value = response?.response;
      setUser(value);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDeleteUser = React.useCallback(async (id: string) => {
    try {
      const response = await deleteUser(id)
      console.log({ response })
      await getAllUsers();
      toast.success("User delete successfully");
    } catch (error: any) {
      console.error("Error fetching users:", error);

    }
  }, [getAllUsers])

  const handleUpdateUser = (id: string) => {
    router.push(`/update-user?id=${id}`);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <Head>
        <title>Users List</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Users List</h1>
      <div className="flex flex-wrap -mx-4 mb-4">
        {user.map((user: any, index) => (
          <div key={index} className="w-full md:w-1/2 xl:w-1/3 p-4">
            <div className="bg-white rounded shadow-md p-4">
              <h2 className="text-lg font-bold">{user.user}</h2>
              <p className="text-gray-600">Interests: {user.interest.join(", ")}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Mobile: {user.mobile}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <div className="flex justify-between mt-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleUpdateUser(user._id)} >
                  Update
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteUser(user?._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
