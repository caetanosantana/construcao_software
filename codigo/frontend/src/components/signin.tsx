import { signIn } from "@/auth";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Entrar com email</button>
    </form>
  );
}
