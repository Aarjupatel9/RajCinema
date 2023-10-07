
import { handleRejectResponse } from "./systemService"

class UserService {



    //canteen
    removeCanteenDetails(id) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: id })
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/canteen/removeCanteen", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    updateCanteenDetails(data) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify(data)
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/canteen/updateCanteens", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getCanteenDetails(id) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ _id: id })
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/canteen/getCanteen", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    getAllCanteens() {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/canteen/getAllCanteens", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getNewUserDetails arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }
    transferSelectedProductToCanteen(canteenId, products) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body: JSON.stringify({ canteenId: canteenId, products: products })
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/admin/transferProducts", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in transferSelectedProductToCanteen arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject("failed to fetch");
                });
        });
    }

    //canteen specific

    getAllProducts(canteenId) {
        return new Promise(function (resolve, reject) {
            const options = {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Method": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                },
                body:JSON.stringify({canteenId :canteenId})
            };
            fetch(process.env.REACT_APP_API_SERVER + "/api/canteen/getAllCanteenProducts", options)
                .then((response) => {
                    console.log("fetch then response :", response);
                    return response.json();
                })
                .then((res) => {
                    console.log("response in getAllProducts arrive : ", res);
                    if (res.success) {
                        resolve(res);
                    } else {
                        handleRejectResponse(res.message);
                        reject(res.message);
                    }
                })
                .catch((e) => {
                    console.log("error : ", e);
                    reject(e);
                });
        });
    }

}

export default new UserService();
