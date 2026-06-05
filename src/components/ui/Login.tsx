import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import Form from "./Form";

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
  setSession: Dispatch<SetStateAction<string | null>>;
};

async function LoginUser(data: FormInputs) {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return error;
  }
}

export default function Login({ setSession }: setSession) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FormInputs) => {
      return LoginUser(data).then((res) => res);
    },
    onError: () => {
      alert("Username or password is incorrect");
    },
    onSuccess: (data) => {
      setSession(data.token);
    },
  });

  const onLogin = (data: FormInputs) => {
    mutate(data);
  };

  return (
    <section className="min-h-screen w-screen flex justify-center items-center">
      <div className="border border-gray-200 rounded-md p-7 min-w-1/4">
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>
        <Form
          onSubmit={onLogin}
          schema={schema}
          isLoading={isPending}
          fields={[
            {
              label: "Username",
              name: "username",
              type: "text",
              placeholder: "Insert username",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Insert password",
            },
          ]}
          defaultValues={{ username: "johnd", password: "m38rmF$" }}
        />
      </div>
    </section>
  );
}
