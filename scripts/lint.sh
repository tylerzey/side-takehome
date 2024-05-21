#!/usr/bin/env bash
set -e

yarn sort-pkc
standard-monorepo circular-deps
yarn prettier --log-level error
yarn turbo lint $1
