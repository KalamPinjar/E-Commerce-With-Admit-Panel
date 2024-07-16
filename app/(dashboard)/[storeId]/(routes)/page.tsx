import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getTotalSales } from "@/actions/get-sales-count";
import { getTotalProductsInStock } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const totalProductsInStock = await getTotalProductsInStock(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Manage your store" />
        <Separator />
        <div className="gap-4 grid grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-2">
              <CardTitle className="font-medium text-sm">
                Total Revenue
              </CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-2">
              <CardTitle className="font-medium text-sm">Sales</CardTitle>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">+{totalSales}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center space-y-2">
              <CardTitle className="font-medium text-sm">
                Products In Stock
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">{totalProductsInStock}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
