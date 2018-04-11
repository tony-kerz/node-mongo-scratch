# batch

for batch data load, a typical flow would involve:

1. load data into mongo collection from json/csv file using [`mongoimport`](https://docs.mongodb.com/manual/reference/program/mongoimport/)
1. transform data into another mongo collection using mongo's [aggregation pipeline](https://docs.mongodb.com/manual/aggregation/#aggregation-pipeline)

this project illustrates usage of the [node-mongo-batch]() package to facilitate the _aggregation pipeline_ step.
