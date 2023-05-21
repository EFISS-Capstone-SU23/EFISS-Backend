#!/bin/bash
# GCP is Debian 11 - bullseye

sudo apt-get install gnupg
curl -fsSL https://pgp.mongodb.com/server-5.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-5.0.gpg \
   --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-5.0.gpg] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/5.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org=5.0.16 mongodb-org-database=5.0.16 mongodb-org-server=5.0.16 mongodb-org-shell=5.0.16 mongodb-org-mongos=5.0.16 mongodb-org-tools=5.0.16
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl enable mongod

cat <<EOF > /etc/mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# network interfaces + docker IP range
net:
  port: 27017
  bindIp: 127.0.0.1,172.17.0.1
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
EOF

sudo systemctl restart mongod

