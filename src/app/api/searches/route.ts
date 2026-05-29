import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { query, city, country, budget, maxPrice, style, results } = await request.json();

    const search = await prisma.search.create({
      data: {
        query,
        city,
        country,
        budget,
        maxPrice,
        style,
        results: results || undefined,
      },
    });

    return NextResponse.json({ success: true, id: search.id });
  } catch (error) {
    console.error("Search tracking error:", error);
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

    const searches = await prisma.search.groupBy({
      by: ["city"],
      _count: { id: true },
      where: {
        createdAt: { gte: startDate },
        city: { not: null },
      },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    });

    return NextResponse.json({ searches, days });
  } catch (error) {
    console.error("Searches GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
