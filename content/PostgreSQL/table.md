---
id: table
aliases: []
tags: []
author: Alipnf
created_at: "2026-03-23"
---

# Table

table adalah sebuah objek dalam database yang digunakan untuk menyimpan data dalam bentuk baris dan kolom. Setiap table memiliki nama, kolom, dan tipe data yang berbeda-beda.

## Meliahat Table

cara melihat table yang sudah dibuat adalah dengan perintah

```sql
\dt
```

atau alternatifnya bisa menggunakan perintah

```sql
select table_name from information_schema.tables where table_schema = 'public';
```
