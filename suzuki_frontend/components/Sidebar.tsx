import React, { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [sidebarValue, setSidebarValue] = useState("");

  const toggleSidebar = (value: any) => {
    sidebarValue === "" ? setSidebarValue(value) : setSidebarValue("");
  };

  return (
    <>
      <div className="text-black top-0">
        <nav className="fixed top-0 text-black bg-white p-4 w-[300px] h-screen overflow-y-auto custom-scrollbar">
          <h1 className="m-auto font-bold text-[32px] w-10 mb-[1em]">Logo</h1>
          <div className="!bg-[#F8F8F8] rounded-2xl  px-[11px] py-1 mt-2  ">
            <ul className="list-none px-3 rounded-2xl   mx-1  bg-white mb-4 mt-4 max-h-[calc(100% - 170px)] overflow-y-auto">
              {sidebarCollection.map((value, index) => {
                return (
                  <>
                    <li
                      className={`flex items-center justify-between h-16 
                    ${sidebarValue === value.value ? "text-primary" : ""}
                    `}
                      key={index}
                      onClick={() => toggleSidebar(value.value)}
                    >
                      <div className="flex ms-2 justify-between items-center w-full gap-2 cursor-pointer">
                        <div className="flex items-center gap-2">
                          {sidebarValue === value.value ? (
                            <div className="flex justify-end rounded-full ms-[-1.1em] bg-gradient-opacity w-[38px] h-[38px]">
                              <Image
                                src={value.imgUrl}
                                alt={value.imageDesc}
                                width={20}
                                height={20}
                                className=" "
                              />
                            </div>
                          ) : (
                            <Image
                              src={value.imgUrl}
                              alt={value.imageDesc}
                              width={20}
                              height={20}
                              className=""
                            />
                          )}

                          <div className="font-semibold text-md">
                            {value.value}
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
const sidebarCollection = [
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 2",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 3",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 4",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 5",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 6",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard7",
    value: "Dashboard 7",
  },
  {
    imgUrl: "/dashboard.svg",
    imageDesc: "dashboard8",
    value: "Dashboard 8",
  },
];
