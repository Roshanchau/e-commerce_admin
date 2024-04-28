"use client"

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const BillboardClient=()=>{
    const router=useRouter();
    const params=useParams();
return(
    <>
        <div className="flex items-center justify-between">
            <Heading
                title="Billboards (0)"
                description="Manage billboards for your store"
            />
            <Button onClick={()=>router.push(`/${params.storeId}/billboards/sdas`)}>
                <Plus className="mr-2 h-4 w-4"/>
                Add New
            </Button>
        </div>
    </>
)
}

export default BillboardClient;