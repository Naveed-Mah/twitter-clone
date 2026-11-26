
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "notes.json");

export async function readNotes(): Promise<string[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as string[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function saveNote(note: string): Promise<void> {
  const notes = await readNotes();
  notes.push(note);

  await fs.writeFile(
    filePath,
    JSON.stringify(notes, null, 2),
    "utf-8"
  );
}
