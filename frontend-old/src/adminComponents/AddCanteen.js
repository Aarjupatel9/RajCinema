import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { canteenValidator } from "../validator/authValidator"
import canteenService from '../services/canteenService';


export const canteenTemplate = {
    _id: '',
    name: "",
    canteenUser: "",
};
export default function AddCanteen() {

    const [canteenDetails, setCanteenDetails] = useState(canteenTemplate);

    const { id } = useParams();

    useEffect(() => {
        console.log("id : ", id);
        if (id != undefined) {
            canteenService.getCanteenDetails(id).then((res) => {
                const canteen = res.canteen;
                console.log("canteen : ", canteen);
                setCanteenDetails(canteen);
            }).catch((error) => {
                console.log("error : ", error);
            })
        }
    }, [id]);



    const handelCanteenUpload = () => {
        console.log('Form Data:', canteenDetails);
        const { error } = canteenValidator.validate(canteenDetails);
        if (error) {
            toast.error(error.toString());
            return;
        }

        const updateCanteenPromise = canteenService.updateCanteenDetails(canteenDetails);
        updateCanteenPromise.then((res) => {
            if (id == undefined) {
                setCanteenDetails(canteenTemplate);
            }
        }).then((err) => {
            console.log(err);
        })
        toast.promise(
            updateCanteenPromise,
            {
                loading: 'please wait while we updating Canteen',
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
        setCanteenDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }


    return (
        <div className=" flex flex-col shadow-md sm:rounded-lg">
            <h1 className='text-3xl mx-auto font-medium text-gray-900 dark:text-white'>Canteen Entry </h1>
            <hr className='mt-2' />
            <div className='m-1 p-5 flex flex-col'>

                <div className='flex flex-col'>
                    <h3 className='mt-4 my-3 mx-auto text-2xl font-medium text-gray-900 dark:text-white'>Canteen Details</h3>
                    <hr className='w-48 h-1 my-3 mx-auto bg-gray-300 border-0 rounded md:mt-2 md:mb-4 dark:bg-gray-700' />
                    <div className="my-3 mt-10 grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={canteenDetails.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="name" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Canteen Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input onChange={handleInputChange} value={canteenDetails.canteenUser} type="text" name="canteenUser" id="canteenUser" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                            <label htmlFor="canteenUser" className="peer-focus:font-medium absolute  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-100 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">canteenUser</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center'>
                    <button type="button" onClick={handelCanteenUpload} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    )

}
