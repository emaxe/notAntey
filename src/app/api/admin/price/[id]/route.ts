import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { priceCategorySchema } from "@/lib/validations";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = priceCategorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const category = await prisma.priceCategory.update({
      where: { id },
      data: {
        name: parsed.data.name,
        sortOrder: parsed.data.sortOrder ?? undefined,
      },
      include: { items: true },
    });
    revalidatePath("/");
    revalidatePath("/price");
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating price category:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    await prisma.priceItem.deleteMany({ where: { categoryId: id } });
    await prisma.priceCategory.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/price");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting price category:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
