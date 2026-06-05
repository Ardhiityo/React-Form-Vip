export default function Loading() {
  return (
    <>
      {Array.from({ length: 20 }, (_: unknown, i: number) => (
        <div
          className="border-2 border-slate-200 p-3 h-64 animate-pulse"
          key={`products-${i}`}
        >
          <div>
            <div className="w-full h-36 bg-slate-300 animate-pulse" />
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="h-16 w-32 bg-slate-300 rounded-md animate-pulse"></div>
            <div className="h-10 w-16 bg-slate-300 rounded-md animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
}
