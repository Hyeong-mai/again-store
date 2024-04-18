"use server";

export const handleForm = async (prevState: any, data: FormData) => {
  console.log(prevState);
  return {
    errors: ["wrong password"],
  };
};
