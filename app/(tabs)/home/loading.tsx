export default function Loading() {
  return (
    <div className="p-5 flex flex-col grid grid-cols-2 gap-5 pt-16">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="*:rounded-md flex flex-col gap-5 ">
          <div className="size-64 bg-neutral-400" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-400 h-5 w-40" />
            <div className="bg-neutral-400 h-5 w-20" />
            <div className="bg-neutral-400 h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
