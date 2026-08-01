resource "aws_instance" "web-server" {
  ami           = "ami-0aba19e56f3eaec05"
  instance_type = "t3.micro"

  subnet_id = module.vpc.public_subnets[0]

  vpc_security_group_ids = [
    aws_security_group.ec2_sg.id
  ]

  associate_public_ip_address = true

  tags = {
    Name = "web-server"
  }
}