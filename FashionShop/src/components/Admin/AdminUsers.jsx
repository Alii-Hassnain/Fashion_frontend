import React from 'react'

import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@/components/ui/table";
  import { useEffect , useState} from "react";
 
  const invoices = [
    {
      profile: "👤",
      _id:1234,
      name: "John Doe",
      email: "johndoe@gmail.com",
      totalAmount: "PKR 250.00",
    },
    {
      profile: "👤",
      _id:1235,
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      totalAmount: "PKR 150.00",
    },
    {
      profile: "👤",
      _id:1236,
      name: "Alice Brown",
      email: "alicebrown@gmail.com",
      totalAmount: "PKR 350.00",
    },
    {
      profile: "👤",
      _id:1237,
      name: "Michael Johnson",
      email: "michaelj@gmail.com",
      totalAmount: "PKR 450.00",
    },
    {
      profile: "👤",
      _id:1238,
      name: "Emily Davis",
      email: "emilydavis@gmail.com",
      totalAmount: "PKR 500.00",
    },
    {
      profile: "👤",
      _id:1239,
      name: "Robert Wilson",
      email: "robertw@gmail.com",
      totalAmount: "PKR 600.00",
    },
    {
      profile: "👤",
      _id:1240,
      name: "Sophia Martinez",
      email: "sophiam@gmail.com",
      totalAmount: "PKR 700.00",
    },
    {
      profile: "👤",
      _id:1241,
      name: "William Taylor",
      email: "williamt@gmail.com",
      totalAmount: "PKR 800.00",
    },
  ];

const AdminUsers = () => {
  return (
    <div>

    <h2 className="text-2xl font-bold mb-4 text-center m-4 text-white bg-slate-600 p-3">A List of ALL Users</h2>
    <Table>
        
          <TableCaption>A List of ALL Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Profile</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.profile}{user._id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.totalAmount}</TableCell>
                <TableCell className="text-right">
                    <button className='btn btn-error'>delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  )
}

export default AdminUsers