import Header from "layouts/Header";
import Footer from "layouts/Footer";
import { Outlet, useLocation } from "react-router-dom";
import path from "path";
import { AUTH_PATH } from "constant";
// 레이아웃
export default function Container() {
  // state: 현재 페이지 path name 상태
  const { pathname } = useLocation();

  return (
    <>
      {pathname}
      <Header />
      <Outlet />
      {/* pathname이 /auth 아닐 때만 footer 적용 */}
      {pathname !== AUTH_PATH() && <Footer />}
    </>
  );
}
