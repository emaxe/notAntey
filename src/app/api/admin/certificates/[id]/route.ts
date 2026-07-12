import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { certificateSchema } from "@/lib/validations";

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
    const parsed = certificateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title: parsed.data.title,
        imageUrl: parsed.data.imageUrl ?? undefined,
      },
    });
    revalidatePath("/");
    revalidatePath("/certificates");
    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error updating certificate:", error);
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
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/certificates");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
