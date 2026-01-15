---
id: power-profile
aliases: []
tags:
  - linux
  - power profile
author: Alipnf
created_at: '2025-05-17'
---

# Power Profile

Untuk mengatur mode power profile di Linux (kayak di Windows: Power Saver,
Balanced, Performance), kamu bisa menggunakan tool `powerprofilesctl`.

## Install `power-profiles-daemon`

Jika belum terinstall, jalankan:

```bash
sudo pacman -S power-profiles-daemon
```

## Aktifkan servicenya

Setelah itu, enable dan jalankan daemon-nya:

```bash
sudo systemctl enable --now power-profiles-daemon.service
```

## Cek profil yang tersedia

Gunakan perintah berikut untuk melihat daftar power profile:

```bash
powerprofilesctl list
```

Contoh output:

```bash
* balanced
  power-saver
  performance
```

Tanda `*` menunjukkan profil yang sedang aktif.

## Ganti power profile

Misalnya ingin menggunakan mode hemat daya:

```bash
powerprofilesctl set power-saver
```

Atau untuk performa maksimal:

```bash
powerprofilesctl set performance
```

Untuk mode seimbang:

```bash
powerprofilesctl set balanced
```
