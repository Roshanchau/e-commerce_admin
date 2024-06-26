import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function GET(
    req: Request,
    {params}: {params: {billboardId: string}}
){
    try{

        if(!params.billboardId){
            return new NextResponse("billboard Id is required", {status: 400});
        }

        const billbaord=await prismadb.billboard.findUnique({
            where:{
                id: params.billboardId
            }
        })

        return NextResponse.json(billbaord);

    }catch(error){
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function PATCH(
    req: Request,
    {params}: {params: {storeId: string , billboardId:string}}
){
    try{
        const {userId}=auth();
        const body= await req.json();

        const {label , imageUrl}= body;

        if(!userId){
            return new NextResponse("userId is required", {status: 400});
        }

        if(!label){
            return new NextResponse("label is required", {status: 400});
        }
        if(!imageUrl){
            return new NextResponse("imageUrl is required", {status: 400});
        }

        if(!params.billboardId){
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


        const billbaord=await prismadb.billboard.updateMany({
            where:{
                id: params.billboardId
            },
            data:{
                label,
                imageUrl,
            }
        })

        return NextResponse.json(billbaord);

    }catch(error){
        console.log('[BILLBOARDS_PATCH]', error);
        return new NextResponse("internal error", {status: 500});
    }
}

export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string ,billboardId: string}}
){
    try{
        const {userId}= auth();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        if(!params.billboardId){
            return new NextResponse("billboard Id is required", {status: 400});
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

        const billbaord=await prismadb.billboard.deleteMany({
            where:{
                id: params.billboardId
            }
        })

        return NextResponse.json(billbaord);

    }catch(error){
        console.log('[BILLBOARDS_DELETE]', error);
        return new NextResponse("internal error", {status: 500});
    }
}