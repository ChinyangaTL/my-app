'use client';
import React, { useState } from 'react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import useFacilityAuth from '@/app/context/AuthContext/hook';

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one number',
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message:
        'Password must contain at least one special character (!@#$%^&*)',
    }),
});

const CreatePasswordFacility = () => {
  const { setCurrentStep, setFormState } = useFacilityAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setFormState((prev) => ({
      ...prev,
      password: values.password,
    }));
    setCurrentStep(3);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <FormControl>
                  <Input id='password' placeholder='Password' {...field} />
                </FormControl>
                {form.formState.errors && (
                  <p>{form.formState.errors.password?.message}</p>
                )}
              </FormItem>
            )}
          />
          <Button type='submit'>Next</Button>
        </form>
      </Form>
    </>
  );
};

export default CreatePasswordFacility;
