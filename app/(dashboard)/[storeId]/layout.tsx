import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";

export default async function DashboardLayout({
    children,
    params  //here the params are the props that get passed down to the layout component from the route of the storeID from root layout.
}:{
    children: React.ReactNode;
    params:{storeId: string}
}){
    const {userId}=auth();

    if(!userId){
        redirect('/sign-in');
    }

    const store=await prismadb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    });

    if(!store){
        redirect('/')
    }

    return(
        <>
            <Navbar/>
            {children}
        </>
    )
}