import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { featureSchema } from "@/lib/validations";

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
    const parsed = featureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const feature = await prisma.feature.update({
      where: { id },
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        mediaUrl: parsed.data.mediaUrl ?? undefined,
        sortOrder: parsed.data.sortOrder ?? undefined,
      },
    });
    revalidatePath("/");
    revalidatePath("/features");
    return NextResponse.json(feature);
  } catch (error) {
    console.error("Error updating feature:", error);
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
    await prisma.feature.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/features");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting feature:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
