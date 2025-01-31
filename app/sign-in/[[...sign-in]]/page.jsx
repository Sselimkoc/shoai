import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-orange-500 hover:bg-orange-600 text-white",
          },
        }}
      />
    </div>
  );
}
