'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleResumeOptimization, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2, Wand2 } from 'lucide-react';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full font-bold border-2 border-primary-foreground">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Optimizing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" /> [ OPTIMIZE RESUME ]
        </>
      )}
    </Button>
  );
}

export default function AiResumeTool() {
  const [state, formAction] = useFormState(handleResumeOptimization, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [optimizedText, setOptimizedText] = useState('');

  useEffect(() => {
    if (state.message === 'Success') {
      toast({
        title: 'Optimization Complete!',
        description: 'Your resume points have been optimized.',
      });
      setOptimizedText(state.optimizedText || '');
      formRef.current?.reset();
    } else if (state.message.startsWith('Error') || state.message.startsWith('AI Error')) {
      toast({
        variant: 'destructive',
        title: 'Optimization Failed',
        description: state.issues ? state.issues.join(', ') : state.message,
      });
    }
  }, [state, toast]);

  const handleCopy = () => {
    if (!optimizedText) return;
    navigator.clipboard.writeText(optimizedText);
    toast({
      title: 'Copied to Clipboard!',
    });
  };

  return (
    <section id="ai-tool" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
            AI RESUME OPTIMIZER
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste a job description and your resume bullet points to get an optimized version.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Provide the necessary details for optimization.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="jobDescription" className="font-bold">
                    Job Description
                  </label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px] border-2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="resumeBulletPoints" className="font-bold">
                    Your Resume Bullet Points (one per line)
                  </label>
                  <Textarea
                    id="resumeBulletPoints"
                    name="resumeBulletPoints"
                    placeholder="- Managed a team of 5 engineers...\n- Increased performance by 20%..."
                    className="min-h-[200px] border-2"
                    required
                  />
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Optimized Output</CardTitle>
                  <CardDescription>Your AI-enhanced resume points.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCopy} disabled={!optimizedText}>
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-background p-4 min-h-[460px] border-2 whitespace-pre-wrap font-code">
                {optimizedText || 'AI output will appear here...'}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
