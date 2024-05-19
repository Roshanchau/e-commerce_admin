import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    {params}: {params: {colorId: string}}
){
    try{

        if(!params.colorId){
            return new NextResponse("color Id is required", {status: 400});
        }

        const color=await prismadb.color.findUnique({
            where:{
                id: params.colorId
            }
        })

        return NextResponse.json(color);

    }catch(error){
        console.log('[COLROS_GET]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string , colorId:string}}
){
    try{
        const {userId}=auth();
        const body= await req.json();

        const {name , value}= body;

        if(!userId){
            return new NextResponse("userId is required", {status: 400});
        }

        if(!name){
            return new NextResponse("name is required", {status: 400});
        }
        if(!value){
            return new NextResponse("value is required", {status: 400});
        }

        if(!params.colorId){
            return new NextResponse("Color Id is required", {status: 400});
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


        const color=await prismadb.color.updateMany({
            where:{
                id: params.colorId
            },
            data:{
                name,
                value,
            }
        })

        return NextResponse.json(color);

    }catch(error){
        console.log('[COLORS_PATCH]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string ,colorId: string}}
){
    try{
        const {userId}= auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!params.colorId){
            return new NextResponse("color Id is required", {status: 400});
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

        const color=await prismadb.color.deleteMany({
            where:{
                id: params.colorId
            }
        })

        return NextResponse.json(color);

    }catch(error){
        console.log('[COLORS_DELETE]', error);
        return new NextResponse("internal error", {status: 500});
    }
}