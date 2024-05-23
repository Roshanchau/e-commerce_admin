import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    {params}: {params: {productId: string}}
){
    try{

        if(!params.productId){
            return new NextResponse("product Id is required", {status: 400});
        }

        const product=await prismadb.product.findUnique({
            where:{
                id: params.productId
            },
            include:{
                images: true,
                category: true,
                size: true,
                color: true
            }
        })

        return NextResponse.json(product);

    }catch(error){
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string , productId:string}}
){
    try{
        const {userId}=auth();
        const body= await req.json();

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
          } = body;

        if(!userId){
            return new NextResponse("userId is required", {status: 400});
        }

        if (!name) {
            return new NextResponse("label is required", { status: 400 });
          }
          if (!price) {
            return new NextResponse("imageUrl is required", { status: 400 });
          }
      
          if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
          }
          if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
          }
          if (!sizeId) {
            return new NextResponse("size id is required", { status: 400 });
          }
          if (!colorId) {
            return new NextResponse("color id is required", { status: 400 });
          }
      

        if(!params.productId){
            return new NextResponse("Billboard Id is required", {status: 400});
        }

        const storeByuserId=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId,
            }
        })

        if(!storeByuserId){
            return new NextResponse("Unauthorized" , {status: 403})
        }

        await prismadb.image.deleteMany({
            where: {
                productId: params.productId
            }
        });

        const product=await prismadb.product.updateMany({
            where:{
                id: params.productId
            },
            data:{
                name,
                price,
                categoryId,
                colorId,
                sizeId,
                isArchived,
                isFeatured
            }
        })

        for (const image of images) {
            await prismadb.image.create({
                data: {
                    url: image.url,
                    productId: params.productId
                }
            });
        }

        // const product= await prismadb.product.update({
        //     where:{
        //         id: params.productId
        //     },
        //     data:{
        //         images:{
        //             createMany:{
        //                 data:[
        //                     ...images.map((image: {url: string})=> image)
        //                 ]
        //             }
        //         }
        //     }
        // })

        return NextResponse.json(product);

    }catch(error){
        console.log('[PRODUCTS_PATCH]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string ,productId: string}}
){
    try{
        const {userId}= auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!params.productId){
            return new NextResponse("proudct Id is required", {status: 400});
        }

        const storeByuserId=await prismadb.store.findFirst({
            where:{
                id:params.storeId,
                userId,
            }
        })

        console.log("store by userId" , storeByuserId)

        if(!storeByuserId){
            return new NextResponse("Unauthorized" , {status: 403})
        }

        const product=await prismadb.product.deleteMany({
            where:{
                id: params.productId
            }
        })

        console.log("product" , product)

        return NextResponse.json(product);

    }catch(error){
        console.log('[PRODUCTS_DELETE]', error);
        return new NextResponse("internal error", {status: 500});
    }
}