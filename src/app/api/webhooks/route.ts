import { NextRequest, NextResponse } from "next/server";
import { triggerWorkflow } from "@/lib/integrations/n8n";

export async function POST(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("source");
  const payload = await req.json();

  switch (source) {
    case "calcom":
      await triggerWorkflow("cal-booking", payload);
      return NextResponse.json({ ok: true, source: "calcom" });

    case "vapi":
      await triggerWorkflow("vapi-call", payload);
      return NextResponse.json({ ok: true, source: "vapi" });

    case "stripe":
      await triggerWorkflow("stripe-event", payload);
      return NextResponse.json({ ok: true, source: "stripe" });

    case "n8n":
      return NextResponse.json({ ok: true, received: payload });

    default:
      return NextResponse.json({ error: "Unknown source" }, { status: 400 });
  }
}
