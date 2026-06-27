"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clearScanHistory, getAllScanHistory, getAllGeneratedCodes } from "@/lib/db/index";
import { Trash2, Info, Download, Shield } from "lucide-react";

export default function SettingsPage() {
  const [stats, setStats] = React.useState({ scans: 0, generated: 0 });

  React.useEffect(() => { loadStats(); }, []);

  const loadStats = async () => {
    const [scans, generated] = await Promise.all([
      getAllScanHistory(),
      getAllGeneratedCodes(),
    ]);
    setStats({ scans: scans.length, generated: generated.length });
  };

  const handleClearAll = async () => {
    await clearScanHistory();
    setStats({ scans: 0, generated: 0 });
  };

  return (
    <>
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-sm text-neutral-500 mt-1">Manage your app preferences</p>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Storage</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm">Scan History</span>
                  <span className="text-sm text-neutral-500">{stats.scans} items</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-neutral-100">
                  <span className="text-sm">Generated Codes</span>
                  <span className="text-sm text-neutral-500">{stats.generated} items</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleClearAll} className="gap-1.5 text-red-500 mt-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All Data
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">About</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Info className="w-4 h-4 text-neutral-400" />
                  <span>Version 1.0.0</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-neutral-400" />
                  <span>All data stored locally in your browser</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Download className="w-4 h-4 text-neutral-400" />
                  <span>Powered by Next.js, IndexedDB, ZXing</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
