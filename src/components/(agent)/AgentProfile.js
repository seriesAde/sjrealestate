"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AgentAvatarUpload() {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Client-side Validation
        if (file.size > 2 * 1024 * 1024) {
            return toast.error("Image must be less than 2MB");
        }

        // Create local preview
        setPreview(URL.createObjectURL(file));

        // 2. Prepare Data
        const agentInfo = JSON.parse(localStorage.getItem("agent_info") || "{}");
        const token = agentInfo.token;
        const agentId = agentInfo.id || agentInfo.user?.id;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            setUploading(true);
            const res = await axios.put(
                `http://property.reworkstaging.name.ng/v1/agents/${agentId}/resource`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Profile picture updated!");

            // Update local storage if the API returns the new image URL
            if (res.data?.avatar) {
                const updatedInfo = { ...agentInfo, avatar: res.data.avatar };
                localStorage.setItem("agent_info", JSON.stringify(updatedInfo));
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm max-w-sm mx-auto">
            <div className="relative group">
                <div className="h-32 w-32 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#00492c]">
                    {preview ? (
                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    )}
                </div>

                <label className="absolute bottom-0 right-0 bg-[#00492c] p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                    <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            <div className="mt-6 text-center">
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Agent Avatar</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                    {uploading ? "Uploading to server..." : "JPG or PNG, Max 2MB"}
                </p>
            </div>

            {uploading && (
                <div className="w-full bg-gray-100 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-[#00492c] h-full animate-progress-indefinite w-1/2 rounded-full"></div>
                </div>
            )}
        </div>
    );
}