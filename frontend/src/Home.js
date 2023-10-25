import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "reduxStore/hooks";

import { setUserDetail } from "./reduxStore/reducers/userDetailSlice";
import { selectSystemVariables } from "./reduxStore/reducers/systemVariables";
import { selectUserDetails } from "./reduxStore/reducers/userDetailSlice";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./css/Form.css";
import AdminLayout from "./layouts/AdminLayout.js";
import CanteenLayout from "./layouts/CanteenLayout.js";
import Login from "./views/commonPages/Login";
import authService from "./services/authService";

function Home() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localUserDetails = authService.getCurrentUser();
    console.log("localUserDetail : ", localUserDetails);
    if (localUserDetails) {
      dispatch(setUserDetail(localUserDetails));
    }
  }, []);

  useEffect(() => {
    console.log("Home || userDetails chnaged: ", userDetail);
  }, [userDetail]);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      {userDetail.role == SystemVariables.ROLES.ADMIN ? (
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
      ) : userDetail.role == SystemVariables.ROLES.CANTEEN_USER ? (
        <Routes>
          <Route path="/*" element={<CanteenLayout />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
