"use client";

export default function Modal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-lg p-6 bg-white rounded-lg shadow-xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-secondary capitalize">
                        {title || "Book Appointment"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-primary transition-colors text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}