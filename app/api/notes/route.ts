
import { NextResponse } from "next/server";
import { readNotes, saveNote } from "@/lib/FileStorage";


export async function GET() {
  try {
    const notes = await readNotes();
    return NextResponse.json({ notes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not read notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.note !== "string" || !body.note.trim()) {
      return NextResponse.json(
        { message: "Please enter a note" },
        { status: 400 }
      );
    }

    await saveNote(body.note.trim());

    return NextResponse.json(
      { message: "Note saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Could not save note" },
      { status: 500 }
    );
  }
}
