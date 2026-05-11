import Nav from "@/components/(ui)/nav"
import BackToTop from "@/components/(ui)/backToTop"
import Footer from "@/components/(ui)/footer"
export default function About() {
    return (
        <div>
            <Nav />
            <div className="mt-5 w-[90%] lg:w-[85%] mx-auto ">
                <div className="bg-[url('https://www.royalminesproperty.com/static/media/banner2.f10821a5f9d035f5b5a2.avif')] bg-cover w-full bg-no-repeat bg-center " style={{ backgroundAttachment: "fixed" }}>
                    <div className="w-[55%] mx-auto pb-10 md:px-10">
                        <h1 className="text-center font-bold text-2xl md:text-3xl md:py-5 text-secondary">
                            About Us
                        </h1>
                        <div className="rounded-2xl bg-primary/70 p-3  text-white text-sm lg:text-base font-bold mb-5 text-center text-pretty">
                            <p>A dedicated and diverse group of professionals united by a passion for excellence. Get to know the individuals driving our company forward, each bringing unique expertise and perspectives to our collaborative efforts. Together, we strive to deliver exceptional results and unparalleled service to our clients.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 py-5 bg-gray-100 md:px-10 lg:px-40">
                    <h1 className="text-3xl lg:text-4xl font-bold capitalize text-primary text-center mt-5">our mission</h1>
                    <p className="my-5 font-light md:font-normal leading-8 text-center md:px-5 lg:px-20 lg:font-light text-pretty ">Our mission is to lead Nigeria's real estate and mortgage sector with trust and technology, delivering seamless solutions and empowering dreams through comprehensive real estate solutions</p>
                </div>
                <hr className="rounded-2xl h-3 text-primary bg-secondary my-2" />
                <div className=" py-5 bg-gray-100 px-3 md:px-10 lg:px-50">
                    <h1 className="text-3xl lg:text-4xl font-bold capitalize text-primary text-center mt-5">our vision</h1>
                    <p className="my-5 font-light md:font-normal leading-8 text-center md:px-5 lg:px-20 lg:font-light text-pretty">To be the pioneering force, shaping Nigeria's real estate and mortgage landscape through innovative technology and unwavering integrity. We achieve this by driving transformative solutions and prioritizing the aspirations of all stakeholders, with a commitment to Professionalism, Resilience, Empathy and Value creation.</p>
                </div>
                <div className="p-5">
                    <div className="border border-gray-300 rounded-lg mt-5 p-1">
                        <div className="p-5">
                            <h1 className="capitalize font-bold text-3xl lg:text-4xl text-secondary">who we are</h1>
                            <p className=" sm:text-sm md:text-base leading-6 mt-3 ">
                                Royalmines Property Limited was incorporated on the 10th day of October 2014 as a Limited Liability company. The company was principally incorporated to carry on the business as developers of estate and property of any description. The company has been at the centre of the real estate business in the Federal Capital Territory. It has developed some properties in the city of Abuja and is also into partnership with some well-established real estate companies to provide high quality and affordable properties for his numerous clients. <br />
                                <br />
                                Royalmine is blessed with several professionals with a combined work experience of more than 100 years which positioned the company as a strong emerging real estate firm. We operate at Royalmines Property Limited by systematically evaluating every detail of our client’s interest. We have continually increased value and comfort of our clients. We strive to exceed our customer’s expectation by meeting their needs and also offer after sales service. <br />
                                <br />
                                We also provide good and cut-edge refreshment services to our clients at affordable prices. We run food delivery services in an executive manner. Our staff are well trained and they attend to the clients with high level of professionalism and courtesy. We are highly committed to our services which make our company to be topnotch.
                            </p>
                            <ul className="list-inside list-disc mt-5 text-sm md:text-base px-5 leading-6">
                                <p className="px-5 mb-5">We have successfully carried out series of jobs from various fields such as:</p>
                                <li>Construction of drainages</li>
                                <li>Building of shopping mall</li>
                                <li>Building of private residence</li>
                                <li>Building of estates</li>
                                <li>Rehabilitation Building</li>
                            </ul>
                        </div>

                        <div className="py-5 bg-gray-100 px-3 rounded-lg">
                            <h1 className="capitalize font-bold text-3xl md:text-4xl text-secondary">our services</h1>
                            <ul className=" list-[square] list-outside px-10 text-sm md:text-base font-light leading-7">
                                <h1>Our services include the following</h1>
                                <li>Real Estate</li>
                                <li>Information Communication Technology</li>
                                <li>Agro Allied</li>
                                <li>Food and Hospitality Management</li>
                                <li>Oil and Gas</li>
                                <li>Property Developer / Management</li>
                                <li>Construction/Civil work</li>
                                <li>Electrical Engineering and Rural Electrification</li>
                                <li>General Engineering Design and Consultancy</li>
                                <li>Financial Aid</li>
                                <li>Merchandise/General Contractor</li>
                            </ul>
                        </div>
                        <div className="mt-5 px-5">
                            <h1 className="capitalize font-bold text-3xl md:text-4xl text-secondary">management team</h1>
                            <p className=" text-sm md:text-base leading-6 mt-3 ">
                                Royalmines Property Limited was incorporated on the 10th day of October 2014 as a Limited Liability company. The company was principally incorporated to carry on the business as developers of estate and property of any description. The company has been at the centre of the real estate business in the Federal Capital Territory. It has developed some properties in the city of Abuja and is also into partnership with some well-established real estate companies to provide high quality and affordable properties for his numerous clients. <br />
                                <br />
                                Royalmine is blessed with several professionals with a combined work experience of more than 100 years which positioned the company as a strong emerging real estate firm. We operate at Royalmines Property Limited by systematically evaluating every detail of our client’s interest. We have continually increased value and comfort of our clients. We strive to exceed our customer’s expectation by meeting their needs and also offer after sales service. <br />
                                <br />
                                We also provide good and cut-edge refreshment services to our clients at affordable prices. We run food delivery services in an executive manner. Our staff are well trained and they attend to the clients with high level of professionalism and courtesy. We are highly committed to our services which make our company to be topnotch.
                            </p>
                            <ul className="list-inside list-disc mt-5 text-sm md:text-base px-5 leading-6">
                                <p className="px-5 mb-5">We have successfully carried out series of jobs from various fields such as:</p>
                                <li>Construction of drainages</li>
                                <li>Building of shopping mall</li>
                                <li>Building of private residence</li>
                                <li>Building of estates</li>
                                <li>Rehabilitation Building</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* board of directors */}
                <div className="">
                    <h1 className="capitalize mt-5 mb-20 font-bold text-3xl md:text-4xl text-secondary text-center">meet our team</h1>
                    <h2 className="text-secondary text-2xl md:text-3xl font-bold text-center my-5">Board of Directors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-10 lg:gap-5 lg:w-[80%] mx-auto">
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://t3.ftcdn.net/jpg/06/32/04/82/360_F_632048223_OmuLTk9nsw1xj4Ib4oZ5L6cseT0HndJE.jpg" alt="" className="w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">charles garbage</h4></div>
                        </div>
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://img.freepik.com/premium-photo/front-view-smart-young-real-estate-agent-with-backg_1124848-130547.jpg" alt="" className="w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">charles darwin</h4></div>
                        </div>
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://img.magnific.com/free-photo/beautiful-female-real-estate-agent-standing-house-entrance-smiling-woman-with-short-graying-hair-pink-suit-getting-ready-meet-customers-real-estate-business-work-concept_74855-22183.jpg?semt=ais_hybrid&w=740&q=80" alt="" className=" w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">marie curie</h4></div>
                        </div>

                    </div>
                </div>
                <div>

                    <h2 className="text-secondary text-2xl md:text-3xl font-bold text-center my-5 capitalize">executive members</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-5 gap-10 lg:gap-5 lg:w-[80%] mx-auto">
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://t3.ftcdn.net/jpg/06/32/04/82/360_F_632048223_OmuLTk9nsw1xj4Ib4oZ5L6cseT0HndJE.jpg" alt="" className="w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">charles garbage</h4></div>
                        </div>
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://img.freepik.com/premium-photo/front-view-smart-young-real-estate-agent-with-backg_1124848-130547.jpg" alt="" className="w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">charles darwin</h4></div>
                        </div>
                        <div className="shadow-sm rounded-sm flex lg:flex-col items-center gap-5 h-100">
                            <div className=" flex justify-center lg:h-[80%]">  <img src="https://img.magnific.com/free-photo/beautiful-female-real-estate-agent-standing-house-entrance-smiling-woman-with-short-graying-hair-pink-suit-getting-ready-meet-customers-real-estate-business-work-concept_74855-22183.jpg?semt=ais_hybrid&w=740&q=80" alt="" className=" w-[100%] m-2.5 lg:m-0" /></div>
                            <div className="text-center"> <h4 className="uppercase font-bold text-lg md:text-xl text-secondary">marie curie</h4></div>
                        </div>

                    </div>
                </div>
            </div>
            <BackToTop />
            <Footer />
        </div>
    )
}