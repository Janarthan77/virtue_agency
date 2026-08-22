import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase.from("enquiries").select("status, mail_history");
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    const stats = {
      total: data.length,
      new: data.filter((e) => e.status === "new").length,
      inReview: data.filter((e) => e.status === "in_review").length,
      contacted: data.filter((e) => e.status === "contacted").length,
      mailSent: data.filter((e) => e.status === "mail_sent").length,
      archived: data.filter((e) => e.status === "archived").length,
      totalEmailsSent: data.reduce((acc, e) => acc + (e.mail_history?.length || 0), 0),
    };

    return NextResponse.json({ success: true, stats });
  } catch (err: unknown) {
    return NextResponse.json({ success: false, error: err instanceof Error ? err.message : "Stats failed" }, { status: 500 });
  }
}
