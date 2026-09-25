---
title: Generate an SSH key
description: Generate an SSH key and copy its public key on macOS.
---

## Generate the key

```sh
ssh-keygen -t ed25519 -C "you@example.com"
```

On your Mac, replace the email with yours (it's just a label for the key). At the file prompt, press Enter for the default (`~/.ssh/id_ed25519`) or choose a different filename. **Don't overwrite an existing key.** Set a passphrase when prompted.

This creates a **private key** (`id_ed25519`) and a **public key** (`id_ed25519.pub`). If you chose a different filename, use that path in the commands below.

## Copy the public key

Copy it to your Mac's clipboard:

```sh
pbcopy < ~/.ssh/id_ed25519.pub
```

Paste the public key into the service you're setting up. **Never share or upload the private key** (`id_ed25519`).

## Optional: add the key to your Mac's SSH agent

To add the key and store its passphrase in macOS Keychain:

```sh
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```
