"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
interface Expense {
  name: string;
  desc: string;
  amount: number;
  time: string; // Time in "HH:MM" format
  date: string; // Date in "MM-DD-YYYY" format
}

function TransactionList() {
  const [data, setData] = useState<Expense[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expenses");
      try {
        if (saved) setData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved expenses", error);
      }
    }
  }, []);

  // Delete function
  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index); // Remove item by index
    setData(updatedData); // Update state
    localStorage.setItem("expenses", JSON.stringify(updatedData)); // Update localStorage
  };

  // Edit function
  const handleEdit = (index: number) => {
    const expense = data[index];
    setEditIndex(index);
    setEditExpense(expense); // Set the current expense to be edited
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && editExpense) {
      const updatedData = [...data];
      updatedData[editIndex] = editExpense;
      setData(updatedData);
      localStorage.setItem("expenses", JSON.stringify(updatedData));
      setEditIndex(null);
      setEditExpense(null);
    }
  };

  return (
    <main className="bg-[#013B94] text-white min-h-screen">
      <section className="max-w-7xl mx-auto p-6">
        <Card className="w-full">
          <CardContent className="pt-6 ">
            <Table>
              {data.length > 0 ? (
                <TableCaption>A list of your recent invoices.</TableCaption>
              ) : (
                <TableCaption>No expenses recorded yet.</TableCaption>
              )}

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[70px]">no.</TableHead>
                  <TableHead>date @ time</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Desc</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.date + " @ " + item.time}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.desc}</TableCell>
                    <TableCell className="text-right">
                      ${item.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        className="text-red-500 hover:text-red-700 mr-6"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>

                      {/* Trigger the AlertDialog with the current expense data */}
                      <AlertDialog>
                        <AlertDialogTrigger
                          className="text-green-400 hover:text-green-700"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Edit Expense</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogDescription>
                            <div className="space-y-4">
                              <input
                                type="text"
                                className="border border-gray-300 rounded-md w-full p-2"
                                value={editExpense?.desc || ""}
                                onChange={(e) =>
                                  setEditExpense({
                                    ...editExpense!,
                                    desc: e.target.value,
                                  })
                                }
                                placeholder="Description"
                              />
                              <input
                                type="number"
                                className="border border-gray-300 rounded-md w-full p-2"
                                value={editExpense?.amount || 0}
                                onChange={(e) =>
                                  setEditExpense({
                                    ...editExpense!,
                                    amount: parseFloat(e.target.value),
                                  })
                                }
                                placeholder="Amount"
                              />
                              <input
                                type="time"
                                className="border border-gray-300 rounded-md w-full p-2"
                                value={editExpense?.time || ""}
                                onChange={(e) =>
                                  setEditExpense({
                                    ...editExpense!,
                                    time: e.target.value,
                                  })
                                }
                              />
                              <input
                                type="date"
                                className="border border-gray-300 rounded-md w-full p-2"
                                value={editExpense?.date || ""}
                                onChange={(e) =>
                                  setEditExpense({
                                    ...editExpense!,
                                    date: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSaveEdit}>
                              Save
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Link href={"/"}>
          <p className="text-sm font-semibold p-6">Back to Main page</p>
        </Link>
      </section>
    </main>
  );
}

export default TransactionList;
