provider "azurerm" {
  version = ">2.0"
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "${var.prefix}-k8s-resources"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "example" {
  name                = "${var.prefix}-k8s"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  dns_prefix          = "${var.prefix}-k8s"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_D2_v2"
    min_count  = 2
    max_count  = 4
    enable_auto_scaling = true
  }

  service_principal {
    client_id     = var.kubernetes_client_id
    client_secret = var.kubernetes_client_secret
  }
  linux_profile {
    admin_username = "ubuntu"
    ssh_key {
      key_data = var.ssh_key
    }
  }
  tags = {
    Environment = "Production"
  }
}
