"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAllScanHistory, deleteScanItem, clearScanHistory, getAllGeneratedCodes, deleteGeneratedCode } from "@/lib/db/index";
import type { ScanHistoryItem, GeneratedCode } from "@/lib/db/schema";
import { Trash2, Copy, Scan, QrCode, Barcode, Clock } from "lucide-react";

type HistoryItem = (ScanHistoryItem & { _type: "scan" }) | (GeneratedCode & { _type: "generated" });

export default function HistoryPage() {
  const [items, setItems] = React.useState<HistoryItem[]>([]);
  const [filter, setFilter] = React.useState<"all" | "scan" | "generated">("all");

  React.useEffect(() => { loadHistory(); }, []);

  const loadHistory = async () => {
    const [scans, generated] = await Promise.all([
      getAllScanHistory(),
      getAllGeneratedCodes(),
    ]);
    const all: HistoryItem[] = [
      ...scans.map(s => ({ ...s, _type: "scan" as const })),
      ...generated.map(g => ({ ...g, _type: "generated" as const })),
    ];
    all.sort((a, b) => b.createdAt - a.createdAt);
    setItems(all);
  };

  const filtered = filter === "all" ? items : items.filter(i => i._type === filter);

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

  const handleDelete = async (id: string, type: string) => {
    if (type === "scan") await deleteScanItem(id);
    else await deleteGeneratedCode(id);
    loadHistory();
  };

  const handleClearAll = async () => {
    const generated = items.filter(i => i._type === "generated");
    await clearScanHistory();
    await Promise.all(generated.map(i => deleteGeneratedCode(i.id)));
    loadHistory();
  };

  const getIcon = (item: HistoryItem) => {
    if (item._type === "scan") return <Scan className="w-4 h-4" />;
    return item.type === "qr" ? <QrCode className="w-4 h-4" /> : <Barcode className="w-4 h-4" />;
  };

  const getLabel = (item: HistoryItem) => {
    if (item._type === "scan") return `Scanned ${item.format || item.type}`;
    return `Generated ${item.type === "qr" ? "QR" : "Barcode"} (${item.format})`;
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">History</h1>
              <p className="text-sm text-neutral-500 mt-1">All your scans and generated codes</p>
            </div>
            {items.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleClearAll} className="gap-1.5 text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </Button>
            )}
          </div>

          <div className="flex gap-2 mb-6">
            {(["all", "scan", "generated"] as const).map(f => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-neutral-400" />
              </div>
              <p className="text-neutral-500 text-sm">No history yet</p>
              <p className="text-neutral-400 text-xs mt-1">Scanned codes and generated codes will appear here</p>
            </Card>
          ) : (
            <div className="space-y-2">
              {filtered.map((item) => (
                <Card key={item.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-600">
                    {getIcon(item)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item._type === "scan" ? item.rawText : item.data}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">{getLabel(item)}</span>
                      <span className="text-[10px] text-neutral-400">{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => handleCopy(item._type === "scan" ? item.rawText : item.data)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-red-400" onClick={() => handleDelete(item.id, item._type)}>
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
