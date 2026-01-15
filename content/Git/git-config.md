---
id: git-config
aliases: []
tags:
  - git
  - config
author: Alipnf
created_at: '2025-06-01'
---

# Git Configuration (`git config`)

## File Konfigurasi

Git menyimpan konfigurasi dalam beberapa level:

- **System**: `/etc/gitconfig` (berlaku untuk semua user di komputer)
- **Global/User**: `~/.gitconfig` atau `~/.config/git/config` (berlaku untuk
  user saat ini)
- **Local**: `.git/config` di folder repo tertentu (hanya untuk repo itu)

---

## Contoh Konfigurasi

```ini
[core]
	editor = nvim             # Editor default untuk commit message dan merge
[user]
	email = alipnf@proton.me  # Email yang digunakan pada commit
	name = alipnf             # Nama user untuk commit
	signingkey = 14C5DDABE85D6F02  # ID GPG key untuk commit signing
[commit]
	gpgSign = true            # Otomatis tanda tangan commit dengan GPG
[tag]
	gpgSign = true            # Otomatis tanda tangan tag dengan GPG
[credential]
	helper = /usr/lib/git-core/git-credential-libsecret  # Helper credential manager (misal untuk password)
[pull]
	rebase = true             # Default pull menggunakan rebase, bukan merge
[rebase]
	autoStash = true          # Saat rebase, simpan sementara perubahan yang belum commit
```

---

## Penjelasan Konfigurasi Penting

- `core.editor`: Editor yang terbuka saat membuat pesan commit atau konflik
  merge. Saya pakai `nvim`.
- `user.name` dan `user.email`: Identitas kamu yang akan tercatat di setiap
  commit.
- `user.signingkey`: Kunci GPG yang digunakan untuk menandatangani commit.
- `commit.gpgSign` dan `tag.gpgSign`: Otomatis aktifkan tanda tangan digital
  pada commit dan tag.
- `credential.helper`: Mengelola penyimpanan credential agar tidak perlu input
  password terus.
- `pull.rebase`: Saat `git pull`, gunakan rebase supaya riwayat lebih bersih.
- `rebase.autoStash`: Saat rebase ada perubahan belum commit, simpan otomatis
  dulu supaya proses rebase lancar.

---

## Cara Melihat Konfigurasi Saat Ini

```bash
git config --list
```

atau spesifik untuk global:

```bash
git config --global --list
```
