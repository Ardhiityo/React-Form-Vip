import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

const schema = z.object({
  username: z
    .string("Username field is required")
    .min(3, "Username must be at least 3 characters"),
  password: z
    .string("Password field is required")
    .min(6, "Password must be at least 6 characters"),
});

type FormInputs = z.infer<typeof schema>;

type setSession = {
  setSession: Dispatch<SetStateAction<string | null>>
}

async function LoginUser(data: FormInputs) {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data)
    })
    return response.json();
  } catch (error) {
    return error;
  }
}

export default function Login({ setSession }: setSession) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormInputs) => mutate(data);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FormInputs) => {
      return LoginUser(data)
        .then(res => res);
    },
    onError: () => {
      alert('Username or password is incorrect');
    },
    onSuccess: (data) => {
      setSession(data.token);
    }
  });

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
              className="py-1 px-2 bg-slate-400 text-white w-full rounded-md mt-3 disabled:cursor-not-allowed disabled:bg-slate-300"
              type="submit" disabled={isPending}
            >
              {isPending ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
