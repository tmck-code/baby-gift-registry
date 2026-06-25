target "common" {
  context    = "."
  dockerfile = "ops/Dockerfile"
}

target "web" {
  inherits   = ["common"]
  target     = "web"
  tags       = ["${IMAGE:-baby-gift-registry}:${TAG:-dev}"]
  cache-to   = ["type=local,dest=.docker-cache/web,mode=max"]
  cache-from = ["type=local,src=.docker-cache/web"]
  output     = ["type=docker"]
}
