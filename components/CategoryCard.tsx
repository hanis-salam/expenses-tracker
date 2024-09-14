import * as Icons from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// Define props type
interface DisplayProps {
  iconName: keyof typeof Icons; // Ensure iconName is a valid key in Icons
  categoryName: string;
  data: { amount: number }[];
}
// Define the type for the icon component
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const CategoryCard: React.FC<DisplayProps> = ({
  iconName,
  categoryName,
  data,
}) => {
  // Calculate total amount
  const totalBillAmount = data.reduce((total, item) => total + item.amount, 0);

  // Dynamically access the icon component
  const LucideIcon = Icons[iconName as keyof typeof Icons] as IconComponent;
  return (
    <section className="flex px-2 mb-4">
      <Card className="w-full">
        <CardContent className="grid gap-4 pt-6 ">
          <div className=" flex items-center space-x-4 rounded-md">
            {/* Render the icon */}
            {LucideIcon ? <LucideIcon /> : <p>Icon not found</p>}

            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold leading-none">
                {categoryName}
              </p>
              <p className="text-sm text-muted-foreground">total spending</p>
            </div>
            <p>${totalBillAmount.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CategoryCard;
