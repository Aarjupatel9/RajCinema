import React, { useState } from "react";
import { selectSystemVariables } from "reduxStore/reducers/systemVariables";
import {
  setUserDetail,
  selectUserDetails,
} from "reduxStore/reducers/userDetailSlice";
import { useAppDispatch, useAppSelector } from "reduxStore/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userLoginValidator } from "validators/authValidator";
import authService from "../services/auth.service";

import "css/Login.css";

function Login() {
  const SystemVariables = useAppSelector(selectSystemVariables);
  const userDetail = useAppSelector(selectUserDetails);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    var cred = {
      mobile: mobile,
      password: password,
    };
    const { error } = userLoginValidator.validate(cred);
    console.log("validation error : ", error);
    if (error) {
      toast.error(error.toString());
      return;
    }

    const loginPromise = authService.login(cred);
    toast.promise(
      loginPromise,
      {
        loading: "please wait while we verify you",
        success: (data) => data.message,
        error: (err) => {
          return err;
        },
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 4000,
          icon: "🔥",
        },
        error: {
          duration: 4000,
          icon: "🔥",
        },
      }
    );

    loginPromise
      .then((response) => {
        if (response.userProfile) {
          response.user.isProfile = true;
        } else {
          response.user.isProfile = false;
        }
        localStorage.setItem("user", JSON.stringify(response.user));
        dispatch(setUserDetail(response.user));
      })
      .catch((message) => {
        console.error(message);
        // toast.error(message);
      });
  };

  return (
    <>
      <div className="content ">
        <section className="vh-100 custom-background">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card custom-card">
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                        alt="login form"
                        className="img-fluid custom-image"
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <form action="" onSubmit={handleLogin}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i className="fas fa-cubes fa-2x me-3 custom-ico"></i>
                            <span className="h1 fw-bold mb-0">Logo</span>
                          </div>

                          <h5 className="fw-normal mb-3 pb-3 custom-heading ">
                            Sign in
                          </h5>

                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              id="form2Example17"
                              className="form-control "
                              value={mobile}
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example17"
                            >
                              Email address
                            </label>
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              id="form2Example27"
                              className="form-control "
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example27"
                            >
                              Password
                            </label>
                          </div>

                          <div className="pt-1 mb-4">
                            <button
                              className="btn btn-dark btn-lg btn-block"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
