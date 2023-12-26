'use client';
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import type { Content, JSONContent } from '@tiptap/react';
import { ScrollArea } from '~/app/_components/ui/scroll-area';
import { Input } from '~/app/_components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '~/app/_components/ui/form';
import { Button } from '~/app/_components/ui/button';
import { ListRestart, Save } from 'lucide-react';
import localFont from 'next/font/local';
import toast from 'react-hot-toast';
import { Prisma } from '@prisma/client';

const virgil = localFont({ src: '../../../../../public/fonts/Virgil.woff2' });

interface Props {
  params: {
    id: string;
  };
}

const formSchema = z.object({
  title: z.string().min(2, 'Title must have at least 2 characters.').max(50),
});

export default function ReflectionJournal({ params }: Props) {
  // Journal Static Params
  const entryId = params.id;

  // JournalData
  const { data: journalEntry, error } =
    api.journal.getJournalEntryById.useQuery(entryId);

  // Editor State
  const [editorContent, setEditorContent] = useState<JSONContent | undefined>(
    undefined,
  );

  const updateJournalEntry = api.journal.updateJournalEntry.useMutation({
    onSuccess: async () => {
      toast.success(`Success`);
    },
    onError: async error => {
      console.log(error);
    },
  });

  // Editor Hooks
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-full prose-zinc first:mt-0 last:mb-0 focus:outline-none',
      },
    },
    extensions: [StarterKit, Highlight, Typography],
    content: 'Loading content...',
    onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
    },
  });

  useEffect(() => {
    if (journalEntry?.jsonContent) {
      editor?.commands.setContent(journalEntry?.jsonContent as Content);
    }
  }, [journalEntry]);

  const defaultValues = {
    title: journalEntry?.title ?? '',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: journalEntry?.title ?? '',
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [journalEntry]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const newObject = {
      id: entryId,
      title: values.title,
      jsonContent: editorContent as Prisma.JsonObject,
    };
    updateJournalEntry.mutate(newObject);
  }

  function resetAll() {
    form.reset(defaultValues);
    journalEntry?.jsonContent &&
      editor?.commands.setContent(journalEntry?.jsonContent as Content);
  }

  return (
    journalEntry && (
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
                      placeholder="shadcn"
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
            <Button variant="outline" onClick={resetAll} type="reset">
              <ListRestart />
            </Button>
          </form>
        </Form>

        <ScrollArea
          className={`h-[85%] rounded-md border border-zinc-200 m-5 p-5`}
        >
          <EditorContent editor={editor} />
        </ScrollArea>
      </div>
    )
  );
}
