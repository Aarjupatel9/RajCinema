import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../services/userService'
import toast from 'react-hot-toast';
import canteenService from "../services/canteenService";
import { useParams } from 'react-router-dom';

export default function AllCanteens() {
  const [products, setProducts] = useState([]);
  const [canteenId, setCanteenId] = useState(undefined);
  useEffect(() => {
    getProductDetails();
  }, [])

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
    setCanteenId(id);
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
    <div >
      <nav className="bg-gray-500 border-gray-200 dark:bg-gray-900">
        <div className="flex  bg-gray-300 dark:bg-gray-900 flex-wrap items-center justify-between mx-auto px-3 py-1">
          <div className='flex flex-row justify-start'>
            <div className="flex md:order-2 mx-2">
              <button onClick={handelTransferProduct} class="bg-gray-300 hover:text-blue-500 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-l">
                transfer selected items
              </button>
            </div>
          </div>
          <div className="flex md:order-2">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
          </div>
        </div>
      </nav>

      <div className='flex flex-col pt-4 px-3 '>
        <h1 className='mx-auto uppercase text-2xl font-medium text-gray-900 dark:text-white' >Products details</h1>
        {products != undefined ?
          <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xl text-gray-700 uppercase  dark:text-gray-400">
                <tr className='mb-2 border-b border-gray-200 dark:border-gray-600'>
                  <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                    quantity
                  </th>
                  <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                    Row Item
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-100 dark:bg-gray-800">
                    salesRate
                  </th>
                  <th scope="col" className="px-6 py-3 dark:text-white dark:bg-gray-700">
                    mark for transfer
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {products.map((product) => {
                  return (
                    <tr key={product._id} className="border-b border-gray-200 dark:border-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        {product.name}
                      </th>
                      <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                        {product.quantity}   ({product.unit})
                      </td>

                      <td className="px-6 py-4 dark:text-white dark:bg-gray-700">
                        {product.rawItem ? "yes" : "no"}
                      </td>
                      <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">
                        {product.salesRate}
                      </td>
                      <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">
                        <div className=" flex flex-row items-center">
                          <input
                            type="checkbox"
                            name="isOrganizedByBVM"
                            id="isOrganizedByBVM"
                            checked={product.isForTransfer}
                            onChange={() => { toggleIsForTransfer(product._id) }}
                            className="mr-2 text-blue-700 dark:text-blue-500 focus:outline-none"
                          />
                          <span> {product.isForTransfer ?
                            <div className="relative z-0 w-full  group">
                            <input onChange={(e) => { setTransferQuantity(product._id, e.target.value) }}
                              value={product.transferQuantity}
                              type="tel" name="title" id="title" className=" ml-10 w-20 text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                              <span>({product.unit})</span>
                            </div>
                            : <></>}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 bg-gray-100 dark:bg-gray-800">

                      </td>


                    </tr>
                  )
                })
                }

              </tbody>
            </table>
          </div>
          : <div> there is no product</div>}
      </div>
    </div>
  )
}
