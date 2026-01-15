---
id: unable-to-lock-database
aliases:
tags:
  - update
  - upgrade
  - pacman
  - error
  - linux
author: Alipnf
created_at: '2025-04-12'
---

# Gagal update & upgrade pakage

## Error

saat menjalanan perintah `sudo pacman -Syu` muncul error

```shell
❯ sudo pacman -Syu
:: Synchronizing package databases...
error: failed to synchronize all databases (unable to lock database)
```

## Penyebab

Error ini biasanya terjadi karena ada proses pacman lain yang masih berjalan
atau belum selesai, sehingga sistem mengunci database-nya untuk mencegah
konflik. bisa di cek dengan

```shell
ps aux | grep pacman
```

## Solusi

hapus file lock

```shell
sudo rm /var/lib/pacman/db.lck
```

lalu jalankan ulang updatenya

```shell
sudo pacman -Syu
```
