'use client';
import { useState, useEffect } from 'react';
import { Progress } from './progress';

export default function Loader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const progressTimer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(progressTimer);
                        return 100;
                    }
                    const increment = prev > 80 ? Math.random() * 2 : Math.random() * 10;
                    return Math.min(prev + increment, 100);
                });
            }, 100);
            return () => clearInterval(progressTimer);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div className="text-center w-full max-w-xs sm:max-w-sm px-4">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase font-headline">
                    SYSTEM_BOOT
                    <span className="inline-block animate-blink text-primary">_</span>
                </h1>
                <p className="mt-4 text-muted-foreground">[ LOADING INTERFACE... ]</p>
                <div className="mt-6 w-full border-2 border-primary p-1">
                  <Progress value={progress} className="h-4 bg-transparent border-0 rounded-none" />
                </div>
                <div className="mt-2 flex justify-between text-xs font-mono text-primary">
                    <span>{Math.round(progress)}%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}
