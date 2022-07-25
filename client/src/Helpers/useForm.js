import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (validate) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsSubmitting(true);
    if (JSON.stringify(errors) === "{}" && clicked) {
      navigate("/recommendation");
    }
  }, [clicked]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setClicked(!clicked);
  };
  return { values, errors, handleSubmit, handleChange };
};

export default useForm;
