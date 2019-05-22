@api
Feature: check healthz endpoint

  Scenario: healthz good
    When we HTTP GET '/'
    Then our HTTP response should have status code 200

  # Scenario: healthz bad
  #   When we HTTP GET '/healthz'
  #   Then our HTTP response should have status code 500
