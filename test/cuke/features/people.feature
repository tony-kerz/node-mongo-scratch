Feature: people

  Background:
    Given the following documents exist in the '${constants.PEOPLE}' collection:
    """
    [
      {
        _id: 'p1',
        name: {
          first: 'fred',
          last: 'smith'
        },
        address: {
          street: '1 main',
          unit: 'apt 1',
          city: 'whoville',
          state: 'CT',
          zip: '02020'
        },
        gender: 'M',
        dob: '2018-01-07T13:16:57.576Z',
        email: 'a@b.co',
        phone: '111-111-1111',
        ssn: '123-34-2223'
      },
      {
        _id: 'p2',
        name: {
          first: 'jane',
          last: 'smith'
        },
        address: {
          street: '1 main',
          unit: 'apt 1',
          city: 'whoville',
          state: 'CT',
          zip: '02020'
        },
        gender: 'M',
        dob: '2018-01-07T13:16:57.576Z',
        email: 'a@b.co',
        phone: '212-222-2222',
        ssn: '123-34-2223'
      }
    ]
    """

  Scenario: find
    Given we HTTP GET '/people'
    Then our HTTP response should be like:
    """
    [
      {_id: 'p1'},
      {_id: 'p2'}
    ]
    """

  Scenario: get
    When we HTTP GET '/people/p1'
    Then our HTTP response should have status code 200
    And our HTTP response should be like:
    """
      {_id: 'p1'}
    """

  Scenario: get non-existent
    When we HTTP GET '/people/nope'
    Then our HTTP response should have status code 404

  Scenario: create
    """
    When we HTTP POST '/people' with body:
    """
    {
      _id: 'p3',
      name: {
        first: 'jack',
        last: 'smith'
      },
      address: {
        street: '1 main',
        unit: 'apt 1',
        city: 'whoville',
        state: 'CT',
        zip: '02020'
      },
      gender: 'M',
      dob: '2018-01-07T13:16:57.576Z',
      email: 'a@b.co',
      phone: '212-222-2222',
      ssn: '123-34-2223'
    }
    """
    Then our HTTP response should have status code 201
    And our HTTP headers should include 'location'
    And mongo query "{_id: 'p3'}" on '${constants.PEOPLE}' should be like:
    """
    [
      {
        _id: 'p3',
        name: {
          first: 'jack',
          last: 'smith'
        },
        address: {
          street: '1 main',
          unit: 'apt 1',
          city: 'whoville',
          state: 'CT',
          zip: '02020'
        },
        gender: 'M',
        dob: '2018-01-07T13:16:57.576Z',
        email: 'a@b.co',
        phone: '212-222-2222',
        ssn: '123-34-2223'
      }
    ]
    """

  Scenario: create invalid
    When we HTTP POST '/people' with body:
    """
    {type: {_id: 'r4', nayme: 'type four'}}
    """
    Then our HTTP response should have status code 422


  Scenario: create duplicate
    When we HTTP POST '/people' with body:
    """
    {
      _id: 'p1',
      name: {
        first: 'jack',
        last: 'smith'
      },
      address: {
        street: '1 main',
        unit: 'apt 1',
        city: 'whoville',
        state: 'CT',
        zip: '02020'
      },
      gender: 'M',
      dob: '2018-01-07T13:16:57.576Z',
      email: 'a@b.co',
      phone: '212-222-2222',
      ssn: '123-34-2223'
    }
    """
    Then our HTTP response should have status code 409

  Scenario: update
    """
    When we HTTP PUT '/people/p1' with body:
    """
    {
      name: {
        first: 'jack',
        last: 'smith'
      },
      address: {
        street: '1 main',
        unit: 'apt 1',
        city: 'whoville',
        state: 'CT',
        zip: '02020'
      },
      gender: 'M',
      dob: '2018-01-07T13:16:57.576Z',
      email: 'a@b.co',
      phone: '222-222-2222',
      ssn: '123-34-2223'
    }
    """
    Then our HTTP response should have status code 204
    And mongo query "{_id: 'p1'}" on '${constants.PEOPLE}' should be like:
    """
    [
      {
        _id: 'p1',
        phone: '222-222-2222'
      }
    ]
    """
    And mongo query "{}" on '${constants.PEOPLE}History' should be like:
    """
    [
      {
        mode: constants.MODES.update,
        date: 'assert(actual.constructor.name == "Date")',
        data: {
          _id: 'p1',
          phone: '111-111-1111'
        }
      }
    ]
    """

  Scenario: update invalid
    When we HTTP PUT '/people/p2' with body:
    """
    {nayme: 'fred'}
    """
    Then our HTTP response should have status code 422

  Scenario: update non-existent
    When we HTTP PUT '/people/nope' with body:
    """
    {
      name: {
        first: 'jack',
        last: 'smith'
      },
      address: {
        street: '1 main',
        unit: 'apt 1',
        city: 'whoville',
        state: 'CT',
        zip: '02020'
      },
      gender: 'M',
      dob: '2018-01-07T13:16:57.576Z',
      email: 'a@b.co',
      phone: '222-222-2222',
      ssn: '123-34-2223'
    }
    """
    Then our HTTP response should have status code 404

  Scenario: delete
    When we HTTP DELETE '/people/p1'
    Then our HTTP response should have status code 204
    And mongo query "{_id: 'p1'}" on '${constants.PEOPLE}' should be like:
    """
    []
    """
    And mongo query "{}" on '${constants.PEOPLE}History' should be like:
    """
    [
      {
        mode: constants.MODES.delete,
        date: 'assert(actual.constructor.name == "Date")',
        data: {
          _id: 'p1'
        }
      }
    ]
    """

  Scenario: delete non-existent
    When we HTTP DELETE '/people/nope'
    Then our HTTP response should have status code 404
