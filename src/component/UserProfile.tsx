import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { catchErr } from "../utils/common_function";
import { useEffect, useState } from "react";
import { User, UserResponse, getUsers } from "../services/auth_service";

export default function UserProfile() {
  const [S_users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout());
      navigate("/signin");
    } catch (err) {
      catchErr(err);
    }
  };
  const fetchUsers = async () => {
    try {
      const res: UserResponse = await getUsers();

      setUsers(res?.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };
  useEffect(() => {
    fetchUsers();
    // const userResponse = await getUsers();
  });

  return (
    <>
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        
        
        <h1 className="text-white text-2xl">Web Reinvent</h1>
      </div>
      <button
      onClick={handleLogout}
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Log Out
      </button>
    </header>
      <div className="p-6">
        
        <h1 className="text-3xl font-bold mb-4">Users</h1>
        {/* <button className="px-3 py-2 font-semibold text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Logout
        </button> */}
        
        
       
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Avatar</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {S_users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">
                  <img
                    src={user.avatar}
                    alt={user.first_name}
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
