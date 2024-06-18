"use server";

import { z } from "zod";
import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const productSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.coerce.number({
    required_error: "Price is required",
  }),
  daysToAdd: z.coerce.number({
    required_error: "Days to add is required",
  }),
});
export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    daysToAdd: Number(formData.get("daysToAdd")),
    description: formData.get("description"),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    const endBidDate = new Date();
    endBidDate.setDate(endBidDate.getDate() + result.data.daysToAdd);

    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo,
          endBidDate: endBidDate,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      await revalidateTag("home-products");
      redirect(`/sellplus/${product.id}`);
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUD_FLARE_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
