"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductsClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Products (${data.length})`}
          description="Manage your products"
        />
        <div>
          <Button
            onClick={() => router.push(`/${params.storeId}/products/new`)}
          >
            <Plus className="mr-2 w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API routes for your Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId"/>
    </>
  );
};

export default ProductsClient;
