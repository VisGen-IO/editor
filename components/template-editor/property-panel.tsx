"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, X } from "lucide-react";
import { Element } from "./types";

interface PropertyPanelProps {
  element: Element | null;
  onUpdate: (element: Element) => void;
  onDelete: (id: string) => void;
}

export function PropertyPanel({ element, onUpdate, onDelete }: PropertyPanelProps) {
  if (!element) {
    return (
      <Card className="w-80 h-full p-4 rounded-none border-l">
        <div className="text-muted-foreground text-center mt-8">
          Select an element to edit its properties
        </div>
      </Card>
    );
  }

  const updateStyle = (property: string, value: string) => {
    onUpdate({
      ...element,
      styles: {
        ...element.styles,
        [property]: value,
      },
    });
  };

  const addCondition = () => {
    onUpdate({
      ...element,
      conditions: [
        ...element.conditions,
        { id: Math.random().toString(), type: "show", expression: "" },
      ],
    });
  };

  const updateCondition = (id: string, type: "show" | "hide", expression: string) => {
    onUpdate({
      ...element,
      conditions: element.conditions.map((condition) =>
        condition.id === id ? { ...condition, type, expression } : condition
      ),
    });
  };

  const removeCondition = (id: string) => {
    onUpdate({
      ...element,
      conditions: element.conditions.filter((condition) => condition.id !== id),
    });
  };

  return (
    <Card className="w-80 h-full p-4 rounded-none border-l overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Properties</h2>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(element.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {element.type === "dynamic-text" && (
          <div>
            <Label>Variable Key</Label>
            <Input
              value={element.dynamicKey || ""}
              onChange={(e) => onUpdate({ ...element, dynamicKey: e.target.value })}
              placeholder="Enter variable name"
            />
          </div>
        )}

        <div>
          <Label>Font Size</Label>
          <Input
            type="text"
            value={element.styles.fontSize}
            onChange={(e) => updateStyle("fontSize", e.target.value)}
          />
        </div>

        <div>
          <Label>Font Weight</Label>
          <Input
            type="text"
            value={element.styles.fontWeight}
            onChange={(e) => updateStyle("fontWeight", e.target.value)}
          />
        </div>

        <div>
          <Label>Background Color</Label>
          <Input
            type="color"
            value={element.styles.backgroundColor}
            onChange={(e) => updateStyle("backgroundColor", e.target.value)}
          />
        </div>

        <div>
          <Label>Text Color</Label>
          <Input
            type="color"
            value={element.styles.color}
            onChange={(e) => updateStyle("color", e.target.value)}
          />
        </div>

        <div>
          <Label>Border Radius</Label>
          <Input
            type="text"
            value={element.styles.borderRadius}
            onChange={(e) => updateStyle("borderRadius", e.target.value)}
          />
        </div>

        <div>
          <Label>Padding</Label>
          <Input
            type="text"
            value={element.styles.padding}
            onChange={(e) => updateStyle("padding", e.target.value)}
          />
        </div>

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label>Conditions</Label>
            <Button size="sm" variant="outline" onClick={addCondition}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {element.conditions.map((condition) => (
              <div key={condition.id} className="flex gap-2">
                <select
                  className="border rounded px-2"
                  value={condition.type}
                  onChange={(e) =>
                    updateCondition(
                      condition.id,
                      e.target.value as "show" | "hide",
                      condition.expression
                    )
                  }
                >
                  <option value="show">Show if</option>
                  <option value="hide">Hide if</option>
                </select>
                <Input
                  value={condition.expression}
                  onChange={(e) =>
                    updateCondition(condition.id, condition.type, e.target.value)
                  }
                  placeholder="condition"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeCondition(condition.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <Label>Position X</Label>
          <Input
            type="number"
            value={element.position.x}
            onChange={(e) =>
              onUpdate({
                ...element,
                position: { ...element.position, x: Number(e.target.value) },
              })
            }
          />
        </div>

        <div>
          <Label>Position Y</Label>
          <Input
            type="number"
            value={element.position.y}
            onChange={(e) =>
              onUpdate({
                ...element,
                position: { ...element.position, y: Number(e.target.value) },
              })
            }
          />
        </div>

        <div>
          <Label>Width</Label>
          <Input
            type="number"
            value={element.size.width}
            onChange={(e) =>
              onUpdate({
                ...element,
                size: { ...element.size, width: Number(e.target.value) },
              })
            }
          />
        </div>

        <div>
          <Label>Height</Label>
          <Input
            type="number"
            value={element.size.height}
            onChange={(e) =>
              onUpdate({
                ...element,
                size: { ...element.size, height: Number(e.target.value) },
              })
            }
          />
        </div>
      </div>
    </Card>
  );
}