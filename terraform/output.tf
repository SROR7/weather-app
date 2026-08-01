output "alb_dns_name" {
  value = aws_lb.alb.dns_name
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnets" {
  description = "Public Subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "Private Subnet IDs"
  value       = module.vpc.private_subnets
}

output "instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.web.id
}

output "instance_public_ip" {
  description = "EC2 Public IP"
  value       = aws_instance.web.public_ip
}

output "instance_private_ip" {
  description = "EC2 Private IP"
  value       = aws_instance.web.private_ip
}