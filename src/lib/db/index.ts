import { openDB, type IDBPDatabase } from "idb";
import type { GeneratedCode, ScanHistoryItem, DraftItem } from "./schema";

const DB_NAME = "qrigo";
const DB_VERSION = 1;

let dbInstance: IDBPDatabase | null = null;

async function getDB(): Promise<IDBPDatabase> {
  if (dbInstance) return dbInstance;
  
  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("generated_codes")) {
        const store = db.createObjectStore("generated_codes", { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
        store.createIndex("favorite", "favorite");
        store.createIndex("type", "type");
      }
      
      if (!db.objectStoreNames.contains("scan_history")) {
        const store = db.createObjectStore("scan_history", { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
      
      if (!db.objectStoreNames.contains("drafts")) {
        const store = db.createObjectStore("drafts", { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    },
  });
  
  return dbInstance;
}

export async function saveGeneratedCode(code: GeneratedCode): Promise<void> {
  const db = await getDB();
  await db.put("generated_codes", code);
}

export async function getAllGeneratedCodes(): Promise<GeneratedCode[]> {
  const db = await getDB();
  return db.getAll("generated_codes");
}

export async function getGeneratedCodesByType(type: "qr" | "barcode"): Promise<GeneratedCode[]> {
  const db = await getDB();
  const index = db.transaction("generated_codes").store.index("createdAt");
  const all = await index.getAll();
  return all.filter(c => c.type === type).reverse();
}

export async function getFavoriteCodes(): Promise<GeneratedCode[]> {
  const db = await getDB();
  const all = await db.getAll("generated_codes");
  return all.filter(c => c.favorite);
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const db = await getDB();
  const code = await db.get("generated_codes", id);
  if (!code) return false;
  code.favorite = !code.favorite;
  await db.put("generated_codes", code);
  return code.favorite;
}

export async function deleteGeneratedCode(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("generated_codes", id);
}

export async function saveScanItem(item: ScanHistoryItem): Promise<void> {
  const db = await getDB();
  await db.put("scan_history", item);
}

export async function getAllScanHistory(): Promise<ScanHistoryItem[]> {
  const db = await getDB();
  const index = db.transaction("scan_history").store.index("createdAt");
  return index.getAll().then(items => items.reverse());
}

export async function deleteScanItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("scan_history", id);
}

export async function clearScanHistory(): Promise<void> {
  const db = await getDB();
  await db.clear("scan_history");
}

export async function saveDraft(draft: DraftItem): Promise<void> {
  const db = await getDB();
  await db.put("drafts", draft);
}

export async function getAllDrafts(): Promise<DraftItem[]> {
  const db = await getDB();
  const index = db.transaction("drafts").store.index("createdAt");
  return index.getAll().then(items => items.reverse());
}

export async function deleteDraft(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("drafts", id);
}
