project = "wellsjp"

app "wellsjp" {
  labels = {
    "service" = "wellsjp",
    "env"     = "dev"
  }

  runner {
    profile = "kubernetes-01GT3ZC13JSYRRB78N09RGC3XS"
  }

  build {
    use "docker" {}
    registry {
      use "docker" {
        image        = "jacopen/wellsjp"
        tag          = "latest"
        local        = false
        encoded_auth = var.docker-auth
      }
    }
  }

  deploy {
    use "kubernetes" {
      namespace    = "default"
      probe_path   = "/"
      replicas     = 3
      service_port = 80
      prune_whitelist = [
        "apps/v1/Deployment",
        "apps/v1/ReplicaSet"
      ]
    }
  }

  release {
    use "kubernetes" {
      port = 80
      // Sets up a load balancer to access released application
      load_balancer = false
      namespace     = "default"
      ingress "http" {
        host      = "wellsjp.workload.udcp.info"
        path      = "/"
        path_type = "Prefix"
      }
    }
  }
}

variable "docker-auth" {
  type = string
  env  = ["DOCKER-AUTH"]
}