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
      probe_path   = "/"
      replicas     = 3
      service_port = 80
    }
  }

  release {
    use "kubernetes" {
      port = 80
      // Sets up a load balancer to access released application
      load_balancer = false
      ingress "http" {
        host      = "wellsjp.workload.udcp.run"
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