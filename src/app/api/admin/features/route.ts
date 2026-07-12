import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { featureSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const features = await prisma.feature.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(features);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const parsed = featureSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const feature = await prisma.feature.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        mediaUrl: parsed.data.mediaUrl || null,
        sortOrder: parsed.data.sortOrder || 0,
      },
    });
    revalidatePath("/");
    revalidatePath("/features");
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error("Error creating feature:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
