---
id: git-pull-conflict
aliases: []
tags:
  - error
  - git
author: Alipnf
created_at: '2025-03-30'
---

# Git Pull Divergent Branches Issue

## Error

Saat menjalankan `git pull`, muncul pesan berikut:

```sh
- [ ] hint: You have divergent branches and need to specify how to reconcile them.
hint: You can do so by running one of the following commands sometime before
hint: your next pull:
hint:
hint:   git config pull.rebase false  # merge
hint:   git config pull.rebase true   # rebase
hint:   git config pull.ff only       # fast-forward only
```

## Penyebab

Branch lokal dan remote memiliki perubahan yang tidak sinkron, sehingga Git
tidak bisa langsung melakukan merge otomatis.

## Solusi

Pilih salah satu strategi berikut sesuai kebutuhan:

### 1️⃣ Merge (default behavior)

Jika ingin Git menggabungkan perubahan secara otomatis tanpa rebase:

```sh
git config pull.rebase false
git pull
```

Atau langsung:

```sh
git pull --no-rebase
```

### 2️⃣ Rebase (buat history lebih clean)

Jika ingin commit lokal di-reapply di atas perubahan terbaru dari remote:

```sh
git config pull.rebase true
git pull
```

Atau langsung:

```sh
git pull --rebase
```

### 3️⃣ Fast-forward only (tanpa merge commit)

Jika hanya ingin update branch lokal kalau bisa fast-forward:

```sh
git config pull.ff only
git pull
```

Atau langsung:

```sh
git pull --ff-only
```

## Tips Tambahan

Sebelum melakukan pull, cek status branch:

```sh
git status
git log --oneline --graph --decorate --all
```

Jika ada perubahan lokal yang belum di-push, bisa disimpan dulu dengan stash:

```sh
git stash
git pull --rebase
git stash pop  # Balikin perubahan yang tadi di-stash
```

## source

[stakoverflow git pull](https://stackoverflow.com/questions/71768999/how-to-merge-when-you-get-error-hint-you-have-divergent-branches-and-need-to-s)
