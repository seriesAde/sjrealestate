"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import {
    MdLocationPin,
    MdSquareFoot,
    MdBed,
    MdBathtub,
    MdChevronLeft,
    MdChevronRight,
} from "react-icons/md";
import { Loader2 } from "lucide-react";
import Nav from "@/components/(ui)/nav";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import Footer from "@/components/(ui)/footer";
import BackToTop from "@/components/(ui)/backToTop";



export default function Properties() {

    const baseURL = "/api";
    const [Token, setToken] = useState()
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [properties, setProperties] = useState([]);
    const [agents, setAgents] = useState([]);
    const [selectedAgentId, setSelectedAgentId] = useState("");
    const [displayName, setDisplayName] = useState("");


    // async function fetchToken() {
    //     let data = {
    //         "email": "dummy"
    //     }
    //     let res = await axios.post(`${baseURL}/token`, data)
    //     let result = res.data.data
    //     setToken(result)
    //     // console.log(result.token)

    // }

    // useEffect(() => {
    //     fetchToken
    // }, [])



    useEffect(() => {
        const fetchProperties = async () => {
            const agentData = JSON.parse(localStorage.getItem("agent_info"));
            const merchantData = JSON.parse(localStorage.getItem("authData"));
            //Double Check  id and _id 
            if (!merchantData) {
                setLoading(false);
                return (
                    toast.error("merchant details not found")
                );
            }
            const agentId = agentData?.id || agentData?.user?._id;
            const res = await axios.get(`${baseURL}/merchants/agents?`, {
                headers: {
                    Authorization: `Bearer ${merchantData.token}`
                }
            });
            console.log(res.data.data)
            setAgents(res.data.data);

            if (!agentData?.token || !agentId) {
                setLoading(false);
                return;
            }

            //Api fetch
            try {

                let response = await axios.get(`${baseURL}/properties`, {
                    params: {
                        agent: null,
                        verified: false,
                        merchant: merchantData.id,
                    },
                    headers: {
                        'Authorization': `Bearer ${merchantData.token}`
                    }
                })


                // Standardizing the data format
                const fetchedData = Array.isArray(response.data)
                    ? response.data : (response.data.properties || response.data.data || []);
                console.log("fetched Property(s):", fetchedData)

                setProperties(fetchedData);

            } catch (error) {
                toast.error("Could not load your properties");
                console.error("Fetch Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [selectedAgentId]);

    const handleChange = (e) => {
        const value = e.target.value; // Capture the new value immediately

        setSelectedAgentId(value); // Update state for the dropdown UI

        // Use 'value' here instead of 'selectedAgentId'
        const selectedAgent = agents.find((a) => a.id == value);

        if (selectedAgent) {
            setDisplayName(selectedAgent.full_name);
        } else {
            setDisplayName(""); // Reset if "Select Agent" is picked
        }
    };


    // if (loading) return (
    //     <div className="h-screen flex items-center justify-center bg-white">
    //         <Loader2 className="animate-spin w-12 h-12 text-[#00492c]" />
    //     </div>
    // );



    return (
        <div>
            <Nav />

            {/* Hero Banner */}
            <div className="w-[90%] lg:w-[82%] mx-auto">
                <div
                    className="bg-[url('https://www.royalminesproperty.com/static/media/banner1.43e80869da8a99d1120f.jpg')]
                               bg-cover w-full bg-no-repeat bg-center mt-10 h-80
                               flex justify-center items-center"
                    style={{ backgroundAttachment: "fixed" }}
                >
                    <div className="backdrop-blur-[5px] px-4 py-1 shadow-lg rounded-lg bg-[#b5b3aa99]">
                        <h1 className="text-center font-bold lg:text-[40px] text-secondary capitalize">
                            our properties
                        </h1>
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <motion.div
                className="py-5 text-center font-light"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h1 className="text-center font-bold lg:text-[40px] text-secondary capitalize">
                    properties listing
                </h1>
                <p className="pt-2">
                    Discover your dream home with our comprehensive Property Listing.
                </p>
            </motion.div>

            {/* Properties Grid */}
            <div className="w-[90%] lg:w-[82%] mx-auto">
                {loading ? (
                    <div className="flex justify-center w-full py-20">
                        <ClipLoader color="#0F2E4F" loading={loading} size={50} />
                    </div>
                ) : properties.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No properties found.
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto mt-10 min-h-[300px]"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {properties.map((property) => (
                            <Link href={`properties/${property.id}`} key={property.id}>
                                <div
                                    key={property.id}
                                    className="relative group cursor-pointer shadow-md rounded-b-md"
                                >
                                    {/* Image */}
                                    <div className="overflow-hidden rounded-t-lg relative h-52">
                                        <img
                                            src={
                                                property.image ? property.image : property.images ? property.images[0] : "http://res.cloudinary.com/dfv4cufzp/image/upload/v1708810120/cnhawlnjrrtfy9p3ihcu.jpg"
                                            }
                                            alt={property.name}
                                            className="w-full h-full object-cover rounded-t-lg group-hover:scale-110 transition-all duration-700 ease-in-out"
                                        />
                                        <div className="absolute top-5 left-4 bg-[#0000008a] px-3 py-1 rounded-md text-white text-sm capitalize">
                                            {property.type}
                                        </div>
                                        <div className="absolute bottom-0 left-4 bg-white px-5 pt-1 rounded-t-md text-[#352F29] text-sm capitalize">
                                            {property.category}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="ps-5 pr-3 lg:h-40">
                                        <h1 className="text-lg font-bold text-secondary py-3 group-hover:text-primary line-clamp-2">
                                            {property.name}
                                        </h1>
                                        <p className="text-sm text-secondary group-hover:text-primary flex items-center gap-1">
                                            <MdLocationPin className="text-base shrink-0" />
                                            <span className="line-clamp-1">
                                                {property.address}, {property.city}
                                            </span>
                                        </p>
                                        <p className="text-base font-semibold text-secondary mt-2">
                                            ₦{property.price}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex mt-3 border-t text-sm border-gray-300 border-dashed group-hover:text-primary w-full">
                                        <div className="p-2 text-nowrap flex items-center gap-1">
                                            <MdSquareFoot className="text-base" />
                                            {property.total_area ?? "N/A"}
                                        </div>
                                        <div className="border-r border-l border-gray-300 border-dashed p-2 text-nowrap flex items-center gap-1">
                                            <MdBed className="text-base" />
                                            {property.bedroom} Beds
                                        </div>
                                        <div className="p-2 text-nowrap flex items-center gap-1">
                                            <MdBathtub className="text-base" />
                                            {property.bathroom} Baths
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center my-10 gap-1">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-9 border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-100 transition"
                        >
                            <MdChevronLeft className="text-lg" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-9 border border-gray-200 text-sm transition hover:bg-gray-100
                                    ${currentPage === page
                                        ? "bg-secondary text-white border-secondary"
                                        : ""
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-9 border border-gray-200 flex items-center justify-center disabled:opacity-40 hover:bg-gray-100 transition"
                        >
                            <MdChevronRight className="text-lg" />
                        </button>
                    </div>
                )}
            </div>
            <BackToTop />
            <Footer />
        </div>
    );
}