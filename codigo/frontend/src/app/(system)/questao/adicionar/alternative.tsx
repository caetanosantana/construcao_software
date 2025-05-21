"use client";

import { PromiseContainer } from "@/components/promise-container";
import { Button } from "@/components/ui/button";
import { ButtonFile } from "@/components/ui/button-file";
import { ImagePreview } from "@/components/ui/image-preview";
import { Label } from "@/components/ui/label";
import { cn, fileReadAsync } from "@/lib/utils";
import { ImageIcon, Trash2 } from "lucide-react";

export function AlternativeImage({
  image,
  onAdd,
  onRemove,
}: {
  image?: File | null;
  onAdd: (files: File[]) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-bold text-sm">Imagem</Label>

      {image && (
        <PromiseContainer
          errorFallback={
            <div className="flex w-4/5 h-full justify-center text-sm text-muted-foreground">
              Erro ao carregar imagem
            </div>
          }
        >
          <div
            className={cn(
              "w-full relative h-auto bg-secondary p-4 rounded-md",
              !image && "hidden"
            )}
          >
            <ImagePreview imageReader={fileReadAsync(image)} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4"
              type="button"
              onClick={onRemove}
            >
              <Trash2 />
            </Button>
          </div>
        </PromiseContainer>
      )}

      <ButtonFile
        onChange={onAdd}
        className={cn("w-fit", image && "hidden")}
        accept="image/*"
      >
        <ImageIcon />
        Adicionar Imagem
      </ButtonFile>
    </div>
  );
}
