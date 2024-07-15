import prismadb from "@/lib/prismadb";
import { Size } from "./components/size-form";

const SizeForm = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Size initialData={size} />
      </div>
    </div>
  );
};

export default SizeForm;
