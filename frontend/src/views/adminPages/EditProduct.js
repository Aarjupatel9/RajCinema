
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function EditProduct() {


  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {

    // const productPromise = userService.getAllProducts();

    // productPromise.then((res) => {
    //   console.log("products response : ", res);
    //   if (res.products) {
    //     setProducts(res.products);
    //   }
    // }).catch((err) => {
    //   console.log("error : ", err);
    // })


  }, [])


  function handleActualProductRemove(id) {

    console.log("you said yes");
    // return;
    const updateProductPromise = userService.removeProductDetails(id);
    updateProductPromise.then((res) => {
      const updatedProducts = products.filter(product => product._id !== id);
      setProducts(updatedProducts);
    })
    toast.promise(
      updateProductPromise,
      {
        loading: 'please wait while we updating Product',
        success: (data) => data.message,
        error: (err) => err,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 5000,
          icon: '🔥',
        },
        error: {
          duration: 5000,
          icon: '🔥',
        },
      }
    );
  }

  function handelProductDelete(id) {
    console.log('handelProductDelete start:');
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
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
            className="w-full mx-1 border border-transparent rounded-none rounded-r-lg  text-sm font-medium text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full mx-1 border border-transparent rounded-none rounded-r-lg text-sm font-medium text-green-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            No
          </button>
        </div>
      </div>
    ));

  };


  return (
    <>
      <div className="content">
        <Row>

          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Canteens details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Product name</th>
                      <th>salesRate</th>
                      <th>Row Item</th>
                      <th>quantity</th>
                      <th className="text-right  ">Edit</th>
                      <th className="text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td>  {product.name}</td>
                          <td>  {product.salesRate}</td>
                          <td> {product.rawItem ? "yes" : "no"}</td>
                          <td  >  {product.quantity} </td>
                          <td className="text-right text-success font-weight-bold" onClick={() => { navigate(" / addProduct /" + product._id); }}> Edit</td>
                          <td className="text-right text-danger font-weight-bold" onClick={() => { handelProductDelete(product._id) }}> remove</td>
                        </tr>)
                    })
                    }

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

export default EditProduct;
