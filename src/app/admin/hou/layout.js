// // export default function Layout({ children }) {
// //   return (
// //     <div>
// //       <header>
// //         <h1>Admin Layout</h1>
// //       </header>
// //       <main>{children}</main>
// //     </div>
// //   );
// // }
// // components/Layout.js
// "use client";

// import { useState, useEffect } from "react";
// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   FileText,
//   Loader,
//   Settings,
//   ChevronDown,
//   LogOut,
// } from "lucide-react";

// const Layout = ({ children }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile screen
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);
//       if (mobile) {
//         setIsSidebarOpen(false); // close by default on mobile
//       } else {
//         setIsSidebarOpen(true); // open on desktop
//       }
//     };

//     handleResize(); // run on load
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/admin/hou/dashboard",
//       icon: LayoutDashboard,
//       title: "Dashboard",
//     },
//     {
//       name: "Work Plan",
//       path: "/admin/hou/workplan",
//       icon: FileText,
//       title: "Work Plan",
//     },
//     {
//       name: "Performance Review",
//       path: "/admin/hou/performancereview",
//       icon: Loader,
//       title: "Performance Review",
//     },
//     // {
//     //   name: "Analytics",
//     //   path: "/analytics",

//     //   icon: Layers,
//     //   title: "Analytics",
//     // },
//   ];

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("Logging out...");
//     router.push("/login");
//   };
//   const handleMenuClick = () => {
//     if (isMobile) setIsSidebarOpen(false); // hide after click on mobile
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <nav className="bg-white  lg:pr-10 py-2 fixed w-full top-0 z-30">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex items-center">
//               <button
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                 className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               </button>
//               <div className="flex items-center ml-4 mt-1 mb-1 lg:ml-0">
//                 <div className="flex-shrink-0  flex items-center">
//                   <Image
//                     src="/dashboardlogo.png" // Replace with your logo path
//                     alt="Logo"
//                     width={150}
//                     height={40}
//                     className=""
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* <div>
//               <h1 className="text-lg font-semibold text-gray-800">
//                 {menuItems.find((item) => pathname.startsWith(item.path))
//                   ?.title || "Dashboard"}
//               </h1>
//             </div> */}

//             {/* Profile Picture */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <button className="flex items-center space-x-3 text-sm rounded-full focus:outline-none">
//                   <div className="h-10 w-10 bg-gray-300 rounded-full border overflow-hidden">
//                     <Image
//                       src="/biancajones.jpg"
//                       alt="Profile Picture"
//                       width={100}
//                       height={100}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <span className="hidden md:block text-gray-700 font-medium">
//                     John Doe
//                   </span>
//                   <ChevronDown size={20} className="text-gray-700" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <div className="flex flex-col h-full pt-16">
//           {/* Menu Items */}

//           <nav className="flex-1 py-6 space-y-2">
//             {menuItems.map((item) => {
//               const isActive = pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   onClick={handleMenuClick} // auto-hide on mobile
//                   className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                     isActive
//                       ? "bg-flag-green text-white"
//                       : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//                   }`}
//                 >
//                   <span className="mr-3 text-lg">
//                     {React.createElement(item.icon, {
//                       size: 20,
//                       className: isActive
//                         ? "text-white"
//                         : "text-flag-green group-hover:text-flag-green",
//                     })}
//                   </span>
//                   {item.name}
//                 </Link>
//               );
//             })}
//           </nav>
//           {/* Logout Button */}
//           <div className="px-4 py-6 border-t border-gray-200">
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-4 py-3 text-flag-green  font-bold  rounded-lg  transition-colors duration-200"
//             >
//               <span className="mr-3 text-lg">
//                 <LogOut size={20} />
//               </span>
//               <span className="text-flag-green">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className={`transition-all duration-300 ease-in-out ${
//           isSidebarOpen ? "lg:ml-64" : "ml-0"
//         }`}
//       >
//         <main className="pt-16 bg-gray-100 min-h-screen">
//           <div className=" ">{children}</div>
//         </main>
//       </div>

//       {/* Mobile sidebar overlay */}
//       {isSidebarOpen && isMobile && (
//         <div
//           className="fixed inset-0 z-10  bg-black/30 backdrop-opacity-50 blur-sm lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Layout;

"use client";

