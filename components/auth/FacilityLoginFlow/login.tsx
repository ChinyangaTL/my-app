'use client';

import { Button } from '@/components/ui/button';
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
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  identifier: z.string().min(1, {
    message: 'Please enter the identifier/username of your facility',
  }),
  password: z.string().min(1, {
    message: 'Password cannot be empty',
  }),
});

const login = async (identifier: string, password: string) => {
  try {
    const response = await axios.post('/api/login', { identifier, password });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  // const res = await fetch('/api/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ identifier, password }),
  // });
  // console.log(res);
  // const { success } = await res.json();
  // console.log(success);
  // if (success) {
  //   router.push("/protected");
  //   router.refresh();
  // } else {
  //   alert("Login failed");
  // }
};

const FacilityLogin = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const login = async (data: { identifier: string; password: string }) => {
    try {
      const response = await axios.post('/api/login-facility', {
        username: data.identifier,
        password: data.password,
      });
      const { success } = await response.data;
      if (success) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>hellow</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)}>
          <FormField
            control={form.control}
            name='identifier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identifier</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormDescription>
                  This is your facility password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default FacilityLogin;
