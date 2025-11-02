"use client";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Image from "next/image";
import useAuthStore from "../../../store/useAuthStore";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleConfirm = () => setShowConfirmPassword(!showConfirmPassword);
  const togglePassword = () => setShowPassword(!showPassword);
  const { registerUser } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      password: "",
      confirmPassword: "",
      department: "",
      ministry: "",
      role: "",
      unit: "",
    },
    validationSchema: Yup.object({
      employeeId: Yup.string().required("Employee ID is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
      department: Yup.string().required("Department is required"),
      ministry: Yup.string().required("Ministry is required"),
      role: Yup.string().required("Role is required"),
      unit: Yup.string().required("Unit is required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      const userData = {
        employee_id: values.employeeId,
        password: values.password,
        confirm_password: values.confirmPassword,
        department: values.department,
        ministry: values.ministry,
        role: values.role,
        unit: values.unit,
      };

      try {
        const result = await registerUser(userData);
        if (result?.status) {
          toast.success(result.message);
          router.push("/login");
        } else {
          toast.error(result?.message || "Registration failed");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <div className="font-sans items-center justify-center flex bg-green">
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

        <div className="md:w-[50%] bg-white h-screen grid item-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full p-4 items-center md:p-0 flex flex-col justify-center"
          >
            <div className="grid justify-center items-center">
              <h2 className="text-[#333333] font-bold text-[24px] mb-2 mt-6">
                Create Account
              </h2>

              {/* Employee ID */}
              <div className="mb-2">
                <label
                  htmlFor="employeeId"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Type your employee ID..."
                  onChange={formik.handleChange}
                  value={formik.values.employeeId}
                  className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                />
                {formik.errors.employeeId && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.employeeId}
                  </div>
                )}
              </div>

              {/* Ministry */}
              <div className="mb-2">
                <label
                  htmlFor="ministry"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Ministry
                </label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.ministry}
                  name="ministry"
                  className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                >
                  <option value="">Select</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                </select>
                {formik.errors.ministry && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.ministry}
                  </div>
                )}
              </div>

              {/* Department */}
              <div className="mb-2">
                <label
                  htmlFor="department"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Department
                </label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.department}
                  name="department"
                  className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                >
                  <option value="">Select</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
                {formik.errors.department && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.department}
                  </div>
                )}
              </div>

              {/* Unit */}
              <div className="mb-2">
                <label
                  htmlFor="unit"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  placeholder="Type your unit..."
                  onChange={formik.handleChange}
                  value={formik.values.unit}
                  className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                />
                {formik.errors.unit && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.unit}
                  </div>
                )}
              </div>

              {/* Role */}
              <div className="mb-2">
                <label
                  htmlFor="role"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  placeholder="Type your role..."
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                />
                {formik.errors.role && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.role}
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                  />
                  <span
                    onClick={togglePassword}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    {showPassword ? <IoEyeSharp /> : <BsEyeSlashFill />}
                  </span>
                </div>
                {formik.errors.password && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-[#333333] font-normal"
                >
                  Confirm Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    className="w-full p-1 text-[12px] border border-[#D9D9D9] rounded outline-none"
                  />
                  <span
                    onClick={toggleConfirm}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    {showConfirmPassword ? <IoEyeSharp /> : <BsEyeSlashFill />}
                  </span>
                </div>
                {formik.errors.confirmPassword && (
                  <div className="text-red-500 text-[12px]">
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-flag-green text-[14px] text-white p-2 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-flag-green-dark"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Registering...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="flex text-[15px] items-center mt-4 justify-center">
                <p className="text-grayish">
                  Already have an account?{" "}
                  <a href="/login" className="text-flag-green font-bold">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </form>
          <div className="text-center text-[12px] mt-4 mb-4 text-grayish grid content-end">
            © {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}
