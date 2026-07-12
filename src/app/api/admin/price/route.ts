import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { priceCategorySchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const categories = await prisma.priceCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { items: { orderBy: { sortOrder: "asc" } } },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = priceCategorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const category = await prisma.priceCategory.create({
      data: {
        name: parsed.data.name,
        sortOrder: parsed.data.sortOrder || 0,
        items: {
          create:
            body.items?.map((item: { name: string; price: number; sortOrder?: number }) => ({
              name: item.name,
              price: item.price,
              sortOrder: item.sortOrder || 0,
            })) || [],
        },
      },
      include: { items: true },
    });
    revalidatePath("/");
    revalidatePath("/price");
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating price category:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
