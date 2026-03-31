---
id: postgresql-setup
aliases: []
tags:
  - database
  - postgresql
  - setup
author: Alipnf
created_at: "2026-03-19"
---

created_at: "2026-03-19"

# PostgreSQL Setup

## Install PostgreSQL

```bash
sudo pacman -S postgresql
```

## Inisialisasi Database

```bash
sudo -iu postgres initdb -D /var/lib/postgres/data
```

Wajib dilakukan setelah install. Tanpa ini PostgreSQL tidak bisa dijalankan.

## Menjalankan Service

Start service:

```bash
sudo systemctl start postgresql
```

Enable auto start: (gunakan ini jika ingin PostgreSQL otomatis berjalan saat boot)

```bash
sudo systemctl enable postgresql
```

Cek status:

```bash
systemctl status postgresql
```

## Masuk ke PostgreSQL (psql)

```bash
sudo -iu postgres psql
```
