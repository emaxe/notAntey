import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { postSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const { title, slug, excerpt, content, images, source } = parsed.data;

    const sanitizedContent = typeof content === "string" ? DOMPurify.sanitize(content) : content;
    const sanitizedExcerpt = typeof excerpt === "string" ? DOMPurify.sanitize(excerpt) : excerpt;

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: sanitizedExcerpt,
        content: sanitizedContent,
        images: images || [],
        source: source || "manual",
      },
    });

    revalidatePath("/");
    revalidatePath("/works");
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
