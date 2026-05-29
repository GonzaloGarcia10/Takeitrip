import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { hotelName, city, url } = await request.json();

    const click = await prisma.affiliateClick.create({
      data: {
        hotelName,
        city,
        url,
        referrer: request.headers.get("referer") || null,
      },
    });

    return NextResponse.json({ success: true, id: click.id });
  } catch (error) {
    console.error("Click tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30");

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const clicks = await prisma.affiliateClick.groupBy({
      by: ["hotelName", "city"],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate },
      },
      orderBy: { _count: { id: "desc" } },
    });

    const totalClicks = await prisma.affiliateClick.count({
      where: { createdAt: { gte: startDate } },
    });

    return NextResponse.json({ clicks, totalClicks, days });
  } catch (error) {
    console.error("Clicks GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
