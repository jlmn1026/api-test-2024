#!/bin/bash -x
sudo chown -R node:node main-api/node_modules

cd main-api
pnpm install
pnpm dlx prisma generate
pnpm dlx prisma migrate dev
cd ../frontend
pnpm install

# wget -O ~/vsls-reqs https://aka.ms/vsls-linux-prereq-script && chmod +x ~/vsls-reqs && ~/vsls-reqs
curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o ~/session-manager-plugin.deb
sudo dpkg -i ~/session-manager-plugin.deb

echo 'done'
