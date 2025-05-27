'use client'

import { useEffect, useState } from 'react';
import styles from './ProductFilters.module.css';

interface FilterOption {
  id: number;
  label: string;
}

const FILTER_KEYS = ['category', 'width', 'density', 'dyeing', 'composition'];

export default function ProductFilters({ onChange }: { onChange: (filters: Record<string, number[]>) => void }) {
  const [filtersData, setFiltersData] = useState<Record<string, FilterOption[]>>({});
  const [selected, setSelected] = useState<Record<string, number[]>>({});

  useEffect(() => {
    const fetchAllFilters = async () => {
      const result: Record<string, FilterOption[]> = {};

      for (const key of FILTER_KEYS) {
        const res = await fetch(`/api/filters/${key}`);
        const json = await res.json();
        result[key] = Array.isArray(json)
          ? json.map((item: any) => ({
              id: item.id,
              label: item.label?.ru || item.label || item.value || `Option ${item.id}`,
            }))
          : [];
      }

      setFiltersData(result);
    };

    fetchAllFilters();
  }, []);

  const toggle = (filterKey: string, id: number) => {
    const set = new Set(selected[filterKey] || []);
    set.has(id) ? set.delete(id) : set.add(id);
    const updated = { ...selected, [filterKey]: Array.from(set) };
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div className={styles.multiFilterPanel}>
      {FILTER_KEYS.map((key) => (
        <div className={styles.filterGroup} key={key}>
          <div className={styles.filterHeader}>{key}</div>
          <div className={styles.checkboxList}>
            {(filtersData[key] || []).map((opt) => (
              <label key={opt.id} className={styles.checkboxItem}>
                <input
                  type="checkbox"
                  checked={selected[key]?.includes(opt.id) || false}
                  onChange={() => toggle(key, opt.id)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
