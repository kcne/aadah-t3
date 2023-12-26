'use client'
import { Suspense, useEffect, useState } from 'react'
import { api } from '~/trpc/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import { ScrollArea } from '~/app/_components/ui/scroll-area';
import { Separator } from '~/app/_components/ui/separator';
import { Button } from '~/app/_components/ui/button';
import toast from 'react-hot-toast';
import { Prisma } from '@prisma/client';




interface Props {
    params:{
        id:string
    };
}


// const markdown = `
// # Hello world!
// Check the EditorComponent.tsx file for the code .
// `
export default function ReflectionJournal({params}: Props) {
  
  // const entryId = params.id;

//   const {data:journalEntry, error} = api.journal.getJournalEntryById.useQuery(entryId);

    const createJorunalEntry = api.journal.createNewJournal.useMutation({
    onSuccess: async () => {
      toast.success(`Success`);
    },
    onError: async (error) => {
      console.log(error);
    }
  });


  const [editorContent, setEditorContent] = useState<JSONContent | undefined>(undefined);
 
  

  const editor = useEditor({
    editorProps:{
      attributes:{
        class:'prose prose-md max-w-full prose-zinc first:mt-0 last:mb-0 focus:outline-none'
      }
    },
    extensions: [
      StarterKit,
      Highlight,
      Typography,
    ],
    content: '# New Journal',
      onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
      console.log(editor.getJSON());
    },
  })


function saveEditorState(){
    console.log('type',typeof editorContent)
  const newObject = {
    title:'Untitled',
    jsonContent: editorContent as Prisma.JsonObject,
  }

  console.log(newObject,'format');
  createJorunalEntry.mutate(newObject);
}


  return (
    <div className='w-full p-5'>
      <Button onClick={saveEditorState}>
        Save
      </Button>
        {
            <ScrollArea className="h-[85%] rounded-md border border-zinc-200 m-5 p-5">
              <EditorContent editor={editor} />    
          </ScrollArea>
        }
        
    </div>
  )
} 