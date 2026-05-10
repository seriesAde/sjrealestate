

import { useState } from "react";

export const useForm = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleChange,
    };
};