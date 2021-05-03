variable "prefix" {
  description = "Azure_FE"
}

variable "location" {
  description = "The Azure Region in which all resources in this example should be provisioned"
}

variable "kubernetes_client_id" {
  description = "The Client ID for the Service Principal to use for this Managed Kubernetes Cluster"
}

variable "kubernetes_client_secret" {
  description = "The Client Secret for the Service Principal to use for this Managed Kubernetes Cluster"
}
variable "ssh_key" {
  description = "SSH into cluster"
}
#a8eec281-aaa3-4dae-ac9b-9a398b9215e7
