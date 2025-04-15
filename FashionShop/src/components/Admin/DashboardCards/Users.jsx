import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React,{ useEffect , useState} from "react";
import { axiosAdminUrl } from "../../../utils/axiosFetch";
import {getAllUsersOrderSummary} from "../Services/UserServices";
import { handleSuccess,handleError } from "../../../utils/tostify";

const invoices = [
  {
    profile: "👤",
    name: "John Doe",
    email: "johndoe@gmail.com",
    totalAmount: "PKR 250.00",
  },
  {
    profile: "👤",
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    totalAmount: "PKR 150.00",
  },
  {
    profile: "👤",
    name: "Alice Brown",
    email: "alicebrown@gmail.com",
    totalAmount: "PKR 350.00",
  },
  {
    profile: "👤",
    name: "Michael Johnson",
    email: "michaelj@gmail.com",
    totalAmount: "PKR 450.00",
  },
  {
    profile: "👤",
    name: "Emily Davis",
    email: "emilydavis@gmail.com",
    totalAmount: "PKR 500.00",
  },
  {
    profile: "👤",
    name: "Robert Wilson",
    email: "robertw@gmail.com",
    totalAmount: "PKR 600.00",
  },
  {
    profile: "👤",
    name: "Sophia Martinez",
    email: "sophiam@gmail.com",
    totalAmount: "PKR 700.00",
  },
  {
    profile: "👤",
    name: "William Taylor",
    email: "williamt@gmail.com",
    totalAmount: "PKR 800.00",
  },
];

export default function TableDemo() {
  const [users, setUsers] = useState([]);
  const [userCount , setUserCount] = useState(0);

   const fetchUsers = async () => {
    try {
      const response = await getAllUsersOrderSummary()
      if(response){
        setUsers(response.data);
        handleSuccess(response.data.message);
        console.log("first 10 users are : ",response.data)
      }
      else{
        setUsers([]);
        handleSuccess("No users found");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  

  return (
    <Table>
      <TableCaption>A list of our Top Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">No of Orders </TableHead>
          <TableHead className="text-right">Amount Spent </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{"👤"}{}</TableCell>
            <TableCell className="font-medium">{user?.username||""}</TableCell>
            <TableCell>{user.email||""}</TableCell>
            <TableCell className="text-right">{user.totalOrders||"0"}</TableCell>
            <TableCell className="text-right">{user.totalSpent||"PKR 0.00"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
