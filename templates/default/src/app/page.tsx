import { Show } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <Show when="signed-out">
        <p>Sign in to get started.</p>
      </Show>
      <Show when="signed-in">
        <p>You are signed in.</p>
      </Show>
    </>
  );
}
