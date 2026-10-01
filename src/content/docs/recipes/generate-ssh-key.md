---
title: Generate an SSH key
description: Generate an SSH key and copy its public key on macOS.
---

## Generate the key

```sh
ssh-keygen -t ed25519 -C "you@example.com"
```

Generates an Ed25519 key pair, using the email address as a label. The default output is `~/.ssh/id_ed25519` for the private key and `~/.ssh/id_ed25519.pub` for the public key; a custom filename changes both paths.

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
