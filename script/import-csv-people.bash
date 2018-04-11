#!/bin/bash
set -o nounset
set -o errexit

path=$(dirname $(realpath --relative-to=. $0))
. $path/helper.bash

log begin

csvFile=${peopleCsvFile:-people.csv}
collection=originalPeople
fieldFile=people-fields.dat

if [ "${import:-true}" = true ]; then
  run importCsv
fi

run "yarn ingest-people"

log end
