'use client'
import { useEffect, useState } from 'react'
import { api } from '~/trpc/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import {  EditorContent, useEditor } from '@tiptap/react'
import type {Content, JSONContent} from '@tiptap/react'
import { ScrollArea } from '~/app/_components/ui/scroll-area';
import { Separator } from '~/app/_components/ui/separator';




interface Props {
    params:{
        id:string
    };
}

export default function ReflectionJournal({params}: Props) {
  
  const entryId = params.id;

  const {data:journalEntry, error} = api.journal.getJournalEntryById.useQuery(entryId);


  //   const updateJournalEntry = api.journal.updateJournalEntry.useMutation({
  //   onSuccess: async () => {
  //     toast.success(`Success`);
  //   },
  //   onError: async (error) => {
  //     console.log(error);
  //   }
  // });

  const [editorContent, setEditorContent] = useState<JSONContent | undefined>(undefined);
  

  useEffect(() => {

  console.log(journalEntry?.jsonContent,'jsonContent');
  if(journalEntry?.jsonContent){
    editor?.commands.setContent(journalEntry?.jsonContent as Content);
  }
  // journalEntry?.jsonContent?setEditorContent(journalEntry?.jsonContent)
}, [journalEntry])




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
    content: 'asdasdsadasdas',
      onUpdate({ editor }) {
      setEditorContent(editor.getJSON());
      console.log(editor.getJSON());
    },
  })


// function saveEditorState(){
//   const newObject = {
//     ...journalEntry,
//     JSONContent: editorContent,
//   }
//   updateJournalEntry.mutate(newObject);
// }


  return (
    <div className='w-full p-5'>
        {
          journalEntry?.title && 
          <div>
          <h3 className='text-3xl ml-5'>{journalEntry?.title}</h3>
          <Separator className='my-1.5 ml-5'/>
          </div>
          
        }
        {
            <ScrollArea className="h-[85%] rounded-md border border-zinc-200 m-5 p-5">
              <EditorContent editor={editor} />    
          </ScrollArea>
        }
        
    </div>
  )
} 