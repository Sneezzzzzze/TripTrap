"use client"

import SplashScreen from '../components/SplashScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import React, { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleSplashFinish = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && <SplashScreen onFinish={handleSplashFinish} />}
      {!loading && <WelcomeScreen/>}
    </>
  );
}
