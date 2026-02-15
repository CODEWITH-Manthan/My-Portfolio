'use server';
/**
 * @fileOverview An AI agent that optimizes resume bullet points based on a job description.
 *
 * - optimizeResumeForJob - A function that handles the resume optimization process.
 * - OptimizeResumeForJobInput - The input type for the optimizeResumeForJob function.
 * - OptimizeResumeForJobOutput - The return type for the optimizeResumeForJob function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeForJobInputSchema = z.object({
  jobDescription: z.string().describe('The job description to optimize the resume for.'),
  resumeBulletPoints: z
    .array(z.string())
    .describe('A list of existing resume bullet points to be optimized.'),
});
export type OptimizeResumeForJobInput = z.infer<typeof OptimizeResumeForJobInputSchema>;

const OptimizeResumeForJobOutputSchema = z.object({
  optimizedBulletPoints: z
    .array(z.string())
    .describe('A list of optimized resume bullet points, rewritten to match the job description.'),
});
export type OptimizeResumeForJobOutput = z.infer<typeof OptimizeResumeForJobOutputSchema>;

export async function optimizeResumeForJob(
  input: OptimizeResumeForJobInput
): Promise<OptimizeResumeForJobOutput> {
  return optimizeResumeForJobFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumeForJobPrompt',
  input: {schema: OptimizeResumeForJobInputSchema},
  output: {schema: OptimizeResumeForJobOutputSchema},
  prompt: `You are an expert career coach and resume optimizer. Your task is to rewrite and optimize a given set of resume bullet points to best match a specific job description. The goal is to highlight the most relevant skills and experiences, de-emphasize less relevant ones, and discard any truly irrelevant points to make the applicant's resume highly tailored.

Follow these steps:
1. Carefully read and analyze the 'Job Description' to identify key requirements, skills, and responsibilities.
2. Review each 'Existing Resume Bullet Point'.
3. For each bullet point, determine if it is relevant, can be made more relevant, or is irrelevant to the job description.
4. Rewrite relevant bullet points to use keywords and phrasing from the 'Job Description', emphasizing impact and achievements where possible.
5. If a bullet point is less relevant but still valuable, rephrase it to align more closely with the job's general requirements.
6. Discard any bullet points that are completely irrelevant and would not add value to the application.
7. Provide only the optimized list of bullet points in JSON format as an array of strings.

Job Description:
{{{jobDescription}}}

Existing Resume Bullet Points:
{{#each resumeBulletPoints}}- {{{this}}}
{{/each}}

Optimized Resume Bullet Points:`,
});

const optimizeResumeForJobFlow = ai.defineFlow(
  {
    name: 'optimizeResumeForJobFlow',
    inputSchema: OptimizeResumeForJobInputSchema,
    outputSchema: OptimizeResumeForJobOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
