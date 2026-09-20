"use client";

import { useRef, useState } from "react";

async function compress(file: File, maxWidth: number, quality: number): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, maxWidth / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", quality)
    );
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

export function ImageInput({
  name,
  multiple = false,
  maxWidth = 1600,
  quality = 0.8,
}: {
  name: string;
  multiple?: boolean;
  maxWidth?: number;
  quality?: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  async function onChange() {
    const input = ref.current;
    if (!input?.files?.length) return;
    setStatus("Optimisation des images…");
    const originals = Array.from(input.files);
    const before = originals.reduce((a, f) => a + f.size, 0);
    const files = await Promise.all(originals.map((f) => compress(f, maxWidth, quality)));
    const after = files.reduce((a, f) => a + f.size, 0);
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    input.files = dt.files;
    const mb = (n: number) => (n / 1048576).toFixed(1);
    setStatus(`${files.length} image(s) prête(s) : ${mb(before)} Mo → ${mb(after)} Mo`);
  }

  return (
    <div>
      <input
        ref={ref}
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
        className="input"
      />
      {status && <p className="mt-1 text-xs text-blanc/50">{status}</p>}
    </div>
  );
}
