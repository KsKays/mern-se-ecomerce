import { Outlet } from "react-router";
import React, { isValidElement } from "react";
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
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <Outlet/>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      
      <li><a href="/dashboard" className="flex justify-start mb-3">
      <img src={logo} className="w-20"/>
      <div className="badge badge-primary">Admin</div>
      </a></li>
      <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-gray-400"></div>
    <span class="flex-shrink mx-4 text-gray-400">Menu</span>
    <div class="flex-grow border-t border-gray-400"></div>
</div>
      <li><a><MdDashboardCustomize/>Dashboard</a></li>
      <li><a><FaBagShopping/>Manage Orders</a></li>
      <li><a href="/dashboard/add-product"><IoIosAddCircle/>Add Product</a></li>
      <li><a href="/dashboard/manage-items"><RiAlignItemLeftLine/>Manage Items</a></li>
      <li><a><FaUser/>All Users</a></li>
      <div class="relative flex py-5 items-center">
    <div class="flex-grow border-t border-gray-400"></div>
    <span class="flex-shrink mx-4 text-gray-400">Hot Link</span>
    <div class="flex-grow border-t border-gray-400"></div>
</div>
      <li><a>Home</a></li>
      <li><a>Product</a></li>
      <li><a>Order Tracking</a></li>
      <li><a>Customer Suppo</a></li>
    </ul>
  </div>
</div>
                
            ) : (
                <div>You are not an Admin</div>
            )}
        </>
    );
}

export default DashBoardLayout;
