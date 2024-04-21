"use server";

export const handleForm = async (prevState: any, data: FormData) => {
  return {
    errors: ["wrong password"],
  };
};
