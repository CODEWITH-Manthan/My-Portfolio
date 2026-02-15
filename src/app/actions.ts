'use server';

import { z } from 'zod';
import { optimizeResumeForJob } from '@/ai/flows/optimize-resume-for-job';

const schema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters.'),
  resumeBulletPoints: z.string().min(20, 'Resume bullet points must be at least 20 characters.'),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  optimizedText?: string;
};

export async function handleResumeOptimization(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    jobDescription: formData.get('jobDescription'),
    resumeBulletPoints: formData.get('resumeBulletPoints'),
  });

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();
    return {
      message: 'Error: Invalid input.',
      fields: {
        jobDescription: formData.get('jobDescription')?.toString() ?? '',
        resumeBulletPoints: formData.get('resumeBulletPoints')?.toString() ?? '',
      },
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }
  
  const bulletPointsArray = validatedFields.data.resumeBulletPoints.split('\n').filter(line => line.trim() !== '');

  if (bulletPointsArray.length === 0) {
    return {
      message: 'Error: Invalid input.',
      issues: ['Please provide at least one bullet point.'],
    };
  }

  try {
    const result = await optimizeResumeForJob({
      jobDescription: validatedFields.data.jobDescription,
      resumeBulletPoints: bulletPointsArray,
    });
    
    if (!result.optimizedBulletPoints || result.optimizedBulletPoints.length === 0) {
        return {
            message: 'AI Error: The AI could not generate optimizations. The job description might be too vague or the bullet points irrelevant.',
        };
    }

    return {
      message: 'Success',
      optimizedText: result.optimizedBulletPoints.join('\n'),
    };
  } catch (error) {
    console.error('AI optimization failed:', error);
    return {
      message: 'AI Error: An unexpected error occurred while optimizing the resume. Please try again later.',
    };
  }
}
