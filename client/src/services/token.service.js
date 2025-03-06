import { Cookies } from "react-cookie";

const cookies = new Cookies();


//ใช้เพื่อดึง Access Token เพื่อใช้กับ API Requests
const getLocalAccessToken = () => {
  const user = getUser();
  return user?.token;
};


//ใช้เพื่อตรวจสอบว่า มีข้อมูลผู้ใช้เก็บอยู่หรือไม่
const getUser = () => {
  const user = cookies.get("user");
  return user;
};


//ใช้เมื่อต้องการให้ผู้ใช้ล็อกเอาต์ และลบข้อมูลออกจาก Cookies
const removeUser = () => {
  cookies.remove("user", { path: "/" });
};


//ใช้เมื่อล็อกอินสำเร็จ แล้วต้องการบันทึกข้อมูลผู้ใช้ลงใน Cookies
const setUser = (user) => {
  cookies.set("user", JSON.stringify(user), {
    path: "/",
    expires: new Date(Date.now() + 86400 * 1000),
  });
  return setUser;
};


//ใช้เพื่อให้โค้ดส่วนอื่นเรียกใช้งานการจัดการ Cookies ได้
const TokenService = {
  getLocalAccessToken,
  getUser,
  removeUser,
  setUser,
};

export default TokenService;
