import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const style = searchParams.get("style");

    const where: Record<string, unknown> = { isActive: true };

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }
    if (minPrice || maxPrice) {
      where.pricePerNight = {};
      if (minPrice) (where.pricePerNight as Record<string, number>).gte = parseFloat(minPrice);
      if (maxPrice) (where.pricePerNight as Record<string, number>).lte = parseFloat(maxPrice);
    }

    const hotels = await prisma.hotel.findMany({
      where,
      orderBy: { rating: "desc" },
      take: 20,
    });

    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Hotels API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, city, country, zone, pricePerNight, rating, description, highlights, imageUrl, bookingUrl } = body;

    if (!name || !city || !country) {
      return NextResponse.json(
        { error: "Name, city, and country are required" },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        city,
        country,
        zone: zone || "",
        pricePerNight: pricePerNight || 0,
        rating: rating || 0,
        description: description || "",
        highlights: highlights || [],
        imageUrl: imageUrl || "",
        bookingUrl: bookingUrl || "",
      },
    });

    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("Hotels POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
