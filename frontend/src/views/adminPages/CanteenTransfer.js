
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import canteenService from "services/canteenService";
import userService from "services/userService";
import toast from "react-hot-toast";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button, } from "reactstrap";


function User() {

  const [products, setProducts] = useState([]);
  const [canteenId, setCanteenId] = useState(undefined);
  

  function getProductDetails() {
    const productPromise = userService.getAllProducts();
    productPromise.then((res) => {
      console.log("products response : ", res);
      if (res.products) {
        setProducts(res.products);
      }
    }).catch((err) => {
      console.log("error : ", err);
    })
  }
  useEffect(() => {
    console.log("products change : ", products);
  }, [products])

  const { id } = useParams();

  useEffect(() => {
    console.log("id : ", id);
    if(id){
      getProductDetails();
      setCanteenId(id);
    }
  


  }, [id]);


  const toggleIsForTransfer = (id) => {
    const updatedProducts = products.map(product => {
      if (product._id === id) {
        return {
          ...product,
          isForTransfer: !product.isForTransfer,
        };
      }
      return product;
    });
    setProducts(updatedProducts)
  }
  function setTransferQuantity(id, transferQuantity) {
    const updatedProducts = products.map(product => {
      if (product._id === id) {
        return {
          ...product,
          transferQuantity: transferQuantity,
        };
      }
      return product;
    });
    setProducts(updatedProducts)
  }

  const handelTransferProduct = () => {
    var error = false;
    const checkedProducts = products.filter(product => {
      if (product.isForTransfer === true) {
        console.log("transferQuantity : ", product.transferQuantity);
        if (product.transferQuantity == undefined) {
          toast.error("Quantity of '" + product.name + "' is not entered");
          error = true;
        } else if (isNaN(product.transferQuantity)) {
          toast.error("Quantity of '" + product.name + "' is not a valid number");
          error = true;
        } else if (product.transferQuantity <= 0) {
          toast.error("Quantity of '" + product.name + "'  must be more than Zero");
          error = true;
        } else if (product.transferQuantity > product.quantity) {
          toast.error("Only '" + product.quantity + " " + product.name + "' are available");
          error = true;
        }
        return product;
      }
    });
    console.log(checkedProducts);
    if (error) {
      console.log("there is error");
      return;
    }
    if (checkedProducts.length == 0) {
      toast('No item selected for transfer!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }

    //main logic
    if (canteenId == undefined) {
      toast.error("system error");
      return;
    }

    console.log("canteen id : ", canteenId);
    // return 
    const transferPromise = canteenService.transferSelectedProductToCanteen(canteenId, checkedProducts);
    transferPromise.then((res) => {
      getProductDetails();
    }).catch((err) => {
      console.log(error);
    })
    toast.promise(
      transferPromise,
      {
        loading: 'please wait while we transfer the Products',
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



  return (
    <>
      <div className="content">
        <Row>

          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Transfer Products <Button close onClick={handelTransferProduct}>
                  transfer
                </Button></CardTitle>
                <p className="card-category">
                  transfer product form stokes to canteen
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Product name</th>
                      <th>quantity</th>
                      <th>Row Item</th>
                      <th>salesRate</th>
                      <th className="">mark for transfer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td> {product.name}</td>
                          <td> {product.quantity}   ({product.unit})</td>
                          <td>  {product.rawItem ? "yes" : "no"}</td>
                          <td>  {product.salesRate}</td>
                          <td className="text"><div className="flex flex-row items-center">
                            <input
                              type="checkbox"
                              name="isOrganizedByBVM"
                              id="isOrganizedByBVM"
                              checked={product.isForTransfer}
                              onChange={() => { toggleIsForTransfer(product._id) }}
                              className="mr-2 text-blue-700 dark:text-blue-500 focus:outline-none"
                            />
                            <span> {product.isForTransfer ?
                              <>
                                <input  onChange={(e) => { setTransferQuantity(product._id, e.target.value) }}
                                  value={product.transferQuantity}
                                  type="tel" name="title" id="title" className=" ml-10 w-20" required />
                                <span>({product.unit})</span>
                              </>
                              : <></>}
                            </span>
                          </div></td>
                        </tr>
                      )
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

export default User;
