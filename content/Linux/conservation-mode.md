---
id: conservation-mode
aliases: []
tags:
  - linux
  - conservation
  - lenovo
author: Alipnf
created_at: '2025-04-15'
---

# 🛡️ Conservation Mode (Lenovo)

Mode ini membatasi charging sampai 60%, untuk rawat umur baterai di laptop
Lenovo. Cocok kalau laptop sering nyolok ke charger terus.

untuk cek

```bash
cat /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode
```

jika 1 maka aktif jika 0 maka nonaktif

---

## Aktifkan Conservation Mode (charge max 60%)

```bash
echo 1 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode
```

## Matika Conservation Mode (charge max 100%)

```bash
echo 0 | sudo tee /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode
```
