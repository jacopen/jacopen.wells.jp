project = "wellsjp"

app "wellsjp" {
  labels = {
    "service" = "wellsjp",
    "env"     = "dev"
  }

  path = "dist"

  #runner {
  #  profile = "kubernetes-01GT3ZC13JSYRRB78N09RGC3XS"
  #}

  build {
    use "pack" {
      builder = "paketobuildpacks/builder:base"
      buildpacks = ["https://github.com/paketo-buildpacks/httpd.git"]
    }
    registry {
      use "docker" {
        image = "jacopen/wellsjp"
        tag   = "1"
        local = false
        encoded_auth = var.docker-auth
      }
    }
  }

  deploy {
    use "kubernetes" {
      probe_path = "/"
    }
  }

  release {
    use "kubernetes" {
      // Sets up a load balancer to access released application
      load_balancer = false
      ingress "http" {
        host = "wellsjp.workload.udcp.run"
        path = "/"
      }
    }
  }
}

variable "docker-auth" {
  type = string
  env = ["DOCKER-AUTH"]
}