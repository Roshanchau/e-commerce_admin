'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from "@prisma/client"
import { Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SettingFormProps {
    initailData: Store;
}

const formSchema= z.object({
  name: z.string().min(1)
});

type SettingFormValues= z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingFormProps> = ({
    initailData
}) => {
  const[open, setOpen]=useState(false);
  const[loading, setLoading]=useState(false);

  const form=useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initailData
  });

  const onSubmit=async(data: SettingFormValues)=>{
    console.log(data);
  }

  return (
  <>
    <div className="flex items-center justify-between">
        <Heading
            title="Settings"
            description="Manage store prefrences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={()=>[]}
        >
          <Trash className="h-4 w-4"/>
        </Button>
    </div>
    <Separator/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Store name" {...field}/>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  </>
  )
}

export default SettingsForm