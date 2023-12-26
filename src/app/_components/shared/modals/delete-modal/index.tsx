import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/app/_components/ui/alert-dialog";
import { Button } from "~/app/_components/ui/button";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  deleteAction: (...args: never[]) => void;
  title: string;
  description: string;
  cancelButtonText?: string;
  continueButtonText?: string;
}

function DeleteModal({
  open,
  setOpen,
  title,
  description,
  cancelButtonText = "Cancel",
  continueButtonText = "Continue",
  deleteAction,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <Button variant="destructive" onClick={deleteAction}>
            {continueButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteModal;
