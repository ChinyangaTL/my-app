'use client';
import * as z from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FacilityType } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import useFacilityAuth from '@/app/context/AuthContext/hook';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter the name of your facility',
  }),
  phoneNumber: z.string().min(1, {
    message: 'Please enter a server image URL',
  }),
  facilityType: z.nativeEnum(FacilityType),
});

const RegisterCard = () => {
  const { currentStep, formState, setCurrentStep, setFormState } =
    useFacilityAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      facilityType: FacilityType.PHARMARCY,
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setCurrentStep(1);
    // setFormState((prev) => ({ ...values }));
    // console.log(formState);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='name'>Facility Name</FormLabel>
                  <FormControl>
                    <Input id='name' placeholder='Facility Name' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex'>
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id='phoneNumber'
                        placeholder='+267.......'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='facilityType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='facilityType'>Facility Type</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className='w-[180px]'>
                          <SelectValue placeholder='Pharmarcy' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='pharmarcy'>Pharmarcy</SelectItem>
                          <SelectItem value='hospital'>Hospital</SelectItem>
                          <SelectItem value='clinic'>Clinic</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit'>next</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
