import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
  income: number;
  totalAmount: number;
}
const SpendingLimit: React.FC<Props> = ({ income, totalAmount }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let count = (totalAmount / income) * 100;
    setPercentage(count);
  }, [income, totalAmount]);

  return (
    <section className="flex px-6 mb-4">
      <Card className="w-full">
        <CardContent className="space-y-4 pt-6 ">
          <p className="text-sm font-semibold leading-none">Spending Summary</p>
          <Progress value={percentage} />
          <div className="flex flex-row-reverse ...">
            <Link href={"/transaction"}>
              <p className="text-sm font-semibold leading-none underline">
                View transaction
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SpendingLimit;
