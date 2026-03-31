---
id: database
aliases: []
tags: []
author: Alipnf
created_at: "2026-03-19"
---

# Database

Database adalah sebuah wadah untuk menyimpan data, dimana data tersebut disimpan dalam bentuk table.

## Membuat Database

sebelum membuat database, pastikan kita sudah masuk ke dalam postgresql dengan perintah `psql -U postgres`, setelah itu kita bisa membuat database dengan perintah

```sql
CREATE DATABASE alipnf_database;
```

## Melihat Database

bisa cek menggunakan perintah `\l` atau `select datname from pg_database;` untuk melihat daftar database yang sudah dibuat.

```fish
postgres=# CREATE DATABASE alipnf_database;
CREATE DATABASE
postgres=# \l
                                                        List of databases
      Name       |  Owner   | Encoding | Locale Provider |   Collate   |    Ctype    | Locale | ICU Rules |   Access privileges
-----------------+----------+----------+-----------------+-------------+-------------+--------+-----------+-----------------------
 alipnf_database | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |        |           |
 postgres        | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |        |           |
 template0       | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |        |           | =c/postgres          +
                 |          |          |                 |             |             |        |           | postgres=CTc/postgres
 template1       | postgres | UTF8     | libc            | en_US.UTF-8 | en_US.UTF-8 |        |           | =c/postgres          +
                 |          |          |                 |             |             |        |           | postgres=CTc/postgres
(4 rows)

postgres=#
```

## Menghapus Database

```sql
DROP DATABASE alipnf_database;
```

## Pindah ke Database

```shell
\c alipnf_database
```

```text
alipnf_database=>
```
