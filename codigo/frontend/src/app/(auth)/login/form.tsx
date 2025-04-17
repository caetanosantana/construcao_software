'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod"
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
 
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit() {
    toast.error("IMPLEMENTAR");
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="email" className="font-bold">E-mail</FormLabel>
            <FormControl>
              <Input placeholder="exemplo@escola.com" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="password" className="font-bold">Senha</FormLabel>
            <FormControl>
              <PasswordInput type="password" placeholder="********" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full">
        <LogIn />
        Entrar
      </Button>
    </form>
  </Form>
}