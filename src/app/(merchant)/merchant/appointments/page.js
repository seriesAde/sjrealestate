import Link from "next/link";
export default function Appointments() {
    return (
        <div className=" w-full">


            <div className="px-5">
                <div className="flex items-center justify-between w-full ">
                    <h1 className="text-2xl font-bold text-primary mb-4">
                        APPPOINTMENTS
                    </h1>

                </div>
                <table className="w-full text-sm text-left text-secondary ">
                    <thead className="text-lg text-secondary  " >
                        <tr className="">
                            <th className="w-1/4">Name</th>
                            <th className="w-1/4">Company</th>
                            <th className="w-1/4">Date</th>
                            <th className="w-1/4">Status</th>
                            <th className="w-1/4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="  ">
                            <td className="py-3">123 Main St</td>
                            <td className="py-3">John Doe</td>
                            <td className="py-3">2023-10-15</td>
                            <td className="py-3">Pending</td>
                            <td className="py-3 flex gap-3 w-full items-center text-justify">
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
                                    Confirm
                                </button>
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
                                    complete
                                </button>
                                <button className="cursor-pointer text-red-500 hover:text-red-700 bg-red-500/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-3">456 Oak Ave</td>
                            <td className="py-3">Jane Smith</td>
                            <td className="py-3">2023-10-16</td>
                            <td className="py-3">Pending</td>
                            <td className="py-3 flex gap-3 w-full items-center text-justify">
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
                                    Confirm
                                </button>
                                <button className="cursor-pointer text-primary hover:text-secondary bg-primary/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
                                    complete
                                </button>
                                <button className="cursor-pointer text-red-500 hover:text-red-700 bg-red-500/20 text-xs px-3 py-1 rounded-md transition-all duration-300">
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