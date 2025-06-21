#!/usr/bin/zsh

# deploy.sh
# Deploy the application.

setupPaths() {
  mkdir -p docker/resources/tmp

  declare -g -A PATHS
  PATHS["UTILS"]="./utils"
  PATHS["DOCKER"]="./docker"
  PATHS["RESOURCES"]="${PATHS["DOCKER"]}/resources"
  PATHS["TMP"]="${PATHS["RESOURCES"]}/tmp"
  PATHS["FRONTEND"]="../frontend"
}

sourceFiles() {
  if [ -d "${PATHS["UTILS"]}" ]; then
    for file in "${PATHS["UTILS"]}"/*; do [ -r "$file" ] && . "$file"; done
  fi

  . globals.conf
}

parseArguments() {
  # Parse the passed flags and deploy their respective services.
  log "INFO" "Parsing arguments."
  local OPTIND
  while getopts 'afc:h' opt; do
    case "$opt" in
      a)
        log "INFO" "Processing option 'a': API"
        api
        ;;

      f)
        log "INFO" "Processing option 'f': Frontend"
        frontend
        ;;

      c)
        arg="$OPTARG"
        log "INFO" "Processing option 'c' with '${OPTARG}' argument"
        ;;

      ?|h)
        log "INFO" "Usage: $(basename $0) [-a] [-f] [-c arg]"
        exit 1
        ;;
    esac
  done

  # Deploy the whole system when no flags specified.
  if (( $# == 0 )); then
    log "INFO" "Deploying whole system."
    deploySystem
  fi

  shift "$(($OPTIND -1))"
}

deploySystem() {
  api
  frontend
}

api() {
  log "INFO_BOLD" "API started."
}

buildFrontend() {
  log "INFO" "Building frontend."
  cp -R "${PATHS["FRONTEND"]}" "${PATHS["TMP"]}"/app

  pushd "${PATHS["DOCKER"]}"
    log "INFO" "Building frontend image."
    docker build -t frontend:0.1 -f frontend.Dockerfile .
    docker run -dp $FRONTEND_PORT:$FRONTEND_FORWARDED_PORT frontend:0.1
  popd
}

frontend() {
  log "INFO_BOLD" "Frontend started."
  buildFrontend
}

main() {
  trap error ERR
  trap cleanup EXIT
  setupPaths
  sourceFiles
  log "INFO_BOLD" "Main started."
  parseArguments "$@"
  log "SUCCESS" "Deployed."
}

cleanup() {
  log "INFO" "Cleaning up temporary files."
  cleanupDirectory "${PATHS["TMP"]}"
}

error() {
  log "ERROR" "Deploy failed."
  exit 1
}

main "$@"
