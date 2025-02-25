import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Loader2 } from "lucide-react";

interface LoadingDialogProps {
  open: boolean;
  onCancel: () => void;
}

const LoadingDialog = ({ open, onCancel }: LoadingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <VisuallyHidden>
          <DialogTitle>タイトル</DialogTitle>
        </VisuallyHidden>
        <div className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-lg font-semibold">企業データを確認中...</p>
          <p className="text-sm text-muted-foreground">
            しばらくお待ちください
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
