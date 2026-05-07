"use client"
import { FaWhatsappSquare } from "react-icons/fa";
import Image from "next/image";
import Nav from "@/components/(ui)/nav";
import { motion } from "framer-motion";
import { div, th } from "framer-motion/client";
import { Building2Icon, Calendar1Icon, CheckIcon, MessageCircleDashedIcon, Phone } from "lucide-react";
import Link from "next/link";
import BackToTop from "@/components/(ui)/backToTop";
import Footer from "@/components/(ui)/footer";

export default function Home() {
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

    <div id="main-content" className="h-screen  [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
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
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Block of Flats</h4>
                <p className="group-hover:text-white">30+ Properties</p>
              </div>
            </motion.div>
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
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Block of Flats</h4>
                <p className="group-hover:text-white">30+ Properties</p>
              </div>
            </motion.div>
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
              <div className="group bg-white border-saw p-5 border border-dashed border-primary/60 hover:border-secondary rounded-md flex flex-col items-center hover:bg-secondary  transition-all duration-900 ease-in-out">
                <div className="rounded-full border border-dashed border-secondary p-4 bg-white ">
                  <Building2Icon />
                </div>
                <h4 className="text-secondary  group-hover:text-white font-bold py-3">Block of Flats</h4>
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
