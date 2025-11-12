'use client';

import outputs from '@/amplify_outputs.json';
import { Amplify } from 'aws-amplify';

Amplify.configure(outputs, {
    ssr: true // required when using Amplify with Next.js
});

export default function RootLayoutThatConfiguresAmplifyOnTheClient({
    children
}: {
    children: React.ReactNode;
}) {
    return children;
}