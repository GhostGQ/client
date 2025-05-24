// pages/api/filters/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing filter id' });
  }

  try {
    const result = await pool.query(
      'SELECT id, label_ru, label_uz FROM filter_options WHERE filter_id = $1 ORDER BY id',
      [id]
    );

    const formatted = result.rows.map((row) => ({
      id: row.id,
      label: {
        ru: row.label_ru,
        uz: row.label_uz,
      },
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error('Error loading filters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
