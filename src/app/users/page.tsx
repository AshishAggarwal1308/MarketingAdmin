"use client"
import React from 'react'
import StickyUserTable from './Component/UserTable'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router=useRouter()
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status != 'authenticated') {
    router.push("/api/auth/signin"); // Corrected typo
  }

  return (
    <div>
      <StickyUserTable />
      <ToastContainer />
    </div>
  )
}

export default page