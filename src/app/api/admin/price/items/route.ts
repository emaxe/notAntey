import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { priceItemSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = priceItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const item = await prisma.priceItem.create({
      data: {
        name: parsed.data.name,
        price: parsed.data.price,
        categoryId: parsed.data.categoryId,
        sortOrder: parsed.data.sortOrder || 0,
      },
    });
    revalidatePath("/");
    revalidatePath("/price");
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating price item:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
