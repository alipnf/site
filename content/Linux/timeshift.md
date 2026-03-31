---
id: timeshift
aliases: []
tags:
  - timeshift
  - backup
author: Alipnf
created_at: "2026-03-29"
---

# Timeshift

Timeshift adalah tool backup sistem di Linux yang bekerja mirip seperti "System
Restore" di Windows. Ia membuat snapshot dari sistem file kamu, sehingga kamu
bisa rollback jika terjadi kesalahan.

## Install Timeshift

Untuk Arch Linux:

```bash
sudo pacman -S timeshift
```

Untuk Ubuntu/Debian:

```bash
sudo apt install timeshift
```

## Tipe Snapshot

Timeshift mendukung dua tipe backend:

- **RSYNC** — Cocok untuk filesystem ext4, xfs, dll. Menggunakan hardlink.
- **BTRFS** — Cocok untuk filesystem btrfs. Menggunakan fitur subvolume snapshot
  bawaan btrfs.

Cek tipe filesystem kamu:

```bash
df -T /
```

## Konfigurasi Awal

Jalankan Timeshift pertama kali untuk setup:

```bash
sudo timeshift --setup
```

Atau gunakan GUI:

```bash
sudo timeshift-gtk
```

Pilih:

1. Tipe snapshot (RSYNC atau BTRFS)
2. Partisi tujuan penyimpanan snapshot
3. Jadwal otomatis (hourly, daily, weekly, monthly)

## Membuat Snapshot Manual

```bash
sudo timeshift --create --comments "sebelum update sistem"
```

## Melihat Daftar Snapshot

```bash
sudo timeshift --list
```

Contoh output:

```bash
Num     Name                 Tags  Comments
------  -------------------  ----  --------------------------
0       2026-03-29_10-00-00  O     sebelum update sistem
```

## Restore Snapshot

Restore ke snapshot tertentu berdasarkan nama:

```bash
sudo timeshift --restore --snapshot "2026-03-29_10-00-00"
```

Jika ingin restore tanpa konfirmasi interaktif:

```bash
sudo timeshift --restore --snapshot "2026-03-29_10-00-00" --skip-grub
```

**Catatan:** Restore akan me-reboot sistem secara otomatis.

## Menghapus Snapshot

```bash
sudo timeshift --delete --snapshot "2026-03-29_10-00-00"
```
