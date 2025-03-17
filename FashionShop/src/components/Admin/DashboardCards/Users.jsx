import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
  return (
    <Table>
      <TableCaption>A list of our Top Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.profile}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">{user.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
