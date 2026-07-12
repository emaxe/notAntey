import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { readFileSync } from "fs";
import { join } from "path";

function createPrismaClient(): PrismaClient {
  const url = new URL(process.env["DATABASE_URL"]!);
  const pool = new Pool({
    host: url.hostname,
    port: Number(url.port),
    database: url.pathname.slice(1),
    user: url.username,
    password: url.password,
  });
  return new PrismaClient({ adapter: new PrismaPg(pool) });
}

const prisma = createPrismaClient();

function slugify(text: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
    я: "ya",
  };
  return text
    .toLowerCase()
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 100);
}

async function main() {
  const works = JSON.parse(
    readFileSync(join(process.cwd(), "src/data/works.json"), "utf-8")
  );
  const price = JSON.parse(
    readFileSync(join(process.cwd(), "src/data/price.json"), "utf-8")
  );
  const features = JSON.parse(
    readFileSync(join(process.cwd(), "src/data/features.json"), "utf-8")
  );
  const certificates = JSON.parse(
    readFileSync(join(process.cwd(), "src/data/certificates.json"), "utf-8")
  );

  // Seed Posts
  for (const work of works) {
    await prisma.post.upsert({
      where: { slug: slugify(work.title) },
      update: {},
      create: {
        title: work.title,
        slug: slugify(work.title),
        content: work.description,
        excerpt: work.description.slice(0, 200),
        images: [work.image],
        source: "manual",
        createdAt: new Date(work.date),
        updatedAt: new Date(work.date),
      },
    });
  }

  // Seed Price Categories + Items
  for (const cat of price) {
    let category = await prisma.priceCategory.findFirst({
      where: { name: cat.category },
    });
    if (!category) {
      category = await prisma.priceCategory.create({
        data: { name: cat.category, sortOrder: 0 },
      });
    }

    for (const item of cat.items) {
      await prisma.priceItem.create({
        data: {
          categoryId: category.id,
          name: item.name,
          price: item.price,
          unit: "руб.",
          sortOrder: 0,
        },
      });
    }
  }

  // Seed Features
  for (const f of features) {
    await prisma.feature.create({
      data: {
        title: f.title,
        description: f.description,
        icon: f.icon || "Star",
        sortOrder: f.id || 0,
      },
    });
  }

  // Seed Certificates
  for (const cert of certificates) {
    await prisma.certificate.create({
      data: {
        title: cert.title,
        imageUrl: cert.image,
        category: cert.issuer,
        createdAt: cert.date ? new Date(cert.date + "-01-01") : new Date(),
      },
    });
  }

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
