#!/usr/bin/zsh

# helpers.sh
# Source this file within your script to use.

# Logging
declare -g -A LOG_TYPE
LOG_TYPE["DEBUG"]="DEBUG"
LOG_TYPE["INFO"]="INFO"
LOG_TYPE["INFO_BOLD"]="${LOG_TYPE["INFO"]}"
LOG_TYPE["SUCCESS"]="${LOG_TYPE["INFO"]}"
LOG_TYPE["WARN"]="WARN"
LOG_TYPE["ERROR"]="ERROR"

declare -g -A LOG_TYPE_COLOUR
LOG_TYPE_COLOUR["DEBUG"]="${MAGENTA}"
LOG_TYPE_COLOUR["INFO"]="${WHITE}"
LOG_TYPE_COLOUR["INFO_BOLD"]="${POWDER_BLUE}"
LOG_TYPE_COLOUR["SUCCESS"]="${GREEN}"
LOG_TYPE_COLOUR["WARN"]="${YELLOW}"
LOG_TYPE_COLOUR["ERROR"]="${RED}"

STDOUT_FILE=/dev/stdout
LOG_FILE=/tmp/log
ERROR_FILE=/tmp/error

createLogFiles() {
  removeFile ${LOG_FILE}
  createFile ${LOG_FILE}
  log "INFO" "Created log files."
}

createFile() {
  # $1 - File path including filename.
  test -f $1 || touch $1
}

removeFile() {
  # $1 - File path including filename.
  [ -e $1 ] && rm $1
}

log() {
  # $1 - Log type.
  # $2 - Message.
  printf "%s [$(date +%F_%T)] %s: $2 ${WHITE}\n" "${LOG_TYPE_COLOUR["$1"]}" "${LOG_TYPE["$1"]}" 2>&1 | tee -a ${LOG_FILE}
}

cleanupDirectory() {
  # Clean up directory recursively
  # $1 - directory
  log "INFO" "Cleaning up $1 files."
  if [ -d "$1" ]; then rm -Rf $1; fi
}

createLogFiles

# Log sourcing helpers.sh
log "INFO" "Sourcing helpers."
