import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: {params: { companionId: string }}
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    const companionId = params.companionId

    if(!companionId){
        return new NextResponse("Companion id is required", { status: 400 })
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instructions || !seed || !categoryId) {
      return new NextResponse("Missing Required Fields", { status: 400 });
    }

    // Create companion
    const companion = await db.companion.update({
        where: {
            id: params.companionId,
        },
        data: {
            categoryId,
            userId: user.id,
            userName: user.firstName,
            src,
            name,
            description,
            instructions,
            seed,
        },
    });

    return NextResponse.json(companion);
  } catch (error: any) {
    console.error("POST /api/companion error:", error);
    return new NextResponse(
      error?.message || "Internal Server Error",
      { status: 500 }
    );
  }
}
