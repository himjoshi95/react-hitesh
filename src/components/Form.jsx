import { Formik } from "formik";

const initialValues = {
    email: "",
    password: ""
}

const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
        errors.email = "Invalid Email";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 4) {
        errors.password = "Password too short";
    }

    return errors;
};

const submitForm = (values) => {
    console.log(values);
}

function Form() {
    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    isValid,
                    dirty
                } = formik
                return (
                    <div className="w-[400px] border p-2 bg-blue-200 rounded">
                        <h1 className="underline text-2xl font-semibold mb-5 text-center">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`rounded focus:outline-blue-500 ${errors.email && touched.email ? 'outline-none outline-red-500' : null}`}
                                    />
                                    {errors.email && touched.email && (
                                        <span className="error text-red-500">{errors.email}</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            `rounded focus:outline-blue-500 ${errors.password && touched.password ? 'outline-none outline-red-500' : null}`
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <span className="error text-red-500">{errors.password}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`${!(dirty && isValid) ? "disabled-btn" : ""} border bg-blue-500 cursor-pointer text-white py-1`}
                                    disabled={!(dirty && isValid)}
                                >
                                    Sign In
                                </button>

                            </div>
                        </form>
                    </div>
                )
            }}
        </Formik>
    )
};

export default Form;