import "server-only";

import { promises as fs } from "fs";
import path from "path";

export type Textbook = {
  slug: string;
  title: string;
  extension: string;
};

export type TextbookContent = Textbook & {
  content: string;
};

const TEXTBOOK_DIR = path.join(process.cwd(), "textbooks");
const SUPPORTED_EXTENSIONS = new Set([".md", ".txt"]);

function toTitle(fileName: string, content?: string) {
  const firstHeading = content?.match(/^#\s+(.+)$/m)?.[1]?.trim();

  if (firstHeading) {
    return firstHeading;
  }

  return fileName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isSafeSlug(slug: string) {
  return /^[a-zA-Z0-9._-]+$/.test(slug) && !slug.includes("..");
}

async function ensureTextbookDir() {
  await fs.mkdir(TEXTBOOK_DIR, { recursive: true });
}

export async function getTextbooks(): Promise<Textbook[]> {
  await ensureTextbookDir();

  const entries = await fs.readdir(TEXTBOOK_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => {
    const extension = path.extname(entry.name).toLowerCase();

    return entry.isFile() && SUPPORTED_EXTENSIONS.has(extension);
  });

  const textbooks = await Promise.all(
    files.map(async (file) => {
      const extension = path.extname(file.name);
      const slug = path.basename(file.name, extension);
      const content = await fs.readFile(path.join(TEXTBOOK_DIR, file.name), "utf8");

      return {
        slug,
        title: toTitle(slug, content),
        extension,
      };
    }),
  );

  return textbooks.sort((a, b) =>
    a.title.localeCompare(b.title, "ja", { numeric: true }),
  );
}

export async function getTextbook(slug: string): Promise<TextbookContent | null> {
  if (!isSafeSlug(slug)) {
    return null;
  }

  await ensureTextbookDir();

  for (const extension of SUPPORTED_EXTENSIONS) {
    const filePath = path.join(TEXTBOOK_DIR, `${slug}${extension}`);

    try {
      const content = await fs.readFile(filePath, "utf8");

      return {
        slug,
        title: toTitle(slug, content),
        extension,
        content,
      };
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;

      if (code !== "ENOENT") {
        throw error;
      }
    }
  }

  return null;
}
