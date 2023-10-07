import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { vendorValidator } from "../validator/authValidator"
import userService from '../services/userService';


export const vendorTemplate = {
    _id: '',
    name: "",
    number: "",
};
export default function AddCanteen() {

    const SystemVariables = useSelector((state) => state.SystemVariables);
    const currentUser = useSelector((state) => state.CurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [vendorDetails, setVendorsDetails] = useState(vendorTemplate);

    const { id } = useParams();

    useEffect(() => {
        console.log("id : ", id);
        if (id != undefined) {
            userService.getVendorDetails(id).then((res) => {
                const vendor = res.vendor;
                console.log("vendor : ", vendor);
                setVendorsDetails(vendor);
            }).catch((error) => {
                console.log("error : ", error);
            })
        }
    }, [id]);



    const handelVendorUpload = () => {
        console.log('Form Data:', vendorDetails);
        const { error } = vendorValidator.validate(vendorDetails);
        if (error) {
            toast.error(error.toString());
            return;
        }

        const vendorPromise = userService.updateVendorDetails(vendorDetails);

        vendorPromise.then((res) => {
            if (id == undefined) {
                setVendorsDetails(vendorTemplate);  
            }
        }).then((err) => {
            console.log(err);
        })
        toast.promise(
            vendorPromise,
            {
                loading: 'please wait while we updating Vendor',
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

    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVendorsDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
   
    return (
        <div className=" flex flex-col shadow-md sm:rounded-lg">
            <h1 className='text-3xl mx-auto font-medium text-gray-900 dark:text-white'>Vendors Entry </h1>
            <hr className='mt-2' />
            <div className='m-1 p-5 flex flex-col'>
                <div className='flex flex-col'>
                    <h3 className='mt-4 my-3 mx-auto text-2xl font-medium text-gray-900 dark:text-white'>Vendor Details</h3>
                    <hr className='w-48 h-1 my-3 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className="mb-3 mt-10 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={vendorDetails.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vendor Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={vendorDetails.number} type="text" name="number" id="number" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="number" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">number</label>
                        </div>
                    </div>
                  
             
                </div>

                <div className='flex flex-row justify-center'>
                    <button type="button" onClick={handelVendorUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    )
}
