@api
Feature: check Miscellaneous endpoints

  Scenario: index page / is ok
    When we HTTP GET '/'
    Then our HTTP response should have status code 200
    And our HTTP headers should include 'x-powered-by'
    And our HTTP headers should include 'content-security-policy'
