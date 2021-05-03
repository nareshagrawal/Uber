# usage of the specific kubernetes.io/cluster/* resource tag is required for 
# EKS and Kubernetes to discover and manage compute resources


resource "aws_autoscaling_group" "demo" {
  desired_capacity     = 3
  default_cooldown     = 60
  launch_configuration = "${aws_launch_configuration.demo.id}"
  max_size             = 5
  min_size             = 3
  name                 = "terraform-eks-demo"
  vpc_zone_identifier  = ["${aws_subnet.demo[0].id}", "${aws_subnet.demo[1].id}"]

  tag {
    key                 = "Name"
    value               = "terraform-eks-demo"
    propagate_at_launch = true
  }

  tag {
    key                 = "kubernetes.io/cluster/${var.cluster-name}"
    value               = "owned"
    propagate_at_launch = true
  }
}
