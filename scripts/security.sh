#!/usr/bin/env bash
set -e

# run yarn audit, check the number of lines that have 'high' on
# them in the output table, meaning high vulnerability
# @see - https://github.com/yarnpkg/yarn/issues/6668#issuecomment-446023009
if [[ $(yarn audit | grep "critical" |  wc -l | tr -d ' ') -gt 0 ]]; then
   echo "Critical vulnerability found in package.json"
   exit 1
 else
   exit 0
fi
