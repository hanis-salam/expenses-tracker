"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";

interface Expense {
  name: string;
  desc: string;
  amount: number;
  time: string; // Time in "HH:MM" format
  date: string; // Date in "MM-DD-YYYY" format
}
interface FormProps {
  onSubmit: (data: Expense[]) => void;
  onSubmitIncome: (data: number) => void;
  incomeData: number;
}

const EntryForm: React.FC<FormProps> = ({
  onSubmit,
  onSubmitIncome,
  incomeData,
}) => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [income, setIncome] = useState(incomeData);
  const expenses: Expense[] = [
    {
      name: category,
      desc: desc,
      amount: amount,
      time: hour + ":" + min,
      date: date,
    },
  ];
  const SaveEntry = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get the current array from localStorage
    let retrieveData: any = localStorage.getItem("expenses");
    let existing = JSON.parse(retrieveData) || [];
    // Add the new array to the existing one
    existing = existing.concat(expenses);
    onSubmit(existing);
    // reset form
    setAmount(0);
    setCategory("");
    setDate("");
    setDesc("");
    setHour("");
    setMin("");
  };
  const SaveIncome = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitIncome(income);
  };
  return (
    <section className="p-4">
      <Tabs defaultValue="Expense" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="Income"
            className="data-[state=active]:bg-[#013B94] data-[state=active]:text-white data-[state=inactive]:text-black"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="Expense"
            className="data-[state=active]:bg-[#013B94] data-[state=active]:text-white data-[state=inactive]:text-black"
          >
            Expense
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Income">
          <Card>
            <CardContent className="pt-4">
              <form className="space-y-4" onSubmit={SaveIncome}>
                <Input
                  type="number"
                  placeholder="what is your monthly income ?"
                  className="placeholder:text-black"
                  onChange={(e) => setIncome(Number(e.target.value))}
                  value={income === 0 ? "" : income}
                />

                <p className="text-sm font-semibold leading-none">
                  Last updated salary : {incomeData}
                </p>
                <Button
                  variant="outline"
                  className="w-full text-white bg-[#013B94] p-6"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Expense">
          <Card>
            <CardContent className="pt-4">
              <form className="space-y-4" onSubmit={SaveEntry}>
                <Select
                  onValueChange={(value) => setCategory(value)}
                  value={category}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="what did you buy ?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Bill">Bill</SelectItem>
                    <SelectItem value="Shop">Shop</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={amount === 0 ? "" : amount}
                  placeholder="how much was it ?"
                  className="placeholder:text-black"
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <Textarea
                  placeholder="any detail ?"
                  value={desc}
                  className="placeholder:text-black"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <div className="flex">
                  <Popover>
                    <PopoverTrigger className="pr-4">
                      <Input
                        readOnly
                        type="text"
                        placeholder="time ?"
                        value={hour && min !== "" ? hour + ":" + min : ""}
                        className="placeholder:text-black"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-60">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="hour">Hour</Label>
                            <Input
                              type="number"
                              value={hour}
                              id="hour"
                              placeholder="10"
                              className="col-span-2 h-8"
                              onChange={(e) => setHour(e.target.value || "00")}
                            />
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="minute">Minute</Label>
                            <Input
                              type="number"
                              id="minute"
                              value={min}
                              placeholder="45"
                              className="col-span-2 h-8"
                              onChange={(e) => setMin(e.target.value || "00")}
                            />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="date"
                    className="w-60"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full text-white bg-[#013B94] p-6"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default EntryForm;
