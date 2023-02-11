Feature: The administration of the authentication feature
  As an administrator
  So that I can control the registered user-base
  I want to be able to create, delete, etc user accounts

  Authentication is about logging in and logging out
  Authentication-admin is about creating users' accounts

  Background:
    Given the "sign-in" page is open
    And the user signs-in with username "a@b.com" and password "qwerty"
    And the "Register" page is navigated to

  Scenario: An anonymous user visits the user registration page
    # As this is using the page is open, it start a new browser session, so the user is anonymous, just for this scenario
    When the "register" page is open
    Then the page's main heading is "Create an Account"
    And a message indicating a lack of permission is displayed

  Scenario: a signed-in user visits the page
    Then a message indicating that they should provide credentials is displayed


  # ToDo: successful registration of a new user
  # ToDo: something clever with administrative users - this will affect a lot of pages.



