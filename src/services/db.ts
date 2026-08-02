import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function getLocalDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('exportready_drafts.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS assessment_drafts (
        id TEXT PRIMARY KEY NOT NULL,
        data TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
  }
  return db;
}

export async function saveLocalDraft(id: string, data: any) {
  const database = await getLocalDatabase();
  const jsonStr = JSON.stringify(data);
  const updatedAt = new Date().toISOString();
  await database.runAsync(
    `INSERT OR REPLACE INTO assessment_drafts (id, data, updated_at) VALUES (?, ?, ?);`,
    [id, jsonStr, updatedAt]
  );
}

export async function getLocalDraft(id: string) {
  const database = await getLocalDatabase();
  const result = await database.getFirstAsync<{ data: string }>(
    `SELECT data FROM assessment_drafts WHERE id = ?;`,
    [id]
  );
  if (result?.data) {
    try {
      return JSON.parse(result.data);
    } catch {
      return null;
    }
  }
  return null;
}
