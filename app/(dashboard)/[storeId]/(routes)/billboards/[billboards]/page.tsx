"use client"

import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// interface BillboardPageProps{
//   params: {billboardId: string}
// }
type BillboardType = {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

const BillboardPage =  () => {
  const [billboard, setBillboard] = useState<BillboardType | null>(null);

  const params=useParams();
  console.log(params["billboards"]);
  

  useEffect(()=>{
    const fetchBillboard=async()=>{
      const billboard = await prismadb.billboard.findUnique({
        where:{
          id: Array.isArray(params["billboards"]) ? params["billboards"][0] : params["billboards"]
        }
    })
    if (!billboard) {
      throw new Error('Billboard not found');
    }
    setBillboard(billboard);
    }
    fetchBillboard();
  }, [params.billboardId])
 
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard}/>
      </div>
    </div>
  );
};

export default BillboardPage;
