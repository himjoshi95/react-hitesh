import { useForm } from "react-hook-form";

function HookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const formData = {
            ...data,
            success: 1
        }
        console.log(formData)
    }
    return (
        <div>
            <h3 className="underline mb-5">React Hook Form</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-10 mb-5">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        className="border border-blue-400 rounded"
                        {...register("email", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        }
                        )
                        }
                    />
                    {errors.email && errors.email.type === "required" && (
                        <p className="text-red-500">Email is required.</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p className="text-red-500">Email is not valid.</p>
                    )}
                </div>

                <div className="flex gap-3 mb-5">
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        className="border border-blue-400 rounded"
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p className="text-red-500">Password is required.</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className="text-red-500">
                            Password should be at-least 6 characters.
                        </p>
                    )}
                </div>

                <div>
                    <label></label>
                    <button type="submit" className="border p-2 hover:bg-blue-400">Login</button>
                </div>

            </form>

        </div>
    )
}

export default HookForm;