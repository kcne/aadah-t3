'use client';
import { Suspense, useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import { ScrollArea } from '~/app/_components/ui/scroll-area';
import { Button } from '~/app/_components/ui/button';
import toast from 'react-hot-toast';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/app/_components/ui/form';
import { Input } from '~/app/_components/ui/input';
import { ListRestart, Save } from 'lucide-react';
import localFont from 'next/font/local';

interface Props {
  params: {
    id: string;
  };
}

const virgil = localFont({ src: '../../../../../public/fonts/Virgil.woff2' });

const formSchema = z.object({
  title: z.string().min(2, 'Title must have at least 2 characters.').max(50),
});

const defaultValues = {
  title: '',
};

export default function ReflectionJournal({ params }: Props) {
  const [editorContent, setEditorContent] = useState<JSONContent | undefined>(
    undefined,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const createJorunalEntry = api.journal.createNewJournal.useMutation({
    onSuccess: async () => {
      toast.success(`Success`);
    },
    onError: async error => {
      console.log(error);
    },
  });

  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-md max-w-full prose-zinc first:mt-0 last:mb-0 focus:outline-none',
      },
    },
    extensions: [StarterKit, Highlight, Typography],
    content: 'Start here...',
    onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
      console.log(editor.getJSON());
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formatedRequest = {
      title: values.title,
      jsonContent: editorContent as Prisma.JsonObject,
    };

    createJorunalEntry.mutate(formatedRequest);
  }

  function resetAll() {
    form.reset(defaultValues);
    editor?.commands.setContent('Start here...');
  }

  return (
    <div className={`${virgil.className} w-full p-5`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-start gap-2 items-start ml-5 mt-3"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="border-none text-2xl"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" type="submit">
            <Save />
          </Button>
          <Button variant="outline" type="reset" onClick={resetAll}>
            <ListRestart />
          </Button>
        </form>
      </Form>
      {
        <ScrollArea className="h-[85%] rounded-md border border-zinc-200 m-5 p-5">
          <EditorContent editor={editor} />
        </ScrollArea>
      }
    </div>
  );
}
