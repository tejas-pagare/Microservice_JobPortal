#!/bin/bash

# ============================================================
#  Job Portal - Start All Services & Frontend
# ============================================================
#  Starts the Next.js frontend and all backend microservices
#  in parallel. Each process gets a color-coded label.
#
#  Services:
#    Frontend  → Next.js (port 3000)
#    Auth      → port 5005
#    Utils     → port 5001
#    User      → port 5002
#    Job       → port 5003
#    Payment   → port 5004
#    Blog      → port 5006
#    Chat      → port 5007
#
#  Usage:  ./scripts/start-all.sh
#  Stop:   Ctrl+C (kills all child processes)
# ============================================================

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Colors for labels (ANSI)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Cleanup: kill all background jobs on exit
cleanup() {
  echo ""
  echo -e "${RED}⏹  Shutting down all services...${NC}"
  kill 0 2>/dev/null
  wait 2>/dev/null
  echo -e "${GREEN}✔  All services stopped.${NC}"
}
trap cleanup SIGINT SIGTERM EXIT

# Helper: run a service in the background with a colored prefix
run_service() {
  local name="$1"
  local dir="$2"
  local color="$3"
  local pad=$(printf '%-10s' "$name")

  if [ ! -d "$dir" ]; then
    echo -e "${RED}✘  Directory not found: $dir${NC}"
    return
  fi

  echo -e "${color}▶  Starting ${name}...${NC}"
  (cd "$dir" && npm run dev 2>&1 | while IFS= read -r line; do
    echo -e "${color}[${pad}]${NC} $line"
  done) &
}

echo ""
echo -e "${WHITE}🚀 Starting Job Portal — All Services${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start each service
run_service "FRONTEND"  "$ROOT_DIR/frontend"          "$CYAN"
run_service "AUTH"      "$ROOT_DIR/services/auth"      "$GREEN"
run_service "UTILS"     "$ROOT_DIR/services/utils"     "$YELLOW"
run_service "USER"      "$ROOT_DIR/services/user"      "$BLUE"
run_service "JOB"       "$ROOT_DIR/services/job"       "$MAGENTA"
run_service "PAYMENT"   "$ROOT_DIR/services/payment"   "$RED"
run_service "BLOG"      "$ROOT_DIR/services/blog"      "$WHITE"
run_service "CHAT"      "$ROOT_DIR/services/chat"      "$CYAN"


echo ""
echo -e "${GREEN}✔  All services launched. Press Ctrl+C to stop.${NC}"
echo ""

# Wait for all background processes
wait
