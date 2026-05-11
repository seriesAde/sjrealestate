"use client"
import { FaWhatsappSquare } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";
import Nav from "@/components/(ui)/nav";
import { motion } from "framer-motion";
import { div, th } from "framer-motion/client";
import { Bath, BathIcon, Bed, Building2Icon, Calendar1Icon, CheckIcon, MapPin, MessageCircleDashedIcon, Phone, RulerIcon } from "lucide-react";
import Link from "next/link";
import BackToTop from "@/components/(ui)/backToTop";
import Footer from "@/components/(ui)/footer";
import { ClipLoader } from "react-spinners";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const baseURL = "/api"
  const [threeProperties, setThreeProperties] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProperties = async () => {

      async function fetchToken() {
        let data = {
          "email": "dummy"
        }
        let res = await axios.post(`${baseURL}/token`, data)
        let result = res.data.data
        localStorage.setItem("tempToken", JSON.stringify(result))
        // console.log(result.token)

      }

      try {
        fetchToken()
        let merchant = JSON.parse(localStorage.getItem("authData"))
        // console.log(token.access_token)
        let response = await axios.get(`${baseURL}/properties`, {
          params: {
            agent: null,
            verified: false,
            merchant: merchant.id,
          },
          headers: {
            'Authorization': `Bearer ${merchant.token}`
          }
        })

        console.log(response)
        // Standardizing the data format
        const fetchedData = Array.isArray(response.data)
          ? response.data : (response.data.properties || response.data.data || []);
        console.log("fetched Property(s):", fetchedData)

        // let prop = fetchedData.slice(0, 3)
        setThreeProperties(fetchedData.slice(0, 3))


      } catch (error) {
        toast.error("Could not load your properties");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (

    <div className="  [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
      <Nav />
      <div className="md:flex md:flex-row md:items-center flex flex-col font-sans">
        {/* Text */}
        <div className="md:w-[50%] px-10 order-2 md:order-1">
          <h1 className="capitalize font-extrabold md:text-5xl text-4xl text-primary  md:leading-[50px] py-5 mt-5">
            <span className="text-secondary">let your </span>
            family's happiness <span className="text-secondary">begin in your </span>
            perfect home
          </h1>
          <p className="" >
            Embark on your family's journey to happiness by investing in a home that mirrors your dreams. Establish a steadfast foundation for both your family's joy and your investment aspirations with the ideal property.
          </p>
        </div>

        {/* Image */}
        <div className="md:w-[50%] order-1 md:order-2">
          <img
            src="https://www.royalminesproperty.com/static/media/banner1.d6eff67d2e1649a120a5.jpeg"
            alt=""
            className="w-fit"
          />
        </div>
      </div>
      {/* // our mission starts here */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.2 }} className="md:w-[80%] mx-auto text-center lg:px-50 px-10 md:mt-20" >
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mt-30 text-secondary text-center mb-5 capitalize">our mission </h1>
        <p className="font-light">Our mission is to lead Nigeria's real estate and mortgage sector with trust and technology, delivering seamless solutions and empowering dreams through comprehensive real estate solutions.</p>
      </motion.div>

      {/* properties type starts here */}
      <div className="mx-auto bg-gray-100 py-10 mt-10">
        <div className=" md:w-[90%]   mx-auto text-center lg:p-10 px-5 ">
          <motion.div initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-secondary text-center mb-5 capitalize text-nowrap">Property Types</h1>
            <p className="font-light  lg:px-60">We prioritize our clients' needs, ensuring that we safeguard the essence of the initial concept and align it seamlessly with the right investment strategy.</p>
          </motion.div>
          {/* property grid starts here */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 gap-5 ">
            <motion.div className="bg-primary/50 rounded-md p-5 " variants={itemVariants}>
              <div className="group bg-white border-saw p-5 border border-dashed border-primary/60 hover:border-secondary rounded-md flex flex-col items-center hover:bg-secondary  transition-all duration-700 ease-in-out">
                <div className="rounded-full border border-dashed border-secondary p-4 bg-white ">
                  <Building2Icon />
                </div>
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Block of Flats</h4>
                <p className="group-hover:text-white">30+ Properties</p>
              </div>
            </motion.div>
            <motion.div className="bg-primary/50 rounded-md p-5 " variants={itemVariants}>
              <div className="group bg-white border-saw p-5 border border-dashed border-primary/60 hover:border-secondary rounded-md flex flex-col items-center hover:bg-secondary  transition-all duration-700 ease-in-out">
                <div className="rounded-full border border-dashed border-secondary p-4 bg-white ">
                  <Building2Icon />
                </div>
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Appartments</h4>
                <p className="group-hover:text-white">30+ Properties</p>
              </div>
            </motion.div>
            <motion.div className="bg-primary/50 rounded-md p-5 " variants={itemVariants}>
              <div className="group bg-white border-saw p-5 border border-dashed border-primary/60 hover:border-secondary rounded-md flex flex-col items-center hover:bg-secondary  transition-all duration-700 ease-in-out">
                <div className="rounded-full border border-dashed border-secondary p-4 bg-white ">
                  <Building2Icon />
                </div>
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Duplex</h4>
                <p className="group-hover:text-white">30+ Properties</p>
              </div>
            </motion.div>





          </motion.div>
        </div>
        {/* our services */}
        <div className="flex flex-col lg:flex-row  gap-10 md:w-[85%] mx-auto items-center px-5">
          <motion.div initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, amount: 0.5 }} className="group lg:w-[50%] py-10 ps-10 overflow-hidden bg-[linear-gradient(60deg,_#00492C_50%,_#B0B9C3_50%)] h-fit ">
            <img src="https://www.royalminesproperty.com/static/media/real.f3fadad8ae21acea9b9a.jpg" alt="" className="group-hover:scale-105 transition-all duration-700 ease-in-out w-full" />
          </motion.div>
          <motion.div className="lg:w-[50%]" initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, amount: 0.5 }}>
            <h1 className="text-secondary font-bold lg:text-4xl md:text-3xl text-3xl">
              Our Services Include:
            </h1>
            <ul className=" marker:text-#[352F29] text-[16px] font-light space-y-5 ">
              <p className="my-5 font-light  ">Welcome to our comprehensive real estate services. From property sales and mortgage assistance to construction projects, we provide tailored solutions to meet your every need</p>
              <li> <CheckIcon />
                Comprehensive mortgage solutions tailored to your financial goals
              </li>
              <li><CheckIcon />
                Expert guidance through every step of the construction process
              </li>
              <li><CheckIcon />
                Receive expert guidance at every stage of the mortgage journey
              </li>
              <li><CheckIcon />
                Extensive property sales portfolio catering to diverse preferences
              </li>
              <li><CheckIcon />
                Personalized assistance to find your dream home or investment property
              </li>
              <li><CheckIcon />
                Seamless transactions and transparent dealings throughout the process
              </li>

            </ul>

          </motion.div>
        </div>
      </div>


      {/* property listings should go here */}
      <div className="px-5 mt-10 w-full md:w-[90%] lg:w-[85%] mx-auto box-border ">
        <motion.div initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }} >
          <h1 className="text-[#0F2E4F] font-bold lg:text-5xl md:text-3xl text-3xl">
            Property Listing
          </h1>
          <p className=" text-md mt-5 w-110 lg:w-full">
            Discover your dream home with our comprehensive Property Listing.
          </p>
        </motion.div>
        {loading ? (
          <div className="flex justify-center w-full justify-self-center lg:cols-span-3">
            <div className="">
              <ClipLoader
                color="#0F2E4F"
                loading={loading}
                size={50}
              />
            </div>
          </div>
        ) :
          (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:flex-row   gap-5 mx-auto   mt-10 min-h-[300px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true, amount: 0.2 }}>
              {threeProperties.map((property) => (
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
                        <MapPin className="text-base shrink-0" />
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
                        <RulerIcon className="text-base" />
                        {property.total_area ?? "N/A"}
                      </div>
                      <div className="border-r border-l border-gray-300 border-dashed p-2 text-nowrap flex items-center gap-1">
                        <Bed className="text-base" />
                        {property.bedroom} Beds
                      </div>
                      <div className="p-2 text-nowrap flex items-center gap-1">
                        <Bath className="text-base" />
                        {property.bathroom} Baths
                      </div>
                    </div>
                  </div>
                </Link>
              )
              )}

            </motion.div>
          )}
        <motion.div className="flex justify-center mt-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, amount: 0.2 }}
        >
          <Link href="/properties" className="capitalize px-5 py-3 text-white bg-secondary rounded-md hover:bg-primary">see more</Link>
        </motion.div>
      </div>

      {/* connect with us starts here */}
      <div className="bg-primary rounded-md p-5 w-[85%] mx-auto mt-20">
        <motion.div initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, amount: 0.2 }} className=" bg-white p-5 border border-dashed border-secondary/70 rounded-md flex flex-col md:flex-col lg:flex-row gap-10  ">
          <div className="lg:w-[50%]"><img src="https://www.royalminesproperty.com/static/media/caller.ea5c26aca0e26a69b8e4.avif" alt="" className="rounded-lg" /></div>
          <div className="lg:w-[50%]">
            <h1 className="text-secondary font-bold lg:text-5xl md:text-3xl text-3xl my-5">
              Connect With Us
            </h1>
            <p className="text-sm leading-6 mb-5">
              Reach out to our dedicated office desk during our business hours, from 9am to 5pm WAT, for personalized assistance and expert guidance on all your inquiries.
            </p>
            <div className=" md:flex flex-wrap gap-3 ">
              <Link href="https://wa.me/2348108982805" className="capitalize px-5 py-5 md:mb-0 mb-3 text-white bg-secondary rounded-md hover:bg-primary flex gap-2 items-center"> <FaWhatsappSquare className="size-5" /> whatsapp</Link>
              <Link href="tel:+2348052605026" className="capitalize px-5 py-5 md:mb-0 mb-3 text-white bg-secondary rounded-md hover:bg-primary flex gap-2 items-center"> <Phone className="size-5" /> make a call</Link>
              {/* <Link href="" className="capitalize px-5 py-5 md:mb-0 mb-3 text-white bg-secondary rounded-md hover:bg-primary flex gap-2 items-center"> <MessageCircleDashedIcon className="size-5" /> feed back</Link> */}
              <Link href="" className="capitalize px-5 py-5  text-white bg-secondary rounded-md hover:bg-primary flex gap-2 items-center"> <Calendar1Icon className="size-5" /> book site visitation appointment</Link>
            </div>
          </div>
        </motion.div>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
