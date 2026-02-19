## Run Migrations

```
vendor/bin/phinx migrate
```

## Generate keys for web push

```cmd
php generate-vapid-keys.php
```

## Send web push cmd

```cmd
php cli/cli.php notification send
```