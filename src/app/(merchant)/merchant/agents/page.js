import Link from "next/link";

export default function Agents() {
    return (
        <div className=" w-full">

            <div className="flex justify-between w-full gap-20  p-5">
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        120 Properties
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full  text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        Appointments: 20
                    </h2>
                </div>
                <div className=" bg-white p-5 rounded-lg shadow-md w-full text-primary min-h-25 flex items-center justify-center">
                    <h2 className="text-2xl font-bold ">
                        Total Agents: 5
                    </h2>
                </div>
            </div>
            <div className="px-5">
                <div className="flex items-center justify-between w-full ">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                        AGENTS
                    </h1>
                    <Link href="/merchant/agents/create-agent" className="text-md font-bold text-primary mb-4 bg-primary/20 px-4 py-2 rounded-md hover:bg-primary/30 transition-all duration-300 cursor-pointer">
                        Add New Agent
                    </Link>
                </div>
                <table className="w-full text-sm text-left text-secondary ">
                    <thead className="text-lg text-secondary  " >
                        <tr className="">
                            <th className="w-1/4">Name</th>
                            <th className="w-1/4">Company</th>
                            <th className="w-1/4">Status</th>
                            <th className="w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="  ">
                            <td className="py-3">123 Main St</td>
                            <td className="py-3">John Doe</td>
                            <td className="py-3">Verified</td>
                            <td className="py-3 flex gap-5 w-full items-center text-justify">
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Edit
                                </button>
                                <button className="cursor-pointer text-blue-500 hover:text-blue-700 bg-blue-500/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Verify
                                </button>
                                <button className="cursor-pointer text-red-500 hover:text-red-700 bg-red-500/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">456 Oak Ave</td>
                            <td className="py-3">Jane Smith</td>
                            <td className="py-3">Pending</td>
                            <td className="py-3 flex gap-5 w-full items-center text-justify">
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Edit
                                </button>
                                <button className="cursor-pointer text-blue-500 hover:text-blue-700 bg-blue-500/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Verify
                                </button>
                                <button className="cursor-pointer text-red-500 hover:text-red-700 bg-red-500/20 font-bold px-3 py-1 rounded-md transition-all duration-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}