import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "services/userService";
import toast from "react-hot-toast";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import canteenService from "services/canteenService";

function CanteenProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    console.log("id : ", id);
    const productPromise = canteenService.getAllCanteenProducts(id);
    productPromise
      .then((res) => {
        console.log("products response : ", res);
        if (res.products) {
          setProducts(res.products);
        }
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, [id]);

  function handleActualProductRemove(id) {
    console.log("you said yes");
    // return;
    const updateProductPromise = userService.removeProductDetails(id);
    updateProductPromise.then((res) => {
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    });
    toast.promise(
      updateProductPromise,
      {
        loading: "please wait while we updating Product",
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: "250px",
        },
        success: {
          duration: 5000,
          icon: "🔥",
        },
        error: {
          duration: 5000,
          icon: "🔥",
        },
      }
    );
  }

  function handelProductDelete(id) {
    console.log("handelProductDelete start:");
    return;
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm text-red-900 font-medium text-gray-900">
                are you sure to remove this product
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row border-l p-2 border-gray-200">
          <button
            onClick={() => {
              handleActualProductRemove(id);
              toast.dismiss(t.id);
            }}
            className="w-full mx-1 border border-transparent rounded-none rounded-r-lg  text-sm font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full mx-1 border border-transparent rounded-none rounded-r-lg text-sm font-medium text-green-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            No
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Products</CardTitle>
                <p>all listed products and stokes</p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Product name</th>
                      <th>salesRate</th>
                      <th>Row Item</th>
                      <th>quantity</th>
                      <th className="text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product.productId._id}>
                          <td> {product.productId.name}</td>
                          <td> {product.productId.salesRate}</td>
                          <td> {product.productId.rawItem ? "yes" : "no"}</td>
                          <td>
                            {" "}
                            {product.quantity} ({product.productId.unit}){" "}
                          </td>
                          <td
                            className="text-right text-danger font-weight-bold"
                            onClick={() => {
                              handelProductDelete(product._id);
                            }}
                          >
                            {" "}
                            remove
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CanteenProducts;