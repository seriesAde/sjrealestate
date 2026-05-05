import Link from "next/link";

export default function Wishlist() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            <Link href="/properties/1">
                <div key="" className="relative group  cursor-pointer shadow-md  min-w-fit h-fit rounded-b-md">
                    <div className="overflow-hidden rounded-t-lg relative">
                        <img src="" alt="" className="rounded-t-lg group-hover:scale-110 transition-all duration-700 ease-in-out" />
                        <div className="absolute top-5 left-4 bg-[#0000008a] px-3 py-1 rounded-md text-white"> status will be here</div>
                        <div className="absolute   bottom-0   left-4 bg-white px-5 pt-1 rounded-t-md text-[#352F29]">Property Type</div>
                    </div>
                    <div className="ps-5 ">
                        <h1 className=" pr-10 text-lg font-bold text-secondary py-5   group-hover:text-[#4F2F10]">Property Title </h1>
                        <p className="text-lg  text-secondary group-hover:text-[#4F2F10] space-x-2">
                            address will be here
                        </p>
                    </div>
                    <div className="flex  mt-5 border-t text-sm border-gray-300 border-dashed group-hover:text-[#4F2F10] text-secondary  w-full">
                        <div className="p-2 text-nowrap">long and lat </div>
                        <div className="border-r border-l border-gray-300 border-dashed p-2 text-nowrap "> N0 of Bedrooms </div>
                        <div className=" p-2 text-nowrap "> Toilet</div>

                    </div>
                </div>
            </Link>
        </div>
    )
}