import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { certificateSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(certificates);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = certificateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const certificate = await prisma.certificate.create({
      data: {
        title: parsed.data.title,
        imageUrl: parsed.data.imageUrl,
      },
    });
    revalidatePath("/");
    revalidatePath("/certificates");
    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
