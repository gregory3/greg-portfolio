import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim() ?? "";
    const normalizedEmail = body.email?.trim().toLowerCase() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || name.length > 120) {
      return NextResponse.json(
        { error: "Please share your name." },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (message.length < 5 || message.length > 4000) {
      return NextResponse.json(
        { error: "Please include a short message." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "greg_portfolio");

    await db.collection("contact_messages").insertOne({
      name,
      email: normalizedEmail,
      message,
      source: "contact_form",
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact route failed", error);

    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 }
    );
  }
}
