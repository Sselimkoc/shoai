"use client";

import React from "react";
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
import Image from "next/image";

export default function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogTitle>Loading...</AlertDialogTitle>
        <AlertDialogDescription>
          Please wait while we generate the video script for you.
          {/* add a spinner here*/}
          {/* <Image src={"/loading.gif"} width={100} height={100}></Image> */}
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
