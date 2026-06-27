"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFavoriteCodes, toggleFavorite, deleteGeneratedCode } from "@/lib/db/index";
import type { GeneratedCode } from "@/lib/db/schema";
import { Heart, Copy, Trash2, QrCode, Barcode, Sparkles } from "lucide-react";

export default function FavoritesPage() {
  const [items, setItems] = React.useState<GeneratedCode[]>([]);

  React.useEffect(() => { loadFavorites(); }, []);

  const loadFavorites = async () => {
    const codes = await getFavoriteCodes();
    codes.sort((a, b) => b.createdAt - a.createdAt);
    setItems(codes);
  };

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

  const handleUnfavorite = async (id: string) => {
    await toggleFavorite(id);
    loadFavorites();
  };

  const handleDelete = async (id: string) => {
    await deleteGeneratedCode(id);
    loadFavorites();
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
            <p className="text-sm text-neutral-500 mt-1">Your favorite generated codes</p>
          </div>

          {items.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-neutral-400" />
              </div>
              <p className="text-neutral-500 text-sm">No favorites yet</p>
              <p className="text-neutral-400 text-xs mt-1">Save your favorite codes by clicking the heart icon</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <Card key={item.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600">
                    {item.type === "qr" ? <QrCode className="w-4 h-4" /> : <Barcode className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.displayText || item.data}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{item.type} ({item.format})</span>
                      <span className="text-[10px] text-neutral-400">{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => handleCopy(item.data)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-red-400" onClick={() => handleUnfavorite(item.id)}>
                      <Heart className="w-3.5 h-3.5" fill="currentColor" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-red-400" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