import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Loader,
  Settings,
  ChevronDown,
  LogOut,
  Layers,
} from "lucide-react";
import UsehouAuthStore from "../../../store/admin/usehouAuthStore";
// import useAdminDashboardStore from "../../../store/admin/useAdminDashboardStore";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { token, logoutUser, hasHydrated } = UsehouAuthStore();
  // const { user, fetchAdminDashboard, loading, error } =
  //   useAdminDashboardStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // useEffect(() => {
  //   fetchAdminDashboard();
  // }, [fetchAdminDashboard]);
  //  Redirect if no token
  useEffect(() => {
    if (hasHydrated && !token) {
      router.push("/admin/hou/login");
    }
  }, [hasHydrated, token, router]);

  // useEffect(() => {
  //   if (hasHydrated && !token) {
  //     router.push("/admin/hod/login");
  //   }
  // }, [token, router]);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // close by default on mobile
      } else {
        setIsSidebarOpen(true); // open on desktop
      }
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/hou/dashboard",
      icon: LayoutDashboard,
      title: "Dashboard",
    },
    // {
    //   name: "Work Plan",
    //   path: "/admin/hou/workplan",
    //   icon: FileText,
    //   title: "Work Plan",
    // },
    // {
    //   name: "Performance Review",
    //   path: "/admin/hou/performancereview",
    //   icon: Loader,
    //   title: "Performance Review",
    // },
    // {
    //   name: "Analytics",
    //   path: "/admin/permsec/analytics",

    //   icon: Layers,
    //   title: "Analytics",
    // },
  ];
  const handleLogout = () => {
    logoutUser();
    router.push("/admin/hou/login");
  };
  const handleMenuClick = () => {
    if (isMobile) setIsSidebarOpen(false); // hide after click on mobile
  };

  // ✅ UI rendering conditions (not hooks)
  if (!hasHydrated) {
    return <p className="p-4">Loading...</p>;
  }

  if (!token) {
    return <p className="p-4">Redirecting...</p>;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="bg-white lg:pr-10 py-2 fixed w-full top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo & Mobile toggle */}
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div className="flex items-center ml-4 lg:ml-0">
                  <Image
                    src="/dashboardlogo.png"
                    alt="Logo"
                    width={150}
                    height={40}
                  />
                </div>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 text-sm rounded-full focus:outline-none"
                  >
                    <div className="h-10 w-10 bg-gray-300 rounded-full  overflow-hidden">
                      <Image
                        src="/avatarlogo.png"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden lg:flex flex-col">
                      <span className="font-bold">John Doe</span>
                      <span className="font-normal text-gray-400">
                        Engineering
                      </span>
                    </div>
                    <ChevronDown size={20} className="text-gray-700" />
                  </button>

                  {isProfileOpen && (
                    <>
                      {/* Mobile modal */}
                      {isMobile ? (
                        <div className="absolute right-0 top-14 w-64 bg-white shadow-lg rounded-xl p-4 z-40">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="h-12 w-12 bg-gray-300 rounded-full overflow-hidden">
                              <Image
                                src="/avatarlogo.png"
                                alt="Profile Picture"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold">John Doe</p>
                              <p className="text-gray-500 text-sm">
                                Engineering
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Desktop dropdown
                        <div className="absolute right-0  top-14 w-56 bg-white shadow-lg rounded-xl p-3 z-40">
                          <p className="px-3 py-2 text-sm text-gray-700">
                            Signed in as{" "}
                            <span className="font-bold">John Doe</span>
                          </p>
                          <p className="px-3 py-2 text-xs text-gray-500 ">
                            Engineering
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex flex-col h-full pt-16">
            {/* Menu Items */}

            <nav className="flex-1 py-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleMenuClick} // auto-hide on mobile
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-flag-green text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3 text-lg">
                      {React.createElement(item.icon, {
                        size: 20,
                        className: isActive
                          ? "text-white"
                          : "text-flag-green group-hover:text-flag-green",
                      })}
                    </span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            {/* Logout Button */}
            <div className="px-4 py-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-flag-green  font-bold  rounded-lg  transition-colors duration-200"
              >
                <span className="mr-3 text-lg">
                  <LogOut size={20} />
                </span>
                <span className="text-flag-green">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : "ml-0"
          }`}
        >
          <main className="pt-16 bg-gray-100 min-h-screen">
            <div className=" ">{children}</div>
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        {isSidebarOpen && isMobile && (
          <div
            className="fixed inset-0 z-10  bg-black/30 backdrop-opacity-50 blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
    //   )}
    // </div>
  );
};

export default Layout;
