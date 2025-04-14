locals {
  service_name = "cloud-run-cicd-service"
}

terraform {
  backend "gcs" {
    bucket = "cloud-run-cicd-tfstate"
    prefix = "application/terraform"
  }
}

resource "google_cloud_run_v2_service" "my-service" {
  name                = local.service_name
  location            = var.region
  ingress             = "INGRESS_TRAFFIC_ALL"
  deletion_protection = false

  template {
    containers {
      name       = "web"
      image      = var.docker_image_web
      depends_on = ["app"]
      ports {
        container_port = 80
      }
      startup_probe {
        timeout_seconds = 120
        period_seconds  = 10
        tcp_socket {
          port = 80
        }
      }
    }

    containers {
      name  = "app"
      image = var.docker_image_api
      startup_probe {
        timeout_seconds = 120
        period_seconds  = 10
        tcp_socket {
          port = 8080
        }
      }
    }
    service_account = var.service_account
    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }
  }
}

resource "google_cloud_run_v2_service_iam_binding" "my-service-invoker-binding" {
  location = google_cloud_run_v2_service.my-service.location
  name     = google_cloud_run_v2_service.my-service.name
  role     = "roles/run.invoker"
  members = [
    "allUsers",
  ]
}

resource "google_cloud_run_domain_mapping" "custom_domain" {
  location = var.region
  name     = var.custom_domain

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_v2_service.my-service.name
  }
}