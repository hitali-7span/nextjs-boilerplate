"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, EyeIcon, EyeOffIcon, X } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dummyImage from "@/assets/images/dummy-image.jpg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function Profile() {
  const [profileImage, setProfileImage] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const editProfile = z.object({
    profile_image: z.any(),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    gender: z.string().min(1, "You need to select a gender"),
    occupation: z.string().min(1, "You need to select an occupation"),
    birthdate: z.date({ message: "Select a birthdate" }),
  });
  const form = useForm({
    resolver: zodResolver(editProfile),
    defaultValues: {
      profile_image: {},
      name: "7span",
      password: "",
      gender: "",
      occupation: "",
      birthdate: "",
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections?.length > 0) {
      errorToast("File does not supported");
      return false;
    }
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const mimeType = file.type
          ? file.type
          : e.target.result.substring(
              e.target.result.indexOf(":") + 1,
              e.target.result.indexOf(";")
            );
        setProfileImage({
          id: Date.now() + index,
          url: e.target.result,
          filename: file.name,
          mime_type: mimeType,
          size: file?.size,
          isUploaded: true,
          file: file,
        });
        form.setValue("profile_image", {
          id: Date.now() + index,
          url: e.target.result,
          filename: file.name,
          mime_type: mimeType,
          size: file?.size,
          file: file,
        });
      };
      reader.readAsDataURL(file);
      return file;
    });
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: false,
  });

  return (
    <div className="max-w-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((val) => {
            console.log(val);
          })}
          className="space-y-4"
        >
          <FormField
            key="profile_image"
            name="profile_image"
            control={form.control}
            render={() => {
              return (
                <FormItem>
                  <Label>Profile Picture</Label>
                  <FormControl>
                    <div className="relative w-24 h-24">
                      <div {...getRootProps()} className="cursor-pointer">
                        <Input {...getInputProps()} />
                        <img
                          className="aspect-square object-contain"
                          src={
                            profileImage?.url
                              ? profileImage?.url
                              : dummyImage.src
                          }
                          alt=""
                        />
                      </div>
                      {profileImage.url ? (
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute -top-3 -right-3 p-0 bg-red-500 hover:bg-red-500/90 h-6 w-6"
                          onClick={() => {
                            setProfileImage({});
                          }}
                        >
                          <X className="text-white " />
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            key="name"
            name="name"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input
                      type="text"
                      className="font-semibold"
                      placeholder="Enter Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            key="password"
            name="password"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Password</Label>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        className="font-semibold t"
                        placeholder="Enter Your Password"
                        {...field}
                      />
                      {passwordVisible ? (
                        <EyeIcon
                          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        />
                      ) : (
                        <EyeOffIcon
                          className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                          onClick={() => {
                            setPasswordVisible(!passwordVisible);
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            key="gender"
            name="gender"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Gender</Label>
                  <FormControl>
                    <RadioGroup
                      className="flex gap-4"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="r1" />
                        <Label htmlFor="r1">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="r2" />
                        <Label htmlFor="r2">Female</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            key="occupation"
            name="occupation"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label>Occupation</Label>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="tester">Tester</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            key="birthdate"
            name="birthdate"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <Label className="block">Date Of Birth</Label>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
