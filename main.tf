terraform {
  backend "s3" {
    bucket = "tellmeapp"
    key    = "infraestructura/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_eip" "app_ip" {
  vpc = true
}

resource "aws_security_group" "allow_http_ssh" {
  name        = "allow_http_ssh"
  description = "Allow HTTP, HTTPS, and SSH traffic"
  
  lifecycle {
    create_before_destroy = true
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_instance" {
  ami             = "ami-0c02fb55956c7d316" # Ubuntu 20.04
  instance_type   = "t2.micro"
  key_name        = "tellme"
  security_groups = [aws_security_group.allow_http_ssh.name]

  tags = {
    Name = "tell-me"
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras enable docker
              yum install -y docker
              systemctl start docker
              systemctl enable docker

              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose

              docker --version
              docker-compose --version
              EOF
}

resource "aws_eip_association" "example" {
  instance_id   = aws_instance.app_instance.id
  allocation_id = aws_eip.app_ip.id
}

output "elastic_ip" {
  value = aws_eip.app_ip.public_ip
}
