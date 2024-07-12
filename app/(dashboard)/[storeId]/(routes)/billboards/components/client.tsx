"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardsClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your billboards"
        />
        <div>
          <Button
            onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Billboard
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API routes for your Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId"/>
    </>
  );
};

export default BillboardsClient;
