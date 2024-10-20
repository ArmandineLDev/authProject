import { LoginButton } from "@/src/components/auth/LoginButton";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔒 Authentification
        </h1>
        <p className="text-white txt-lg">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Connexion
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
