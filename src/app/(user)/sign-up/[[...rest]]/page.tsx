import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="grid place-content-center h-screen">
      <SignUp />;
    </div>
  )
}
