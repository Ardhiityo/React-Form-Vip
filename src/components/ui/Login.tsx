import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  username: z
    .string("Username field is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string("Password field is required")
    .min(8, "Password must be at least 8 characters"),
});

type FormInputs = z.infer<typeof schema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

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
