@SMOKE
Feature: The home page

  Scenario: Visit the home page
    Given the "/" page is open
    Then the page's title tag is "The Daily Dilettante"
    And the page's main heading contains "Welcome"
    And the page has all of its main parts
    And all images are displayed
    And all externally stored text has been retrieved
