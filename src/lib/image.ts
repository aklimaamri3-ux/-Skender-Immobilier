import sharp from "sharp";

export interface PreparedImage {
  body: Buffer;
  contentType: string;
  fileName: string;
}

export async function prepareImage(
  file: File,
  { maxWidth = 1600, quality = 80 }: { maxWidth?: number; quality?: number } = {}
): Promise<PreparedImage> {
  const input = Buffer.from(await file.arrayBuffer());
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const body = await sharp(input)
      .rotate()
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    return { body, contentType: "image/webp", fileName: `${id}.webp` };
  } catch {
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    return { body: input, contentType: file.type || "image/jpeg", fileName: `${id}.${ext}` };
  }
}
