#
# EKS Cluster Resources
#  * EKS Cluster
#
#  It can take a few minutes to provision on AWS

resource "aws_eks_cluster" "demo" {
  name     = var.cluster-name
  role_arn = aws_iam_role.demo-cluster.arn
  version = 1.18

  vpc_config {
    security_group_ids = [aws_security_group.demo-cluster.id]
    subnet_ids         = ["${aws_subnet.demo[0].id}", "${aws_subnet.demo[1].id}"]
  }

  depends_on = [
    aws_iam_role_policy_attachment.demo-cluster-AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.demo-cluster-AmazonEKSServicePolicy,
  ]
}
