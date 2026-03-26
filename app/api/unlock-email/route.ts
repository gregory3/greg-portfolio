import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const normalizedEmail = body.email?.trim().toLowerCase() ?? "";

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "greg_portfolio");

    await db.collection("unlock_emails").updateOne(
      { email: normalizedEmail },
      {
        $set: {
          email: normalizedEmail,
          source: "unlock_gate",
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("unlock-email route failed", error);

    return NextResponse.json(
      { error: "Something went wrong while saving your email." },
      { status: 500 }
    );
  }
}
