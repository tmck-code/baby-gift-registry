variable "IMAGE" {
  default = "baby-gift-registry"
}

variable "TAG" {
  default = "dev"
}

target "common" {
  context    = "."
  dockerfile = "ops/Dockerfile"
}

target "web" {
  inherits   = ["common"]
  target     = "web"
  tags       = ["${IMAGE}:${TAG}"]
  cache-to   = ["type=local,dest=.docker-cache/web,mode=max"]
  cache-from = ["type=local,src=.docker-cache/web"]
  output     = ["type=docker"]
}
