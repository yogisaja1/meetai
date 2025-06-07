"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);

  const onSubmit = async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => window.alert("Something went wrong"),
        onSuccess: () => window.alert("Success"),
      }
    );
  };

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) {
    return (
      // Progress bar loading
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded shadow-md w-96 gap-4">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-center text-gray-600 text-sm">
            Please wait while we load your session...
          </p>
        </div>
      </div>
    );
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else if (session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded shadow-md w-96 gap-4">
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <h1>Logged in as {session.user.name}</h1>
          <h1>Email: {session.user.email}</h1>
          <Button
            variant="secondary"
            onClick={() => authClient.signOut()}
            className="mt-4 cursor-pointer hover:bg-gray-200"
          >
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse items-center justify-center min-h-screen bg-gray-100 gap-2">
      {/* Switch Register and Login */}

      {isRegistering ? (
        <>
          <p>
            Already have an account?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => setIsRegistering(false)}
            >
              Sign In
            </span>
          </p>
        </>
      ) : (
        <>
          <p>
            Don't have an account?{" "}
            <span
              className="font-bold cursor-pointer hover:underline"
              onClick={() => setIsRegistering(true)}
            >
              Sign Up
            </span>
          </p>
        </>
      )}

      {isRegistering ? <CardRegister onSubmit={onSubmit} /> : <CardLogin />}
    </div>
  );
}

const CardRegister = ({
  onSubmit,
}: {
  onSubmit: ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded shadow-md w-96 gap-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="secondary"
        onClick={
          onSubmit ? () => onSubmit({ email, name, password }) : undefined
        }
        className="mt-4 hover:cursor-pointer hover:bg-gray-200"
      >
        Create user
      </Button>
    </div>
  );
};

const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded shadow-md w-96 gap-4">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <Input
        placeholder="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="secondary"
        onClick={() => authClient.signIn.email({ email, password })}
        className="mt-4 hover:cursor-pointer hover:bg-gray-200"
      >
        Sign In
      </Button>
    </div>
  );
};

// 58:29
