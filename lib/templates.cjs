// lib/templates.cjs
const constraintTemplates = [
  {
    id: 1,
    name: "Game Scheduling Constraints",
    template: "Ensure that at least {min} and at most {max} games from {games} are scheduled across {rounds} and played in any venue from {venues} and assigned to any of {networks}.",
    examples: [
      "Ensure all rivalry games on a weekend on ESPN",
      "Put every big rivalry game on Saturday or Sunday on ESPN",
      "Schedule all marquee matchups on weekends with ESPN coverage"
    ]
  },
  {
    id: 2,
    name: "Avoid Weekday High-Profile Games",
    template: "No games from {games} should be scheduled on {rounds}.",
    examples: [
      "Don't schedule high profile games on a weekday",
      "No marquee games on Monday through Thursday"
    ]
  },
  {
    id: 3,
    name: "Rivalry Finale Constraint",
    template: "At least {min} of the games in {games} must be scheduled on {rounds} and on {networks}.",
    examples: [
      "At least 2 of UTN@VU, ALA@AU, MSU@UM should all be scheduled on the final 2 dates of the season and on either CBS or ESPN"
    ]
  },
  {
    id: 4,
    name: "No Weekday Byes",
    template: "Teams in {teams} must not have byes on {rounds}.",
    examples: [
      "Make sure UTN, UK, USC, LSU do not have any weekday byes"
    ]
  },
  {
    id: 5,
    name: "Sequence Constraints",
    template: "Ensure at least {min} and at most {max} cases where there is a sequence {sequence_items} across rounds {rounds}.",
    examples: [
      "Make sure Oregon, Washington, UCLA, USC do not play at home on either side of their bye week",
      "Make sure Penn State plays at UCLA and at USC in back-to-back weeks in the second half of the season"
    ]
  },
  {
      id: 6,
      name: "Team Schedule Pattern Constraints",
      template: "Ensure that {each_of_all} teams in {teams} have at least {min} and at most {max} instances where they play at least {k} and at most {m} {game_types} games across {rounds} where the game is assigned to any of {networks} and played in any venue from {venues}.",
      examples: [
        "No cases of 3 games in 3 nights for any NBA team",
        "No cases of 5 away games in 7 nights after the all star break",
        "At most 2 cases of 3 away games in 4 rounds for Western Conference teams"
      ]
    },
{
    id: 7,
    name: "Home/Away Balance",
    template: "Ensure that each team in {teams} does not have more than {max} consecutive home or away games in {rounds}.",
    examples: [
      "No team should have more than 3 consecutive home games",
      "Avoid 4 away games in a row for any team"
    ]
  },
  {
    id: 8,
    name: "Network Coverage Constraints",
    template: "Schedule games from {games} so that at least {min} games appear on {networks}.",
    examples: [
      "Ensure at least 2 marquee games on ESPN each week",
      "Put at least 3 rivalry games on CBS over the season"
    ]
  },
  {
    id: 9,
    name: "Venue Usage Constraints",
    template: "Ensure that no venue in {venues} is used more than {max} times in {rounds}.",
    examples: [
      "Do not schedule more than 2 games at Madison Square Garden per week",
      "Ensure each stadium is used at most 5 times in the first half of the season"
    ]
  },
  {
    id: 10,
    name: "Team Rest Days",
    template: "Ensure that teams in {teams} have at least {min} rest days between games in {rounds}.",
    examples: [
      "Each team should have at least 2 rest days between games",
      "No back-to-back games for any team without a minimum 1-day rest"
    ]
  },
  {
    id: 11,
    name: "Avoid Conflicting Events",
    template: "Do not schedule games in {venues} on {rounds} that conflict with {events}.",
    examples: [
      "Do not schedule NBA games at MSG on concert nights",
      "Avoid baseball games on stadium renovation dates"
    ]
  },
  {
    id: 12,
    name: "Consecutive Round Limit",
    template: "Ensure that {teams} do not play more than {max} consecutive rounds against the same opponent(s) in {rounds}.",
    examples: [
      "No team should play the same opponent more than twice in a row",
      "Avoid scheduling repeated matchups for 3 consecutive rounds"
    ]
  },
  {
    id: 13,
    name: "Holiday Game Restrictions",
    template: "Ensure that no games from {games} are scheduled on holidays {holidays} unless explicitly allowed.",
    examples: [
      "Do not schedule NFL games on Christmas Day unless necessary",
      "Avoid college basketball games on Thanksgiving unless specified"
    ]
  },
  {
    id: 14,
    name: "Prime Time Scheduling",
    template: "Schedule at least {min} games from {games} in prime time slots {slots} on {networks}.",
    examples: [
      "Ensure at least 2 rivalry games are in prime time on ESPN",
      "Schedule at least 3 marquee matchups on Monday night football"
    ]
  },
  {
    id: 15,
    name: "Consecutive Venue Constraint",
    template: "Ensure that no team in {teams} plays in the same venue from {venues} more than {max} consecutive times.",
    examples: [
      "No team should play at Madison Square Garden more than 2 times in a row",
      "Avoid repeating the same stadium for 3 consecutive away games"
    ]
  }
]

module.exports = { constraintTemplates }