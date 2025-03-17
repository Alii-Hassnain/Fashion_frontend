import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OverView = ({title,number}) => {
  return (
    
    <div className="w-60">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
          <CardDescription>users report</CardDescription>
        </CardHeader>
        <CardContent className = "text-center">
          <p>4</p>
        </CardContent>
        
      </Card>
    </div>
  );
};

export default OverView;
