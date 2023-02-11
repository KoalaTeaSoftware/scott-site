Feature: User Authentication
  As a user
  So that I can take advantage of protected assets
  I want to be able to identify myself

  Background:
    Given the "sign-in" page is open
    And the page's main heading contains "log in"
    And the log out action is not visible

  Scenario: A user signs in
    When the user signs-in with username "a@b.com" and password "qwerty"
    Then the user is known as "a@b.com"
    And the log out action is visible
    And the credential fields can not be seen

  Scenario: A signed-in user signs out
    And the user signs-in with username "a@b.com" and password "qwerty"
    When the user logs out
    # the user is redirect to home (because he may be on a protected page)
    Then the page's main heading contains "Welcome"

  Scenario: A user tries to sign in with bad credentials
    When the user signs-in with unmatchable credentials
    Then the feedback message contains "Try again"
