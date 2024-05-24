// "use client";

// import { useFormState } from "react-dom";
// import { startStream } from "./actions";
// import Input from "@/Components/input";
// import Button from "@/Components/button";

// export default function AddStream() {
//   const [state, action] = useFormState(startStream, null);
//   return (
//     <form className="p-5 flex flex-col gap-2" action={action}>
//       <Input
//         name="title"
//         required
//         placeholder="Title or your stream."
//         errors={state?.formErrors}
//       />
//       <Button text="Start streaming" />
//     </form>
//   );
// }

export default function LiveStream() {
  return (
    <div>
      <h1>Stream</h1>
    </div>
  );
}
