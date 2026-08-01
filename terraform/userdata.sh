#!/bin/bash
set -euxo pipefail

# Update the system
dnf update -y

# Install Docker and Git
dnf install -y docker git

# Enable and start Docker
systemctl enable docker
systemctl start docker

# Add ec2-user to the docker group
usermod -aG docker ec2-user

# Install Docker Compose Plugin
mkdir -p /usr/local/lib/docker/cli-plugins

curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose

chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Create application directory
mkdir -p /opt/weather-app
chown -R ec2-user:ec2-user /opt/weather-app

# Install AWS CLI (if not already installed)
dnf install -y unzip

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip"
unzip -q /tmp/awscliv2.zip -d /tmp
/tmp/aws/install

# Verify installation
docker --version
docker compose version
aws --version