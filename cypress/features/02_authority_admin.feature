Feature: User Authority Administration
  As an administration
  So that I can give certain privileges to specific users
  I want to ba able to view and update the roles od specific users

  Background:
    Given the "sign-in" page is open
    And the user signs-in with username "a@b.com" and password "qwerty"
    And the "Authorise" page is navigated to

  Scenario: An anonymous user visits the authority admin page
    # This will throw away the user's session, so the user is anonymous
    Given the "authorise" page is open
    Then the page's main heading contains "Authorise a user"
    And a message indicating a lack of permission is displayed

  Scenario: A signed-in user visits the authority admin page
    Then a message indicating that they should specify the user's email is  displayed
    And the user to affect field is empty
    And the get user roles button is disabled
    And the set user role button is disabled

  Scenario: Provide a user's email address to act on
    When  the user to affect field contains "noddy@dd.com"
    Then the get user roles button is enabled
    And the set user role button is disabled

  Scenario: fetch the roles of a known user
    And  the user to affect field contains "noddy@dd.com"
    When the get user roles button is clicked
    Then the feedback message is empty
    And the set user role button is enabled

  Scenario Outline: set user's role
    And the user to affect field contains "noddy@dd.com"
    And the get user roles button is clicked
    When the user's role is set to "<newRole>"
    And the set user role button is clicked
    And the feedback message is empty
    And the user's role shows as "<newRole>"
    Examples:
      | newRole |
      | admin   |
      | editor  |

  # This scenario will run after the previous scenario
  # if it succeeded, then the user will be an editor
  Scenario: Don't actually change role
    And the user to affect field contains "noddy@dd.com"
    And the get user roles button is clicked
    # this is the state that we expect it to be in because of the last scenario
    And the user's role shows as "editor"
    When the user's role is set to "admin"
    And the get user roles button is clicked
    # that is, it will not change unless the set user role button is clicked
    Then the user's role shows as "editor"