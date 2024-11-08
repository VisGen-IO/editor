"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Type, Square, Image as ImageIcon, Variable } from "lucide-react";
import { ElementType } from "./types";

const elements: { type: ElementType; icon: React.ComponentType; label: string }[] = [
  { type: "text", icon: Type, label: "Static Text" },
  { type: "dynamic-text", icon: Variable, label: "Dynamic Text" },
  { type: "container", icon: Square, label: "Container" },
  { type: "image", icon: ImageIcon, label: "Image" },
];

export function ElementToolbar() {
  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    e.dataTransfer.setData("elementType", type);
  };

  return (
    <Card className="w-64 h-full p-4 rounded-none border-r">
      <h2 className="font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        {elements.map(({ type, icon: Icon, label }) => (
          <div key={type}>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
            >
{/*               <Icon className="h-4 w-4" /> */}
              {label}
            </Button>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="text-xs text-muted-foreground">
        Drag elements onto the page to create your template
      </div>
    </Card>
  );
}
