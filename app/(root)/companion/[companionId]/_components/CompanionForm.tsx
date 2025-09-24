"use client";

import { Category, Companion } from '@prisma/client';
import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import ImageUpload from '@/components/ImageUpload';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric
vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next
logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies.
Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the
way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're
excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential
to revolutionize how we interface with technology and even heal neurological conditions.`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const CompanionForm: React.FC<CompanionFormProps> = ({ initialData, categories }) => {
    const router = useRouter();

    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        categoryId: z.string().min(1, { message: "Category is required" }),
        src: z.string().min(1, { message: "Image is required" }),
        instructions: z.string().min(100, { message: "Instructions are required" }),
        seed: z.string().min(1, { message: "Seed is required" }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || '',
            description: initialData?.description || '',
            categoryId: initialData?.categoryId  || '',
            src: initialData?.src || '',
            instructions: initialData?.instructions || '',
            seed: initialData?.seed || '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                await axios.patch(`/api/companion/${initialData.id}`, values);
                toast.success("Companion Updated Successfully");
            } else {
                await axios.post(`/api/companion`, values);
                toast.success("Companion Created Successfully");
            }
            router.refresh();
        } catch (error) {
            console.error("Something went wrong", error);
            toast.error("Something went wrong");
        }
    };

    const isLoading = form.formState.isSubmitting;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Header */}
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <h3 className="text-lg font-medium">General information</h3>
                        <p className="text-sm text-muted-foreground">
                            General information about your companion
                        </p>
                        <Separator />
                    </div>

                    {/* Image Upload */}
                    <FormItem className="w-full">
                        <FormLabel>Image</FormLabel>
                        <Controller
                            name="src"
                            control={form.control}
                            render={({ field }) => (
                                <ImageUpload
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isLoading}
                                />
                            )}
                        />
                    </FormItem>

                    {/* Name */}
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder='eg: Elon Musk' {...field} />
                            </FormControl>
                            <FormDescription>
                                This is how your AI companion will be named.
                            </FormDescription>
                        </FormItem>
                    )} />

                    {/* Description */}
                    <FormField control={form.control} name="description" render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder='eg: CEO and Founder of Tesla, SpaceX...' {...field} />
                            </FormControl>
                            <FormDescription>
                                Short description for your AI companion.
                            </FormDescription>
                        </FormItem>
                    )} />

                    {/* Category */}
                    <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Controller
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <Select disabled={isLoading} onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='bg-background w-full'>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormDescription>Select a category for your AI.</FormDescription>
                    </FormItem>

                    {/* Configuration header */}
                    <div className="col-span-1 md:col-span-2 pt-6">
                        <h3 className="text-lg font-medium">Configuration</h3>
                        <p className="text-sm text-muted-foreground pb-2">
                            Detailed instructions for AI behaviour
                        </p>
                        <Separator className='my-2'/>
                        <div className='grid md:grid-cols-2 gap-4 pt-5'>
                            {/* Instructions */}
                            <FormField control={form.control} name="instructions" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className='bg-background resize-none h-64'
                                            rows={10}
                                            disabled={isLoading}
                                            placeholder={PREAMBLE}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Describe in detail your companion&apos;s backstory and details...
                                    </FormDescription>
                                </FormItem>
                            )} />

                            {/* Seed */}
                            <FormField control={form.control} name="seed" render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Example Conversation</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className='bg-background resize-none h-64'
                                            rows={10}
                                            disabled={isLoading}
                                            placeholder={SEED_CHAT}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Example conversation between you and your companion...
                                    </FormDescription>
                                </FormItem>
                            )} />
                        </div>

                        {/* Submit */}
                        <div className='py-8 flex justify-center items-center'>
                            <Button type='submit'>
                                { initialData ? "Edit companion" : (
                                    <>
                                        Create companion
                                        <Wand2 className='w-4 h-4'/>
                                    </>
                                ) }
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CompanionForm;
