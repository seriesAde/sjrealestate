"use client";
import BackToTop from "@/components/(ui)/backToTop";
import Footer from "@/components/(ui)/footer";
import Nav from "@/components/(ui)/nav";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightCircleIcon, ArrowRightIcon, Bath, BedDoubleIcon, Building, CarFront, House, LandPlot, MapPin, StarIcon, Store, User2Icon, Warehouse } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/(ui)/Modal";
import AppointmentForm from "@/components/(forms)/AppointmentForm";





export default function SingleProduct({ params }) {
    const baseURL = "/api";
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorite, setFavorite] = useState(false)
    const [userId, setUserId] = useState()
    const buttonText = {
        SALES: "BUY NOW",
        LEASE: "LEASE NOW",
        RENT: "RENT NOW"
    };

    async function fetchWishlist() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const resolvedParams = await params;
        const id = resolvedParams.id
        if (!userInfo) {
            return
        } else {
            setUserId(userInfo.id)
            try {
                let res = await axios.get(
                    `${baseURL}/users/${userInfo.id}/wishlist`,
                    {
                        headers: {
                            'Authorization': `Bearer ${userInfo.token}`
                        }
                    }
                );
                console.log(res)

                const wishProp = res.data.data;
                console.log(wishProp)

                // .some() returns true or false
                const isAlreadyFavorite = wishProp.some(item =>
                    item.property && String(item.property.id) === String(id)
                );

                if (isAlreadyFavorite) {
                    setFavorite(isAlreadyFavorite);
                }

            } catch (error) {
                console.log(error)
            }
            console.log(favorite)
        }
    }
    useEffect(() => {
        const merchantData = JSON.parse(localStorage.getItem("authData"));
        // fetching single product
        async function fetchProduct() {
            const resolvedParams = await params;
            const id = resolvedParams.id
            if (!id) return;
            try {
                const response = await axios.get(`${baseURL}/properties/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${merchantData.token}`
                    }
                }

                );
                const data = response.data;
                setProduct(data);
                // console.log(response)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
        fetchWishlist()
    }, [params]);

    // next button 
    const handleNext = () => {
        if (!product) return;
        if (currentIndex < product.images.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <ClipLoader color="#0F2E4F" size={50} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20 text-gray-500">
                Product not found.
            </div>
        );
    }




    async function wishList() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const resolvedParams = await params;
        const id = resolvedParams.id
        if (!userInfo) {
            toast.error("please login to add your wishlist")
            return
        } else {
            try {
                let res = await axios.post(
                    `${baseURL}/users/wishlist`,
                    { "property_id": id, "user_id": userInfo.id },
                    { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
                );

                toast.success("Wishlist added");
                setFavorite(true); // Disable the button after adding
                setIsFavorite(true); // Fill the star icon
                console.log(res)
            } catch (error) {
                console.error(error);
                toast.error("Failed to add to wishlist");
            }
        }
        setIsFavorite(!isFavorite)
    }
    async function buyNow() {
        toast.success("thanks for your purchase")
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const resolvedParams = await params;
            const id = resolvedParams.id
            let res = await axios.post(
                `${baseURL}/properties/buy `,
                { "property_id": id, "user_id": userInfo.id },
                { headers: { 'Authorization': `Bearer ${userInfo.token}` } }
            );
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Nav />
            <div className="w-[100%] pt-34 flex">
                {/* Thumbnails */}
                <div className="w-[10%] mx-auto">
                    {product.images?.map((image, index) => (
                        <div
                            key={index}
                            className="w-[80px] m-auto cursor-pointer"
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img
                                src={image}
                                alt={`thumbnail-${index}`}
                                className={`border-2 transition-all ${currentIndex === index
                                    ? "border-primary"
                                    : "border-transparent"
                                    }`}
                            />
                        </div>
                    ))}
                </div>

                {/* Main image */}
                <div className="w-[50%] ">
                    <div className="w-full flex items-center justify-between px-5 max-h-fit">
                        <button onClick={handlePrev} className="cursor-pointer text-primary">
                            <ArrowLeftIcon alt="prev" />
                        </button>
                        <div className="w-[80%]">
                            <img
                                src={product.images[currentIndex]}
                                alt={product.title}
                                className="w-full max-h-130"
                            />
                        </div>
                        <button onClick={handleNext} className="cursor-pointer text-primary ">
                            <ArrowRightIcon alt="next" />
                        </button>
                    </div>
                    <div className="text-primary/70 flex gap-5 ml-[11%] mt-5">
                        <p className="capitalize flex gap-2">
                            <span className="font-bold"><MapPin /></span><span>{product.address}</span>
                        </p>
                        ||
                        <p className="capitalize">
                            <span className="font-bold">property type:</span>
                            <span className="lowercase"> {product.property_use}</span>
                        </p>
                        ||
                        <p className="capitalize">
                            <span className="font-bold">listing type:</span> <span className="lowercase">{product.type}</span>
                        </p>
                    </div>
                </div>

                {/* Product details */}
                <div className="w-[40%] mr-5">
                    <h2 className=" capitalize text-3xl my-5 text-secondary font-bold">
                        {product.name}
                    </h2>
                    <div className="flex justify-between">
                        <h4 className="font-bold pb-5 text-4xl text-primary"> ₦{Number(product?.price).toLocaleString('en-NG')}</h4>
                        <button onClick={wishList} disabled={favorite && true} className="cursor-pointer text-primary "> <StarIcon size={30} fill={isFavorite || favorite ? "gold" : "none"} color={isFavorite || favorite ? "orange" : "gray"} /></button>
                    </div>

                    <div className="">
                        <button onClick={() => setIsModalOpen(true)} className="border-primary py-2 border mb-5 px-40 capitalize cursor-pointer hover:bg-primary hover:text-white transition-colors duration-500 font-bold text-secondary" key={product.id}>
                            book an appointment
                        </button>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={`Appointment for ${product.name}`}
                    >
                        <AppointmentForm
                            propertyId={product.id}
                            user={userId}
                            onSuccess={() => setIsModalOpen(false)}
                        />
                    </Modal>

                    {/* Collapsible description */}
                    <div>
                        <div
                            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out  ${expanded ? "max-h-[500px]" : "max-h-[90px]"
                                }`}
                        >
                            <h2 className="bg-primary/40 mb-3 w-fit text-black px-2 text-lg tracking-wider font-bold">
                                Facilities
                            </h2>
                            <ul className="grid grid-cols-2">
                                {product?.description?.split("\n").map((sentence, index) => (
                                    <li key={index} className="flex items-center gap-3"> <ArrowRightCircleIcon size={15} className="text-secondary" />  {sentence.trim()}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={() => setExpanded((prev) => !prev)}
                            className="text-primary font-bold hover:text-secondary cursor-pointer"
                        >
                            {expanded ? "Read less" : "Read more"}
                        </button>
                    </div>

                    <hr className="border-primary" />
                    <div className="mt-5 lg:max-w-40 ">
                        <h2 className="bg-primary/40 mb-3 w-fit text-black px-2 text-lg tracking-wider font-bold">
                            Amenities
                        </h2>
                        <ul className="flex gap-4 py-2 w-full">
                            {product?.amenities?.map((amenity) => (
                                <li className=" border-2 border-primary/30 rounded-sm w-fit px-3 h-fit text-nowrap text-center text-primary/70 font-bold">
                                    {amenity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="border-primary " />
                    <div className="">
                        <ul className="flex items-center justify-between w-[80%] mx-auto py-2">
                            <li className="flex flex-col items-center">
                                <div className="rounded-full p-2.5 border-2 border-primary/40 w-fit">

                                    {product?.category == "duplex" ? <House className="size-8 text-primary" /> : product.category == "flat" ? <Building className="size-8 text-primary" /> : product.category == "appartment" ? <Building className="size-8 text-primary" /> : product.category == "land" ? <LandPlot className="size-8 text-primary" /> : product.category == "shop" ? <Store className="size-8 text-primary" /> : <Warehouse className="size-8 text-primary" />}
                                </div>
                                <p className="text-center text-primary uppercase"> {product.category}</p>
                            </li>
                            <li className="flex flex-col items-center">
                                <div className="rounded-full p-2.5 border-2 border-primary/40 w-fit">
                                    <BedDoubleIcon className="size-8 text-primary" />
                                </div>
                                <p className="text-center text-primary uppercase">
                                    {product.bedroom} {product.bedroom > 1 ? "bedrooms" : "bedroom"}
                                </p>
                            </li>
                            <li className="flex flex-col items-center">
                                <div className="rounded-full p-2.5 border-2 border-primary/40">
                                    <Bath className="size-8 text-primary" />
                                </div>
                                <p className="text-center text-primary uppercase">
                                    {product.bathroom} {product.bathroom > 1 ? "bathrooms" : "bathroom"}
                                </p>
                            </li>

                            <li className="flex flex-col items-center">
                                <div className="rounded-full p-2.5 border-2 border-primary/40">
                                    <CarFront className="size-8 text-primary" />
                                </div>
                                <p className="text-center text-primary uppercase">
                                    {product.parking_space} {product.parking_space > 1 ? "parking spaces" : "parking space"}
                                </p>
                            </li>
                        </ul>
                    </div>
                    <hr className="border-primary" />
                    <div className="flex justify-center">
                        <button onClick={buyNow} className="border-2 mt-5 py-2 px-15 border-secondary rounded-sm text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 font-bold">
                            {buttonText[product?.type?.trim().toUpperCase()] || "BUY NOW"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[85%] mx-auto mt-15" >
                <div className="flex justify-center ">
                    <h2 className=" mb-3 w-fit  px-2 text-4xl text-secondary  tracking-wider font-bold">
                        Reviews
                    </h2>
                </div>

                <div className="flex gap-5">
                    <div className="w-[70%] shadow-sm shadow-primary/50 p-3 grid lg:grid-cols-3 gap-3 lg:max-h-68">
                        <div className="bg-primary/20 max-w-80 p-5 rounded-md text-secondary max-h-fit ">
                            <div className="flex gap-5 items-center font-bold py-2 justify-between">
                                <p className="text-lg">Adeshina Ahmed</p>
                                <div className="p-0.5 rounded-full border bg-secondary">
                                    <User2Icon fill="white" />
                                </div>
                            </div>
                            <p className="text-secondary outline-none" contentEditable={true}>This property is fantastic! Excellent value for money and the agent was very helpful throughout the process.</p>
                            <div className="flex justify-between items-start w-[45%] gap-1 mt-3">
                                <button className="border border-secondary rounded-sm px-2 bg-secondary text-white capitalize"> edit</button>
                                <button className="border border-red-700 rounded-sm px-2 bg-red-700 text-white capitalize"> delete</button>
                            </div>
                        </div>
                        <div className="bg-primary/20 max-w-80 p-5 rounded-md text-secondary max-h-fit ">
                            <div className="flex gap-5 items-center font-bold py-2 justify-between">
                                <p className="text-lg">Adeshina Ahmed</p>
                                <div className="p-0.5 rounded-full border bg-secondary">
                                    <User2Icon fill="white" />
                                </div>
                            </div>
                            <p className="text-secondary outline-none" contentEditable={true}>This property is fantastic! Excellent value for money and the agent was very helpful throughout the process.</p>
                            <div className="flex justify-between items-start w-[45%] gap-1 mt-3">
                                <button className="border border-secondary rounded-sm px-2 bg-secondary text-white capitalize"> edit</button>
                                <button className="border border-red-700 rounded-sm px-2 bg-red-700 text-white capitalize"> delete</button>
                            </div>
                        </div>
                        <div className="bg-primary/20 max-w-80 p-5 rounded-md text-secondary max-h-fit ">
                            <div className="flex gap-5 items-center font-bold py-2 justify-between">
                                <p className="text-lg">Adeshina Ahmed</p>
                                <div className="p-0.5 rounded-full border bg-secondary">
                                    <User2Icon fill="white" />
                                </div>
                            </div>
                            <p className="text-secondary outline-none" contentEditable={true}>This property is fantastic! Excellent value for money and the agent was very helpful throughout the process.</p>
                            <div className="flex justify-between items-start w-[45%] gap-1 mt-3">
                                <button className="border border-secondary rounded-sm px-2 bg-secondary text-white capitalize"> edit</button>
                                <button className="border border-red-700 rounded-sm px-2 bg-red-700 text-white capitalize"> delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-[30%] ">
                        <form className="flex flex-col gap-5 ">
                            <textarea cols='25' rows='10' className="border outline-none border-primary p-2"> </textarea>
                            <button className="border w-fit px-2 py-1 border-primary font-semibold text-secondary rounded-md ml-auto "> Send Review</button>
                        </form>
                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </div >
    );
}