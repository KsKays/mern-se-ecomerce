import React from "react";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm breadcrumbs p-4 bg-gray-100 rounded-lg w-full flex justify-start">
      <ul className="flex space-x-2">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={to} className="flex items-center">
              {index !== 0 && <span className="mx-2">/</span>}
              {isLast ? (
                <span className="text-gray-500">{value}</span>
              ) : (
                <Link to={to} className="text-blue-600 hover:underline">
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

import { Outlet } from "react-router";
import logo from "/admin.png";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const DashBoardLayout = () => {
  const isAdmin = true;
  return (
    <>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-start  w-full p-4">
            <Breadcrumb />
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <li>
                <a href="/Dashboard" className="flex justify-start mb-3">
                  <img src={logo} className="w-20" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Menu</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/Dashboard">
                  <MdDashboardCustomize />
                  Dashboard
                </a>
              </li>
              <li>
                <a>
                  <FaBagShopping />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/Dashboard/Add-Product">
                  <IoIosAddCircle />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/Dashboard/Manage-items">
                  <RiAlignItemLeftLine />
                  Manage Items
                </a>
              </li>
              <li>
                <a href="/Dashboard/User-manage">
                  <FaUser />
                  All Users
                </a>
              </li>
              <div class="relative flex py-5 items-center">
                <div class="flex-grow border-t border-gray-400"></div>
                <span class="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div class="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Product</a>
              </li>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Suppo</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>You are not an Admin</div>
      )}
    </>
  );
};

export default DashBoardLayout;
