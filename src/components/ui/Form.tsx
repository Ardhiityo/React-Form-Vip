import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { ZodType } from "zod";

export default function Form({
  schema,
  onSubmit,
  fields,
  isLoading,
  defaultValues,
}: {
  schema: ZodType;
  onSubmit: (data: unknown) => void;
  fields: {
    label: string;
    name: string;
    type: string;
    placeholder: string;
  }[];
  isLoading: boolean;
  defaultValues: { [key: string]: string };
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <label htmlFor={item.name}>{item.label}*</label>
          <Controller
            name={item.name as never}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={item.type}
                id={item.name}
                placeholder={item.placeholder}
                className="border-2 border-slate-300 rounded-md p-2"
              />
            )}
          />
          {errors[item.name] && (
            <span className="text-sm text-red-500 font-semibold">
              {`${errors[item.name].message}`}
            </span>
          )}
        </div>
      ))}
      <div>
        <button
          className="py-1 px-2 bg-slate-400 text-white w-full rounded-md mt-3 disabled:cursor-not-allowed disabled:bg-slate-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
}
