
import { Edit2, Trash2, CheckCircle, MoreHorizontal } from 'lucide-react';

const ActionButtons = ({ onVerify, status }) => {


    return (
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 w-fit shadow-sm">

            {/* Verify Button */}
            <button
                onClick={onVerify}
                disabled={status === 'verified'}
                className={`cursor-pointer flex flex-col justify-center items-center   font-bold px-2 py-[2px] rounded-md transition-all duration-300
          ${status === 'verified'
                        ? ' cursor-not-allowed text-primary bg-white'
                        : ' bg-primary text-white hover:text-secondary hover:bg-white px-4 '}`}
            >
                <CheckCircle size={16} />
                {status === 'verified' ? 'Verified' : 'Verify'}
            </button>

            {/* <div className="w-px h-6  mx-1" /> */}

            {/* Edit Button */}
            {/* <button
                onClick={onEdit}
                className="cursor-pointer text-blue-500 hover:text-blue-900 bg-blue-500/10 font-bold px-3 py-1 rounded-md transition-all duration-300"
                title="Edit Item"
            >
                <Edit2 size={18} />
            </button> */}

            {/* Delete Button */}
            {/* <button
                onClick={onDelete}
                className="cursor-pointer text-red-500 hover:text-red-900 bg-red-500/10 font-bold px-3 py-1 rounded-md transition-all duration-300"
                title="Delete Item"
            >
                <Trash2 size={18} />
            </button> */}
        </div>
    );
};

export default ActionButtons;