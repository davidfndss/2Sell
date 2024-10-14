"use client"

import TwoSellHeader from '@/components/Header/2SellHeader';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';
import { getCookie } from 'typescript-cookie';

const Dashboard = () => {
  const [ user, setUser ] = useState()

  const findUserById = async () => {
    const atk = getCookie("atk")

    if (!atk) throw new Error("Invalid token")
    console.log(atk)

    const decoded = jwt.decode(atk)
    const ownerId = decoded.id
    console.log(ownerId)

    try {
      const foundUser = await fetch(`/api/owners/${ownerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', atk }
      }).then(res => res.json())
      setUser(foundUser)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    findUserById()
  }, [])

  return (
    <>
      <TwoSellHeader /> 
      <header className="w-[80vw] m-auto mt-[30vh] border border-red-400 max-w-[1000px]">
        dashboard de {user.name}
      </header>
    </>
  );
};

export default Dashboard;