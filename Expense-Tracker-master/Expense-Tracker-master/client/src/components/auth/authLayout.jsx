import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-md p-6 bg-blue shadow-lg rounded-lg bg-gray-700">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
