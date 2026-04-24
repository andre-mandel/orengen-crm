import { NextRequest, NextResponse } from "next/server";
import { sendSMS } from "@/lib/integrations/twilio";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.to?.trim()) return NextResponse.json({ error: "Phone number required" }, { status: 400 });
    if (!body.message?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

    const result = await sendSMS(body.to.trim(), body.message.trim());
    return NextResponse.json({ ok: true, sid: result.sid });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "SMS send failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
