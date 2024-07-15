"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ColorColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage your colors"
        />
        <div>
          <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
            <Plus className="mr-2 w-4 h-4" />
            Add Color
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API routes for your Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default ColorClient;
