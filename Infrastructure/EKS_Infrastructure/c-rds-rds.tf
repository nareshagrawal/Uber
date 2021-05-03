# RDS instance
resource "aws_db_instance" "uber-db" {
  identifier             = "uber-db"
  instance_class         = "db.t3.micro"
  engine                 = "mysql"
  multi_az               = "false"
  storage_encrypted      = "true"
  ca_cert_identifier     = "rds-ca-2019"
  storage_type           = "gp2"
  allocated_storage      = 20
  name                   = var.db_name
  username               = var.db_user_name
  password               = var.db_password
  skip_final_snapshot    = "true"
  db_subnet_group_name   = "${aws_db_subnet_group.rds-db-subnet.name}"
  vpc_security_group_ids = ["${aws_security_group.database_security_group.id}"]
  
}

# Database security group
resource "aws_security_group" "database_security_group" {
  name        = "database_security_group"
  description = "Allow inbound traffic for database"
  vpc_id      = "${aws_vpc.demo.id}"

   ingress {
    description = "3306 from VPC"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["${aws_vpc.demo.cidr_block}"]
  }

  tags = {
    Name = "database_security_group"
  }

}

# RDS subnet
resource "aws_db_subnet_group" "rds-db-subnet" {
  name       = "rds-db-subnet"
  subnet_ids = ["${aws_subnet.demo[2].id}", "${aws_subnet.demo[3].id}"]
}

