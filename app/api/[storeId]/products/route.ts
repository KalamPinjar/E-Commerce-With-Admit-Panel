import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", {
        status: 401,
      });
    }

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }
    if (!images || !images.length) {
      return new NextResponse("Images are required", {
        status: 400,
      });
    }
    if (!price) {
      return new NextResponse("Price is required", {
        status: 400,
      });
    }
    if (!categoryId) {
      return new NextResponse("CategoryId is required", {
        status: 400,
      });
    }
    if (!sizeId) {
      return new NextResponse("SizeId is required", {
        status: 400,
      });
    }
    if (!colorId) {
      return new NextResponse("ColorId is required", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        categoryId,
        sizeId,
        colorId,
        price,
        isArchived,
        isFeatured,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store Id is required", {
        status: 400,
      });
    }

    // console.log("Filtering with:", { storeId: params.storeId, categoryId, sizeId, colorId, isFeatured });

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log("Filtered Products:", products);

    const response = NextResponse.json(products);
    response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.log("[PRODUCT_GET]", error);

    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

