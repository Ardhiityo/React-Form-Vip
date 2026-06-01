import { useForm, Controller } from "react-hook-form";

type FormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => console.log(data);

  return (
    <section className="min-h-screen w-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-md p-7 min-w-1/4">
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username*</label>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Username field is required.",
                },
                minLength: {
                  value: 3,
                  message: "The Username field must be at least 3 characters.",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="username"
                  placeholder="Insert your username"
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              )}
            />
            {errors.username && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: "Password field is required.",
                },
                minLength: {
                  value: 8,
                  message: "The Password field must be at least 8 characters.",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="Insert your password"
                  className="border-2 border-slate-300 rounded-md p-2"
                />
              )}
            />
            {errors.password && (
              <span className="text-sm text-red-500 font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <button
              className="py-1 px-2 bg-slate-400 text-white w-full rounded-md mt-3"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
