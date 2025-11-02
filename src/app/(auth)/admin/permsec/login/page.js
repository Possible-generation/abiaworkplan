"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Image from "next/image";
import usePermsecAuthStore from "../../../../../store/admin/usePermsecAuthStore";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const { loginUser } = usePermsecAuthStore();

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      password: "",
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const credentials = {
          employee_id: values.employeeId,
          password: values.password,
        };
        const result = await loginUser(credentials);
        if (result?.status) {
          toast.success(result.message);
          router.push("/admin/permsec/dashboard");
        } else {
          toast.error(result?.message || "Login failed");
        }
      } catch (err) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="font-sans flex bg-green">
        <ToastContainer />
        <div className="md:w-[50%] bg-[url('/loginbg.png')] bg-cover bg-center hidden md:block bg-flag-green h-screen items-center">
          <Image
            src={"/workplanlogo.png"}
            alt="Logo"
            className="m-2"
            width={150}
            height={150}
          />
          <div className="text-white mt-50 ml-4 grid content-center">
            <h1 className="text-[24px] font-bold">Empower your workflow.</h1>
            <h1 className="text-[20px] font-bold">Stay accountable.</h1>
            <p className="text-[16px] mt-2">
              Efficient task planning and accountability for every staff member.
            </p>
          </div>
        </div>

        <div className="md:w-[50%] w-full bg-white h-screen grid item-center justify-center">
          <form
            className="w-full md:mt-10 mt-6 flex flex-col justify-center"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <h2 className="text-2xl mb-4 text-[20px] font-bold">
                Login to your account
              </h2>

              {/* Employee ID */}
              <div className="mb-4">
                <label
                  htmlFor="employeeId"
                  className="block mb-2 text-[#333333] font-normal text-[15px]"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  placeholder="name@example.com"
                  onChange={formik.handleChange}
                  value={formik.values.employeeId}
                  className="w-full p-2 border text-[12px] border-gray-300 rounded outline-none focus:border-green"
                />
                {formik.errors.employeeId && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.employeeId}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block mb-2 text-[#333333] font-normal text-[15px]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="*********"
                    className="w-full p-2 border text-[12px] border-gray-300 rounded"
                  />
                  <span className="absolute right-3 top-3 cursor-pointer">
                    {showPassword ? (
                      <IoEyeSharp onClick={togglePassword} />
                    ) : (
                      <BsEyeSlashFill onClick={togglePassword} />
                    )}
                  </span>
                </div>
                {formik.errors.password && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Submit Button with Spinner */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-flag-green mt-3 p-2 cursor-pointer text-white rounded-md hover:bg-flag-green-dark transition-colors duration-200 flex justify-center items-center ${
                  loading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
              {/* Remember Me & Forgot Password */}
              <div className="flex gap-12 justify-between">
                <label className="inline-flex text-[15px] items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 text-flag-green border-flag-green rounded accent-flag-green focus:flag-green"
                  />
                  <span className="ml-1 text-[#333333] text-[14px]">
                    Remember me
                  </span>
                </label>
                <p>
                  <a
                    href="/forgot-password"
                    className="text-flag-green text-[14px]"
                  >
                    Forgot Password?
                  </a>
                </p>
              </div>

              {/* Register Link */}
              <div className="mt-4 text-[14px] items-center text-center">
                <p>
                  Don't have an account?{" "}
                  <a href="/admin/permsec/register" className="text-flag-green">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center text-[12px] mb-4 mt-4 text-grayish grid content-end">
            copyright &copy; {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
