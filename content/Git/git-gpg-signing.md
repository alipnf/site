---
id: git-gpg-signing
aliases: []
tags:
  - git
  - gpg
  - signing
author: Alipnf
created_at: '2025-06-01'
---

# GPG Commit Signing

## Tujuan

- Memastikan bahwa commit benar-benar dibuat oleh kamu (otentikasi identitas).
- Meningkatkan kepercayaan terutama untuk proyek open source.

---

## Konfigurasi Git untuk Commit Signing

Tambahkan konfigurasi berikut pada file `~/.gitconfig`:

```ini
[user]
    signingkey = 14C5DDABE85D6F02    # Ganti dengan ID kunci GPG kamu
[commit]
    gpgSign = true                   # Aktifkan tanda tangan otomatis pada commit
[tag]
    gpgSign = true                   # Aktifkan tanda tangan otomatis pada tag
```

---

## Membuat Kunci GPG Baru

Jalankan perintah berikut untuk membuat kunci GPG:

```bash
gpg --full-generate-key
```

Setelah selesai, lihat daftar kunci privat kamu beserta ID-nya:

```bash
gpg --list-secret-keys --keyid-format LONG
```

---

## Menambahkan Public Key ke GitHub

Agar GitHub dapat memverifikasi tanda tangan commit kamu, tambahkan public key
ke akun GitHub.

1. Ekspor public key dalam format ASCII armor:

```bash
gpg --armor --export <YOUR_KEY_ID>
```

2. Salin output yang muncul, kemudian:

- Buka GitHub > Settings > SSH and GPG keys > New GPG key
- Tempelkan public key tadi dan simpan.

---

## Commit dengan GPG Signing

Setelah konfigurasi, setiap commit yang kamu buat akan otomatis ditandatangani.

Untuk commit manual dengan tanda tangan (jika `gpgSign` tidak aktif):

```bash
git commit -S -m "Pesan commit dengan tanda tangan"
```

---

Jika ingin saya bantu buat catatan tentang verifikasi commit signed, atau
troubleshooting error GPG, silakan bilang saja.
