import { auth } from '@clerk/nextjs/server';

export default function Home() {
  const {orgSlug} = auth();

  return (
   <>
     <p className="pb-8">From auth(), I know your org slug is: {orgSlug}</p>
   </>
  )
}
