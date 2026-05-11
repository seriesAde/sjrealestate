"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { FaUserAlt, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ViewUsersPage() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();

    const BASE_URL = "http://property.reworkstaging.name.ng/v1";

    const fetchAllUsers = useCallback(async () => {
        const agentData = JSON.parse(localStorage.getItem("agent_info"));
        const token = agentData?.token;

        if (!token) {
            toast.error("Session expired. Please login.");
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/users`, {
                params: {
                    limit: 5,
                    page: page,
                },
                headers: { 
                    Authorization: `Bearer ${token}` 
                }
            });

            const userData = response.data?.data || response.data || [];
            setUsers(Array.isArray(userData) ? userData : []);
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error(error.response?.data?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    }, [page, router]);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Assigned Users</h1>
                        <p className="text-gray-500 text-sm">Manage and view clients under your management</p>
                    </div>
                    <button 
                        onClick={() => fetchAllUsers()}
                        className="bg-white border text-[#00492c] border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition">
                        Refresh List
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">User Info</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 uppercase">Role</th>
                                <th className="p-4 text-xs font-semibold text-gray-600 uppercase text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse border-b border-gray-100">
                                        <td className="p-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                                        <td className="p-4"><div className="h-4 bg-gray-200 rounded w-48"></div></td>
                                        <td className="p-4"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                                        <td className="p-4"><div className="h-8 bg-gray-200 rounded w-20 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id || user._id} className="hover:bg-gray-50 border-b border-gray-100 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                                    <FaUserAlt size={14} />
                                                </div>
                                                <span className="font-medium text-gray-700">
                                                    {user.full_name || user.first_name || "N/A"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope size={12} className="text-gray-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md font-medium uppercase">
                                                {user.role || "Client"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => router.push(`/dashboard/users/${user.id || user._id}`)}
                                                className="text-blue-600 hover:underline text-sm font-medium">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center text-gray-400">
                                        No users found under your account.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm text-gray-600">Page {page}</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 border rounded-md bg-white disabled:opacity-50 hover:bg-gray-100"
                            >
                                <FaChevronLeft size={14} />
                            </button>
                            <button 
                                onClick={() => setPage(p => p + 1)}
                                disabled={users.length < 5}
                                className="p-2 border rounded-md bg-white disabled:opacity-50 hover:bg-gray-100"
                            >
                                <FaChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}